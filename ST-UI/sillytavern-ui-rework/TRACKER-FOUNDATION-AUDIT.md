# Scene State and Tracker Foundation Audit

**Status:** Historical foundation audit; newer functional specifications and implementation contracts govern the rework  
**Audit date:** 2026-09-01  
**Sources:** Previously audited local snapshots, since relocated under `ST-UI/Extension-*/`. This documentation correction does not re-audit or modify them.

Historical recommendations below are superseded where later decisions specify nine-phase time, the full confirmed Cast fields, no provisional NPCs, semantic retirement, main-model transport separation, or provider-aware accounting. See [current tracker specification](./SCENE-STATE-TRACKER-SPEC.md) and [implementation contracts](./IMPLEMENTATION-CONTRACTS.md).

## 1. Executive conclusion

Neither extension should be integrated wholesale.

The first-release product should implement a native **Scene State engine** for fanfiction-style roleplay continuity. Horae is the stronger product reference for what that state should describe. Multihog is the stronger engineering reference for how a separate State Worker should update, isolate, recover, and persist it safely.

The recommended foundation is therefore:

- cleanly reimplement Horae-inspired qualitative tracker domains;
- adapt Multihog-inspired State Worker orchestration, per-chat isolation, commit guards, history, and recovery patterns;
- store typed state and typed change events rather than model-authored tag blocks;
- keep Scene State confined to ongoing tracking and Persistent Scene Memory, then extract a smaller fixed **Scene Details** record for each Long Memory entry;
- defer DnD mechanics to an optional Playing Mode after the first final release.

Horae cannot currently be used as a direct code source because its snapshot contains no declared license. Its concepts can guide independent design, but code should not be copied unless licensing or permission is established. Multihog declares GPL-3.0-or-later and can be studied or reused only with the required attribution, source, and compatibility obligations reviewed for the final distribution.

## 2. Audit scope and snapshots

This audit compares the local Horae, Multihog, and MeguminSuite snapshots only where they inform the new native tracker architecture. The child notes record each inspected source, version signal, capability boundary, and reuse constraint.

### Horae

| Item | Audited snapshot |
| --- | --- |
| Repository | `SenriYuki/SillyTavern-Horae` |
| Commit | `7a8859897bbfc6f0781ac5eb2451bc607e2bab95` |
| Commit date | 2026-06-07 |
| Extension version | 1.15.1 |
| JavaScript | 8 files; approximately 27,805 lines |
| Automated tests | None found |
| Declared license | None found |

Horae is concentrated in a roughly 21,000-line `index.js` and a roughly 4,600-line state manager, with additional vector, prompt, localization, and utility files. Its tracker, UI, provider settings, summaries, vector retrieval, and RPG features are strongly coupled.

### Multihog DnD Framework

| Item | Audited snapshot |
| --- | --- |
| Repository | `MultihogAurelius/SillyTavern-MultihogDnDFramework` |
| Commit | `6234ea34e1b547e17b6fb95cf0060728c73762ff` |
| Commit date | 2026-08-31 |
| Extension version | 2026.8.81 |
| JavaScript | 257 files; approximately 88,256 lines |
| Automated tests | 123 files; approximately 895 test cases |
| Declared license | GPL-3.0-or-later |

Multihog is a broad game framework rather than a tracker alone. Its repository says the extension is in maintenance mode in favor of a private fork. The audited code includes state tracking, narrator prompting, lorebook agents, world progression, maps, portraits, character creation, combat, RNG, quests, and numerous game-system tools.

### MeguminSuite

| Item | Audited snapshot |
| --- | --- |
| Repository | `Arif-salah/Megumin-Suite` |
| Commit | `03765737b5a7439a898d08274dd6c2b883f4a5b2` |
| Commit date | 2026-08-31 |
| Extension version | 10.0 |
| JavaScript | 89 files; approximately 22,374 lines |
| Automated tests | None found |
| Declared license | Creative Commons BY-NC 4.0 in `License`; README badge says BY-NC-ND 4.0 |

MeguminSuite is a combined preset, memory, tracker-block, NPC-bank, image-generation, and utility package. The license declarations conflict, both restrict commercial use, and Creative Commons licensing is unusual for software. Treat it as design research unless the author provides explicit compatible permission.

## 3. The product boundary established by this audit

The default product is not a DnD simulator. It is a roleplay client that preserves story continuity.

### First-release Scene State

Scene State is a live working record, not a Long Memory payload. Its confirmed base should remain small:

1. current approximate day-cycle phase, with no advancing exact time;
2. current date in the story's calendar;
3. current location as either one label or a hierarchy;
4. characters currently present, using stable identity and aliases;
5. optionally, explicitly supported per-character mood, activity, clothing, disguise, or visible condition;
6. the later-selected Story Continuity Profile: primary Fandom, optional Crossover Fandom, Era, and AU.

Custom trackers remain an advanced design question rather than part of this minimal base. Relationships, intentions, important objects, consequences, and unresolved threads belong primarily in the Long Memory summary and other entry metadata unless a later decision promotes a specific field into live Scene State.

### Extracted Scene Details

At a scene boundary or safety checkpoint, Long Memory extraction creates a fixed Scene Details record containing:

1. a one-sentence Scene Summary used only for user-facing display and navigation;
2. time of day as a named phase in the active cycle; the earlier exact-range proposal is superseded;
3. date, month, and year where known;
4. every character materially present at any point in the extracted scene;
5. one simple location or a hierarchical location path;
6. optionally, relevant per-character mood, activity, clothing, disguise, or visible condition.

The current cast in Scene State and the completed-scene participant list deliberately have different meanings. Time and date fields must support unknown and approximate values and non-Earth calendars rather than forcing invented precision. Subsequent product definition replaced the tentative universe/timeline label with a Story Continuity Profile containing primary Fandom, optional Crossover Fandom, Era, and AU.

Scene Summary is presentation metadata only. It is excluded from retrieval, activation, embeddings, relevance scoring, prompt injection, and model context. Tiny Recall remains a distinct retrieval-facing field.

### Deferred Playing Mode

The following belong to an optional, modular Playing Mode after the first final release:

- health, mana, stamina, and status bars;
- attributes, skills, abilities, spells, and saving throws;
- combat rounds, initiative, buffs, debuffs, and timed combat effects;
- equipment slots and rules-driven inventory;
- reputation meters and numerical social progression;
- levels, experience, currency, strongholds, and economies;
- dice, RNG queues, tool-call rolling, and combat automation;
- game maps, encounter rules, and DnD-specific narrator instructions.

The core schema must allow later modules without reserving permanent DnD clutter in the default interface.

## 4. Horae audit

Horae is evaluated as a qualitative continuity and tracker-design reference. Its useful state vocabulary is separated from the extension-specific implementation and any DnD-style mechanics that do not belong in the first release.

### 4.1 What Horae does well

Horae's default state shape is close to the desired roleplay vocabulary. It tracks story time, scene location, present characters, atmosphere, costumes, significant items, events, affection, NPC data, agendas, mood, and relationships. RPG modules are separately represented rather than being the only available state.

Its most valuable architectural idea is **message-relative change storage**. Assistant messages can carry a `horae_meta` change record, while `getLatestState()` replays those records to rebuild current state. This offers useful behavior after message edits, deletions, and swipes because derived state can be reconstructed instead of trusting one opaque current snapshot.

Other useful patterns are:

- stable IDs for NPCs and important items;
- protected versus updateable NPC fields;
- explicit item consumption and deletion;
- fixed location facts separated from the current scene location;
- relationship selection that favors characters currently in the scene;
- compact prompt generation instead of injecting every stored field indiscriminately;
- a read-only public state API for other modules.

These are strong product references for Scene State and Persistent Scene Memory.

### 4.2 What should not be inherited

Horae normally asks the roleplay model to append tracker syntax such as `<horae>` and event/RPG blocks to its narrative response. It then parses those blocks, falls back to loose line-based regular expressions, and can write tracker tags back into message content. This couples prose generation to bookkeeping, spends main-model output budget, risks visible or malformed tags, and makes sanitization complex.

The new product should instead use an isolated State Worker that returns schema-constrained data to application-owned storage. The roleplay model should receive only the compact state it needs and should never be responsible for transporting tracker commands inside its prose.

Other problems to avoid are:

- numeric message indices as durable identity;
- update rules where an empty present-character list cannot explicitly clear the previous cast;
- a single giant UI/controller file;
- tracker, summary, vector, provider, and RPG settings in one surface;
- separate API URLs, keys, and model selectors that duplicate application connection management;
- unbounded or loosely budgeted prompt assembly;
- browser-global mutable APIs and HTML extension slots as the primary integration contract;
- local-vector and summary subsystems that overlap the native Memorybook;
- regex-based acceptance of partially structured model output.

### 4.3 Horae disposition

| Capability | Disposition |
| --- | --- |
| Qualitative state vocabulary | Reimplement as typed native schema |
| Per-message changes and replay | Adapt using stable message/branch IDs and event revisions |
| Present-character-aware context | Adopt with explicit budgets |
| Location continuity | Adopt as a first-release domain |
| Relationship and object tracking | Keep outside the minimal live base pending a specific product decision |
| Public read-only state access | Rework as a versioned internal module API |
| Main-response tracker tags | Reject |
| Loose regex parser | Reject |
| Duplicate auxiliary API settings | Reject; use shared NanoGPT Generation Settings |
| Vector memory and summaries | Retire in favor of native Memorybook |
| RPG modules | Defer to post-release Playing Mode |
| Direct code reuse | Blocked unless licensing is clarified |

## 5. Multihog audit

Multihog is evaluated primarily for State Worker isolation, validation, persistence, recovery, and branch-safe engineering patterns. Its game framework is not selected as the product's default roleplay model.

### 5.1 What Multihog does well

Multihog runs a dedicated second-pass **State Extractor Model** after narration. It provides the prior memo and recent narrative, asks for changed sections, merges the result, computes a delta, archives history, saves the chat partition, and refreshes the tracker view. That separation is a better basis than embedding state tags in the main model's answer.

Its strongest reusable engineering patterns are:

- capturing the originating chat ID before asynchronous work begins;
- aborting an earlier pass when a newer pass starts;
- verifying the originating chat again after every awaited operation and immediately before commit;
- refusing to commit when the chat changed or the job was aborted;
- saving per-chat state immediately after a valid commit;
- keeping memo history and a visible change report;
- recording pre- and post-update snapshots against individual swipes for rollback;
- restoring chat-linked tracker setup without importing values from another chat;
- separating reusable module definitions from each chat's enabled/disabled state;
- recovery backups and migration code for evolving tracker definitions;
- ignoring system, hidden, summary, tool-shell, and hypothetical choice content when locating current narrative;
- tests covering chat persistence, chat switches, branch remapping, recovery, custom modules, current-narration selection, and pass affinity.

The distinction between a global catalog of tracker definitions and chat-specific activation is particularly relevant. For this product, a new chat may inherit which tracker template is enabled from defaults, Persona, or Character context, but its tracker **values** start empty. An existing chat restores both its exact definition selection and its exact values.

### 5.2 What should not be inherited

Multihog's stock memo is a text document made of `[TAG]...[/TAG]` blocks. Partial model output replaces whole matching sections; special words such as `REMOVED`, `EXPIRED`, or `END_COMBAT` delete them. This is flexible, but it is not a sufficiently precise source of truth for a native application. A malformed tag, duplicate block, naming variation, or full-section omission can produce ambiguous state.

Its generic custom-module mechanism is also intertwined with presentation markers, prompt strings, and DnD module rules. The stock State Extractor prompt contains combat durations, resources, spell slots, AC, equipment restrictions, buffs, debuffs, party lists, XP, and quest mechanics. Turning modules off reduces output, but it does not turn the surrounding product into a simple fanfiction tracker.

Other areas to avoid or defer are:

- one rolling text memo as the authoritative database;
- HTML diff strings as stored state deltas;
- duplicated OpenAI/Ollama/profile credentials and provider logic;
- the large shared settings object used as a live projection of the selected chat;
- a 50-snapshot-style bounded history without durable event provenance;
- narrator, lorebook-agent, map, portrait, world-progression, and CYOA systems;
- relationship values and commands designed primarily for bars;
- full-chat audits that guess token counts by character length and commit chunk by chunk;
- tracker output formats designed around UI rendering markers.

### 5.3 Multihog disposition

| Capability | Disposition |
| --- | --- |
| Dedicated second-pass State Worker | Adopt and reimplement |
| Origin-chat/abort/revision commit guards | Adopt as mandatory invariant |
| Per-chat persistence and setup activation | Adopt with a typed store |
| Snapshot history and swipe rollback | Adapt to an event ledger plus checkpoints |
| Global tracker catalog + chat activations | Adopt with Defaults/Persona/Character inheritance |
| Recent-narrative filtering | Adopt and extend to Memorybook source eligibility |
| Custom tracker modules | Rework around safe typed fields, not prompt/HTML templates |
| Tagged rolling State Memo | Replace with typed state and patches |
| Provider clients and credentials | Reject; use shared NanoGPT configuration |
| DnD modules and narrator rules | Defer to post-release Playing Mode |
| Maps, portraits, world simulation, CYOA | Outside current tracker scope |

## 6. MeguminSuite audit

MeguminSuite is evaluated narrowly for NPC discovery, editable tracked fields, history, undo, and dialogue presentation. It remains a design reference rather than a wholesale dependency or source of model-generated interface markup.

### 6.1 What the NPC Bank does well

MeguminSuite's NPC Bank supplies several useful product patterns:

- automatic creation only when an NPC is named, meaningfully voiced, and has a stake in the story;
- manual NPC creation and a whole-story discovery scan;
- a configurable field registry that generates prompts, parsing, cards, and injected text from one definition;
- distinct persistent, updatable, and locked fields;
- change-only operations instead of rewriting a complete dossier;
- per-change before-values, message attribution, undo, and rewind rollback;
- ignored-name controls and a maximum injected-NPC limit;
- relevance selection over recent messages rather than injecting every dossier;
- a guard intended to prevent a late message from writing into the previously selected profile.

The most valuable idea is not the default dossier itself. It is that one Character Bank record can contain stable identity fields, durable profile fields, live fields, and an attributable update history with different mutation rules.

### 6.2 What should not be inherited

The roleplay model is instructed to generate `<New_NPC>` and `<NPC_Update>` blocks in or alongside its main response. Those blocks are parsed with regular expressions and addressed primarily by case-insensitive names or name prefixes. Creation and rollback use numerical message positions. These reproduce the same coupling and identity weaknesses rejected in Horae.

The default dossier is also much larger than the required Character Bank. It solicits background, secrets, inner circles, agendas, personality, image tags, and other speculative material. Injecting up to three full dossiers can consume substantial context and may reveal or invent information that should not be present in the roleplay model's current knowledge.

MeguminSuite does not implement the desired native dialogue colorizer. Its Dialogue Colors add-on asks the model to emit `<font color>` tags and choose a permanent hex value. A separate Inner Chatter renderer recognizes `Name:` speakers, but assigns colors by order within one card rather than by persistent character identity. Both ideas are useful evidence that deterministic speaker parsing is viable; neither is a suitable data model.

Other limitations are:

- no stable opaque character IDs or alias-aware entity resolver;
- no automated tests;
- no package manifest or reproducible test command;
- a broad coupled UI and preset system outside the required scope;
- a discontinued side panel and message-attached tracker cards that interrupt reading;
- inconsistent, non-commercial license declarations that make direct reuse unsuitable without permission.

### 6.3 MeguminSuite disposition

| Capability | Disposition |
| --- | --- |
| Named/voiced/staked discovery threshold | Adapt as a configurable significance rule |
| Automatic discovery plus manual add | Adopt behind stable identity resolution |
| One configurable field registry | Adapt to native typed Character Bank fields |
| Persistent/updatable/locked field classes | Merge with the native lifetime model |
| Change-only updates with undo/provenance | Adopt through validated state events |
| Ignore list and injection cap | Adopt as retrieval controls |
| Full dossier TF-IDF injection | Replace with field-level, scene-aware retrieval |
| Model-authored NPC tags | Reject |
| Name-prefix identity and message indices | Replace with stable character/message/branch IDs and aliases |
| Model-authored `<font>` dialogue colors | Reject |
| Speaker-label recognition | Reimplement in the native renderer with Character Bank color assignments |
| Direct code reuse | Avoid without explicit compatible permission |

## 7. Recommended native architecture

The recommended architecture combines a typed application-owned state engine, an isolated optional State Worker, branch-safe event history, and a clean handoff from live Scene State to fixed Memorybook Scene Details. The child notes define each boundary independently.

### 7.1 Authoritative records

The native system should maintain three related records:

1. **Scene State snapshot** — the current typed values for one chat branch.
2. **State event ledger** — validated changes with stable entity IDs, source message IDs, source revision, branch ID, worker/configuration version, confidence, and timestamps.
3. **Checkpoints** — occasional complete snapshots that make replay and recovery fast without discarding the underlying provenance.

This combines Horae's reconstructable changes with Multihog's checkpoint/history protections. Stable IDs replace array positions and free-form names.

### 7.2 State Worker contract

After an eligible committed message or configured batch, the State Worker receives:

- the current schema and enabled tracker definitions;
- the current compact state or the relevant subset;
- only unprocessed eligible source messages;
- necessary Character, Persona, and Lorebook identity hints;
- a strict output schema and token budget.

It returns typed operations such as set, add, remove, replace, or clear, with source evidence. The application validates field types, entity references, provenance, scope, job identity, chat ID, branch ID, source revision, and expected state revision. Invalid or stale output commits nothing. The worker never calls the roleplay model directly and never edits message prose.

Every update cadence, model, prompt, confidence threshold, retry, budget, and automation behavior remains configurable under progressive disclosure, following the broader Memorybook configuration principle.

### 7.3 Scene Details handoff

At **End Scene Here** or a safety checkpoint, the Long Memory extractor receives the exact source range and supporting Scene State reconstructed at that range's cutoff on the same branch, with only applicable manual corrections and provenance. Never substitute the latest snapshot from a later scene. It independently extracts the fixed Scene Details record.

The Long Memory entry stores only the extracted Scene Details, not the mutable Scene State snapshot, state-event ledger, or tracker history. Scene State remains confined to ongoing tracking and Persistent Scene Memory. Later source edits can mark the extracted entry stale and offer regeneration; current Scene State changes do not rewrite it.

Persistent Scene Memory derives its Story Continuity Profile, location, and present-character cards from Scene State. Short Memory remains separate. Exact **Remember This** pins remain separate from automatic tracker output.

### 7.4 Inheritance and ownership

- Tracker definitions and enabled modules may be inherited from application defaults, Persona defaults, Character preferences, or a reusable tracker configuration. “Context Profile” is retired terminology and never means cross-chat learned memory.
- A new chat receives configuration, never state values or Memorybook history from another chat.
- An existing chat restores its exact tracker configuration, values, event history, and State Worker cursor.
- Temporary changes remain chat-local unless explicitly saved as a reusable configuration.
- Branches copy state only up to their branch point and then maintain independent revisions.

## 8. Required implementation invariants

The following are release requirements, not optional refinements:

1. A State Worker result can commit only to the exact chat, branch, source revision, schema version, and expected state revision that launched it.
2. Newer work aborts or supersedes older work deterministically.
3. Empty values have explicit semantics; clearing the scene cast, location, or another field must not be confused with no change.
4. Model output is structurally validated before any state mutation.
5. Manual corrections are first-class events with provenance and survive replay.
6. Edits, deletions, swipes, regeneration, and branches invalidate or replay dependent tracker changes predictably.
7. Failed tracking never blocks ordinary chat generation.
8. Prompt injection uses a budgeted projection of state, not the complete database.
9. Secrets and provider selection live in the application's shared NanoGPT connection layer.
10. Scene Details are independently extracted, fixed, attributable to their source range, and contain no live Scene State or tracker history.
11. Visual presentation reads application state and never requires the roleplay model to emit HTML, CSS, colors, meters, or tracker cards.
12. Each tracker declares an explicit model-delivery policy: Visual-only, On change, When relevant, or Always current.
13. Dialogue color belongs to a stable Character Bank identity and never to model-generated markup.

## 9. Verification performed

- All 8 Horae JavaScript files passed Node syntax checks.
- All 257 Multihog JavaScript files passed Node syntax checks.
- Horae contains no discovered automated test suite.
- Multihog contains 123 test files and approximately 895 test cases.
- Multihog's test suite was not executed because `node_modules` was absent and `vitest` was therefore unavailable. No dependency installation was performed as part of this read-only audit.
- All 89 MeguminSuite JavaScript files passed Node syntax checks.
- MeguminSuite contains no discovered automated test suite or package manifest.

Syntax checks establish parseability only. They do not establish runtime compatibility, data correctness, performance, or mobile suitability.

## 10. Decision and next specification work

The foundation decision is:

> Build a native, typed Scene State engine. Use Horae as the live-state domain reference, Multihog as the reliability and orchestration reference, and MeguminSuite's NPC Bank as a narrow reference for character discovery, field lifetimes, change-only updates, and undo. Do not integrate any extension wholesale. Defer DnD Playing Mode until after the first final release.

The next working session should finalize the optional Scene Details fields, exact time/date/location representations, identity and clearing rules for live Scene State, evidence requirements, update cadence, manual editing, stale-state behavior, and the minimum evaluation corpus for selecting the State Worker model and prompt.
