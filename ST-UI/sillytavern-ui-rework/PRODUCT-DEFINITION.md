# SillyTavern Rework — Product Definition

**Status:** Defining  
**First recorded:** 2026-08-31  
**Last updated:** 2026-09-04  
**Related:** [Development Bible](./README.md) · [Living Delivery Plan](./REWORK-PLAN.md)

This document contains the Phase 1 product-definition artifacts: the core workflow inventory, original UI delta ledger, and extension integration register. Entries reflect current product intent and will be refined into acceptance criteria during subsequent reviews.

## 1. Product focus established so far

The rework is primarily a fast, focused character-chat application for a user who:

- maintains many characters, personas, and conversations;
- changes chats frequently;
- wants the correct persona, lore, model, and preset to follow the active character or conversation automatically;
- uses hosted NanoGPT models through an API;
- values strong model defaults over constant parameter tuning;
- wants memory and world knowledge to be understandable and inspectable;
- wants selected extension capabilities to feel native rather than bolted on;
- does not want rarely used model and extension controls crowding the conversation experience.

The core product problem is therefore not a lack of controls. It is reducing the effort required to enter the right conversation with the right context.

## 2. Initial product priorities

These priorities define the first-release product boundary: preserve the core roleplay workflow, simplify common actions, hide specialist complexity until requested, and build memory and continuity as native capabilities. The child notes turn that direction into specific user and product requirements.

### Must

- Fast browsing and switching across many chats, characters, and personas.
- Reliable character chat with message editing, continuation, regeneration, swipes, and branching.
- Automatic, visible associations among chats, characters, personas, lore, models, and presets.
- A much simpler default interface with advanced settings progressively disclosed.
- NanoGPT connection, model selection, streaming, and actionable errors.
- A layered, inspectable memory system.
- A simplified Lorebook experience with meaningful categories.
- Character-card management and editing.
- Clean Electron operation with an in-app console and no production terminal window.
- Safe migration of existing characters, personas, chats, lorebooks, and presets.

### Should

- Native dialogue coloring for multi-character roleplay.
- Character discovery and import through selected external libraries.
- Native qualitative Scene State trackers for roleplay continuity.
- Native ambient tracker visuals and a chat-relative Character Bank with dialogue-color identities.
- Token-efficient internet research with visible sources and user control.
- Equivalent core workflows on Android where the selected mobile topology permits them.

### Could or later

- Optional DnD Playing Mode, including bars, attributes, skills, equipment rules, reputation meters, levels/XP, dice, combat, and broader simulation.
- Image generation as an optional, non-primary module.
- Compatibility surfaces for less-used extensions that are not integrated natively.

### Not part of the default product experience

- Local-model runtime management.
- A permanently visible terminal.
- Large walls of model parameters in the primary workflow.
- Primary navigation dedicated to character expressions, voice, advanced formatting, translation, idle behavior, or vector storage.

These capabilities may be deferred, kept compatible, or offered as optional modules after the compatibility review. “Not default” does not yet mean “removed from the codebase.”

## 3. Core workflow inventory — version 1

| ID | Workflow | Priority | Platform | Intended direction | Definition status |
| --- | --- | --- | --- | --- | --- |
| `PROD-WF-001` | Find and switch chats rapidly | Must | Both | Searchable recent/pinned chat library with character and persona context visible | Needs detailed flow |
| `PROD-WF-002` | Browse and manage a large character library | Must | Both | Search, filters, collections/tags, recent use, favorites, and clear active-chat entry | Needs detailed flow |
| `PROD-WF-003` | Switch or manage personas | Must | Both | Persona library with clear active identity and associations | Needs detailed flow |
| `PROD-WF-004` | Restore an existing chat exactly | Must | Both | Each chat remembers its persona, model, preset, Lorebooks, settings, Memorybook, and tracker state | Direction established |
| `PROD-WF-005` | Start a new chat from safe defaults | Must | Both | Optional character-preferred model/preset and matching Generation Settings first; pinned Default Settings fills the rest; no memory from older chats | Direction established |
| `PROD-WF-006` | Send and receive streaming messages | Must | Both | Focused composer, streaming state, stop, retry, and recovery | Needs detailed flow |
| `PROD-WF-007` | Edit, continue, regenerate, swipe, and branch | Must | Both | Message actions remain close to the selected message without permanent clutter | Needs detailed flow |
| `PROD-WF-008` | Connect NanoGPT and choose models | Must | Both | Full model management in Preferences plus a duplicate quick switch in the Generation panel with visible model costs | Needs API/cost validation |
| `PROD-WF-009` | Save, export, and apply Generation Settings | Must | Both | Save replaces the selected writable settings; Export creates a portable file; named bundles remember model, preset, core parameters, and optional Preset Configuration; one can be pinned as Default Settings | Direction established |
| `PROD-WF-010` | Adjust common generation controls | Must | Both | Temperature, Context Size, Response Length, Top P, and Top K are exposed in a clear collapsible section | Direction established |
| `PROD-WF-026` | Save different configurations of one preset | Must | Both | Named Preset Configurations store a base preset’s rules and switches, such as Chatfill — Longform — NSFW | Direction established |
| `PROD-WF-011` | Understand current prompt/context usage | Must | Both | Clear context budget plus inspectable contributing sources | Needs technical validation |
| `PROD-WF-012` | Maintain short-term conversational memory | Must | Both | A chat-owned Memorybook contains a rolling summary that can be viewed, edited, regenerated, pinned, or disabled | Needs lifecycle specification |
| `PROD-WF-013` | Maintain long-term chat memory | Must | Both | Episodic and durable memories remain inside that chat’s Memorybook and are not inherited by new chats | Needs lifecycle specification |
| `PROD-WF-014` | Manage lore and world knowledge | Must | Both | Category-led interface with strong defaults and advanced ordering only when requested | Needs detailed flow |
| `PROD-WF-015` | Inspect why memory or lore was used | Must | Both | Each injected item shows source, reason, layer, and relevant scope | Needs technical validation |
| `PROD-WF-016` | Create and edit character cards | Must | Both | Native card editor informed by ST Card Editor; progressive fields and validation | Format audit complete; metadata placement pending |
| `PROD-WF-017` | Import and export character cards | Must | Both | Safe, compatible card exchange with preview and conflict handling | Format audit complete; compatibility corpus pending |
| `PROD-WF-018` | Distinguish speakers in multi-character roleplay | Should | Both | Native deterministic dialogue colors with accessible fallbacks and user overrides | Needs UX specification |
| `PROD-WF-019` | Discover and download characters | Should | Both | Unified character-library surface for approved external sources | Needs source/terms audit |
| `PROD-WF-020` | Track roleplay state | Should | Both | Typed qualitative Scene State derived from the Horae/Multihog audit; DnD Playing Mode deferred | Needs functional schema |
| `PROD-WF-021` | Search the internet for relevant facts | Should | Both | User-controlled search, compact evidence selection, caching, and visible sources | Needs provider/privacy design |
| `PROD-WF-022` | Back up, restore, and migrate data | Must | Both | Explicit backups, safe migration, validation, and recovery | Needs data audit |
| `PROD-WF-023` | Diagnose application problems | Must | Desktop | Preferences → Advanced → Console with redacted logs and runtime controls | Direction established |
| `PROD-WF-024` | Use image generation | Could | Both | Optional module; no permanent primary-workspace footprint | Scope deferred |
| `PROD-WF-025` | Use voice, expressions, translation, or advanced formatting | Later | TBD | Compatibility/optional-module decision rather than native v1 priority | Needs compatibility review |

## 4. Settings, associations, and inheritance — decided direction

The term **Context Profile** is retired because it could imply that conversational memory follows a character into a new chat. Settings and memory are separate systems.

### Product objects

| Object | Scope | Contents and responsibility |
| --- | --- | --- |
| Chat State | One chat | Exact active persona, model, preset, settings, Lorebook links, Memorybook, and tracker state |
| Character Defaults | New chats for one character | Default persona association, Lorebooks, and optional preferred model/preset for advanced users |
| Persona Defaults | New chats using one persona | Fallback Lorebooks and settings not specified by the character |
| Default Settings | Application-wide protected baseline | The pinned known-good Generation Settings file |
| Generation Settings | Reusable local files | Named bundles of model, preset, core parameters, and optional Preset Configuration |
| Preset Configuration | Reusable local files | A named variant containing the selected preset’s full rules and switches |
| Memorybook | One chat | Summaries, episodic memory, durable chat memory, and chat-relative memory metadata |
| Lorebook | Persona/character-relative | Reusable world, character, persona, knowledge, and behavioral context |

### Existing chats

- Opening or switching to an existing chat restores its exact saved state.
- This includes persona, NanoGPT model, preset, settings, linked Lorebooks, Memorybook, and tracker state.
- A change made for that chat is a **chat-specific setting**, not a “temporary” or cloud/local distinction.
- Active settings and their source remain visible and explainable.
- A missing model, deleted Lorebook, or unavailable module creates a repairable state rather than silently changing behavior.

### New chats

- A new chat starts with the selected character’s defaults.
- The Character editor may define an optional preferred model and preferred base preset under an advanced **Preferred Generation** section.
- If both are present, the preferred Generation Settings file designated for that model/preset combination loads automatically.
- If only the preferred model or preferred preset is present, the missing half comes from the pinned Default Settings before combination-specific matching is evaluated.
- If neither is present, the pinned Default Settings supplies the complete generation configuration.
- Persona defaults continue to fill Persona/Lorebook associations the Character does not specify; model and preset selection follow the Character/Default Settings rule above.
- The new chat receives the selected Persona, Character Card, and associated Lorebooks as foundational context.
- The new chat starts with a new, empty Memorybook.
- No summary, episodic memory, durable chat memory, or tracker state is inherited from another chat with the same character.
- Any cross-chat transfer of learned information must be an explicit user action, such as copying an entry into a Character- or Persona-relative Lorebook.

### Settings protection and versioning

- **Default Settings** is the known-good Generation Settings file selected with a pin action and clearly identified when active.
- **Save** atomically replaces the currently selected writable user settings file. When that file is pinned as Default Settings, Save updates the pinned default after creating a recoverable snapshot.
- **Export** creates a separate portable file and does not silently change the active selection.
- **Revert to Default Settings** reapplies the protected baseline to the active configuration without deleting chat data or other saved settings.
- Replacing which Generation Settings file is designated as Default requires a separate explicit pin/**Set as Default** action.
- When the default designation changes, the previous settings file remains available unless the user explicitly removes it.
- Preset Configuration files are saved independently so multiple rule/switch variants can share the same base preset.
- Import, export, backup, and migration preserve Generation Settings, Preset Configurations, the default designation, and chat-specific selections.
- Character-preferred model/preset metadata is optional, is not required to create or use a card, and must not make standard character-card interchange invalid.

## 5. Generation configuration and panel — decided direction

The product must preserve SillyTavern’s power without presenting every provider and sampler control simultaneously. Model management, Generation Settings, and Preset Configurations are separate concepts with clear ownership.

### Configuration hierarchy

| Layer | Contains | Example |
| --- | --- | --- |
| Connection/API | NanoGPT credential, connection status, available models, provider metadata | NanoGPT account and model catalogue |
| Model | Selected hosted model plus current price/capability metadata | A specific NanoGPT model |
| Base Preset | The underlying preset family | Chatfill or Deus Ex Machina |
| Preset Configuration | A named saved variant of all rules and switches belonging to a base preset | Chatfill — Longform — NSFW; Chatfill — SMS-like — SFW |
| Generation Settings | A named reusable bundle tying together model, base preset, Preset Configuration, Temperature, Top P, Top K, Context Size, and Response Length | “Long RP — Model A — Chatfill Longform” |
| Default Settings | The pinned known-good Generation Settings bundle | Global fallback and Revert target |

### Preferences placement

Full connection and model management belongs in a dedicated **Preferences → AI & Models** area rather than the main application chrome. It includes:

- NanoGPT credentials and connection testing;
- available-model refresh and search;
- model capabilities and limits;
- input and output pricing when the provider supplies it;
- price units and metadata freshness;
- favorites and availability state;
- the complete list of Generation Settings and Preset Configurations;
- create, duplicate, rename, archive, import, and export actions;
- explicit management of which Generation Settings file is pinned as Default.

Unknown or stale pricing must be labeled rather than guessed.

### Generation panel structure

The contextual Generation panel duplicates only what is useful during a conversation. It uses clear collapsible sections:

#### Quick setup

- **Model** — quick switch using the same model catalogue as Preferences;
- visible model pricing beside or within the selector;
- **Preset** — choose the base preset;
- **Generation Settings** — load a named bundle;
- pin action to designate the selected Generation Settings as Default;
- **Revert to Default Settings**;
- clear modified/unsaved indicator when active values differ from the loaded file.

#### Core parameters

- Temperature;
- Context Size;
- Response Length;
- Top P;
- Top K.

Each control shows its current value, supports direct entry where useful, explains its effect in beginner-friendly language, and can reset to the loaded Generation Settings value.

#### Preset configuration

- select or save a named Preset Configuration;
- show the base preset it belongs to;
- display the full list of that preset’s rules and switches;
- allow configurations such as longform/SMS-like and NSFW/SFW without duplicating the base preset;
- indicate when rules or switches differ from the loaded configuration.

#### Advanced

- all remaining supported model, sampler, compatibility, and provider-specific settings;
- collapsed by default;
- searchable when the number of settings warrants it;
- unavailable controls hidden or clearly disabled based on model/provider capabilities.

### Non-bloat rules

- One Generation panel; do not scatter related controls across unrelated menus.
- Collapsed sections show a useful one-line summary of their active state.
- The main workspace never shows the full rule list or advanced sampler list unless the user expands it.
- Common selectors are keyboard and touch friendly and support search when lists are long.
- Beginners can rely on Default Settings and named bundles without understanding sampler terminology.
- Advanced users retain direct access to every supported rule, switch, and parameter.
- Duplicated model selection is one shared state and data source, not two competing configuration systems.
- Switching model or settings inside an existing chat updates that chat’s saved state without silently changing Character, Persona, or global defaults.
- Saving changes always identifies which selected Generation Settings, Preset Configuration, chat state, Character Default, or Default Settings file will be replaced. Export is the explicit route for creating a separate portable file.

### Automatic loading precedence

Generation configuration resolves predictably:

1. An existing chat restores its exact saved generation state.
2. A new chat reads the Character’s optional preferred model and preset.
3. The single preferred Generation Settings file for that model/preset combination loads when one is designated.
4. The pinned Default Settings supplies any unspecified values and is the complete fallback when the Character has no preference.

Only one Generation Settings file can be designated as preferred for a particular model/preset combination. Other files for that combination remain available for manual selection. If a Character’s preferred model or preset is missing, unavailable, or incompatible, the app visibly falls back to Default Settings and offers a repair action.

Preferred model/preset controls belong in the Character editor’s Advanced area and are never mandatory. The Character Card format audit is complete; app-local preferences with explicit namespaced export remain the proposed placement awaiting confirmation.

## 6. Memorybooks and Lorebooks — decided separation

The code-level foundation audit is recorded in [Memorybook Foundation Audit](./MEMORYBOOK-FOUNDATION-AUDIT.md). Agreed behavior is defined in the living [Memorybook Functional Specification](./MEMORYBOOK-FUNCTIONAL-SPEC.md). Summaryception is the behavioral reference for replaceable short/mid-term compression; Memory Books is the structural reference for durable memory, provenance, review, branching, rollback, and background jobs. Neither extension will be integrated wholesale.

Memory should be layered, inspectable, and user-correctable. Memorybooks and Lorebooks have different ownership and must not be treated as interchangeable names for the same storage.

- **Memorybooks are relative to chats.** They record what developed inside one conversation.
- **Lorebooks are relative to Personas and Characters.** They provide reusable foundational knowledge for any new chat that intentionally links them.
- Starting a new chat never imports another chat’s Memorybook automatically.
- Moving knowledge from a Memorybook into a Lorebook is explicit and user-controlled.
- Short-term Memorybook summaries are compressed, injected directly as recent continuity, and replaceable as the chat advances.
- Long-term Memorybook entries are durable and fixed after creation unless the user explicitly edits, compacts, replaces, or deletes them.
- Durable entries remain separate records; consolidation may change which records are active for retrieval but does not silently destroy the sources.
- Raw chat messages are never deleted by memory processing.

### Proposed memory layers

| Layer | Purpose | Typical contents | User control |
| --- | --- | --- | --- |
| Recent context | Immediate conversational continuity | Most recent raw messages | Context window visibility; pin/exclude where supported |
| Memorybook: short-term summary | Compress the recent scene in this chat | Current situation, intentions, unresolved actions | View, edit, regenerate, pin, disable |
| Memorybook: persistent scene memory | Keep a compact active working set parallel to Short Memory | Dynamic cards for current Story Continuity Profile, location, and present characters plus exact Remember This message pins | Inspect, correct, pin, unpin; configure persistence and budget |
| Memorybook: episodic memory | Preserve earlier scenes in this chat | Session summaries, important developments, milestones | Browse, search, merge, archive, delete |
| Memorybook: durable chat memory | Preserve facts established in this chat | Relationships, discoveries, promises, chat-specific history | View, edit, promote explicitly, archive, delete |
| Live Scene State | Maintain the current scene while roleplay is ongoing | Current time/date, location, and characters present; Cast continuity plus the chat-owned Story Continuity Profile | Inspect and correct through Persistent Scene Memory; never copied wholesale into Long Memory |
| Character/Persona Lorebooks | Provide reusable foundational context | World facts, character knowledge, persona facts, behavioral rules | Link, unlink, categorize, edit, share explicitly |

### Memory requirements

- Users can see what the model will receive and why.
- Automatic memory writes must be inspectable after creation and attributable to their source conversation; they do not require pre-activation approval.
- Incorrect memories can be corrected or removed without editing opaque internal data.
- Durable chat facts and temporary summaries are not mixed indiscriminately inside a Memorybook.
- Summaries should be layered or rolled forward rather than repeatedly replacing all history with one uncontrolled paragraph.
- Memorybook content never crosses into a new chat automatically.
- Promotion from a Memorybook to a Character- or Persona-relative Lorebook requires an explicit action and preview.
- Every derived or durable record retains stable source-message provenance and a content fingerprint.
- Edits, deletions, swipes, and branches invalidate or fork dependent memory before it can be injected again.
- Background results commit only to the chat and source revision from which they were generated.
- Memory generation failures must not block ordinary chat.
- Memory actions and content must be included in backup, migration, and diagnostic privacy reviews.

### Short Memory trigger and turn definition

- Automatic Short Memory supports two configurable trigger modes: accumulated eligible tokens or roleplay turns. It can also be disabled for manual-only operation.
- A roleplay turn starts with each newly committed model message. The user reply or replies that follow belong to that same turn.
- A consecutive model message produced through Continue starts the next turn even when the user did not reply.
- Regeneration and swipe alternatives retain the existing turn identity; they do not increase the count merely because another candidate was generated.
- The default verbatim behavior preserves Summaryception's working rhythm: a 10-turn raw ceiling and a 3-turn oldest-first compression batch, resulting in approximately 8–10 recent turns remaining verbatim during ordinary use.
- Those values remain configurable. Summaryception's recursive 20-snippet, 3-promotion, and 5-layer defaults are not inherited until the replacement compression structure is specified and safely bounded.
- Trigger thresholds, recent-context buffers, prompts, generation profiles, injection limits, and retained summary history are configurable, with advanced controls collapsed by default.
- The processed threshold boundary advances only after a valid Short Memory result is committed safely.

### Long Memory and persistent scene direction

- Durable entries combine longform text with tiny recall cards, activation tags, emitted tags, typed links, entities, chronology, importance, and stable provenance.
- Recursive recall searches tags, cards, and links locally. A strict configurable injection budget determines which full entries and supporting cards reach the roleplay model.
- Persistent Scene Memory keeps cards for the Story Continuity Profile, current location, present characters, and explicitly pinned scene memories active in parallel with Short Memory.
- Persistent Scene Memory values do not decay by time or turns. Dynamic cards are replaced or retired only when evidence, manual action, source invalidation, or semantic lifecycle rules make them no longer current; pinned messages remain until explicitly unpinned.
- Remember This defaults to a configurable ten-message limit. Advanced users may instead select a customizable 2,000-token default budget based on the active model's exact serialized prompt tokenizer where available; pins are never silently evicted or omitted.
- Recursive recall exposes Light direct-only, Default two-hop, Deep three-hop, and Advanced-only Custom modes. Candidate, full-entry, Tiny Recall, token, context-percentage, and response-reserve ceilings remain enforced independently of hop depth.
- When State Worker functions are enabled, a Local or API worker may update the tracker through schema-validated changes with source evidence. It never talks directly to the roleplay model or writes unvalidated state.
- Local uses a hidden app-owned `llama.cpp` runtime with a verified 2B-class GGUF or a compatible model selected through Browse. API uses the existing SillyTavern provider/profile surface. Setup requires Local, API, or explicit Disable.
- Long Memory extraction supports explicit scene boundaries and configurable safety intervals. Safety checkpoints extract part of a long scene without falsely ending it.
- End Scene Here appears between messages, inserts a branch-aware divider, and triggers background Long Memory extraction for the closed range. Mobile exposes an equivalent End Scene After This Message action.
- Remember This operates on one message only and pins its exact content into Persistent Scene Memory until unpinned; it does not create a Long Memory entry.
- The State Worker may propose scene boundaries. Off, Suggest, and Automatic modes are configurable; Suggest is the initial model-assisted default, while Automatic requires prompt/model evaluation against labeled edge cases.
- Scene State is confined to ongoing tracking and Persistent Scene Memory. Its typed snapshots, validated changes, and recovery checkpoints are operational state rather than Long Memory content.
- At extraction time, the source messages and current validated state inform a separate fixed Scene Details record. The entry stores no live Scene State snapshot, tracker ledger, or tracker history.
- Confirmed Scene Details fields are a display-only one-sentence Scene Summary, one approximate time-of-day phase, date/month/year where known, all characters materially present during the scene, and a simple or hierarchical location. No advancing exact timestamp is stored.
- Scene Summary exists only to help the user scan and navigate saved scenes. It is excluded from retrieval, activation, embeddings, scoring, prompt injection, and model context; Tiny Recall remains a separate machine-facing field.
- Live Cast continuity includes mood, current activity, clothes, salient inventory, presence, and visible condition. Character identity supports age, pronouns, species/type, dialogue color, aliases, and an optional portrait/avatar. These live fields remain separate from fixed Scene Details extraction unless a later extraction decision explicitly includes them. A chat-owned Story Continuity Profile uses primary Fandom, optional Crossover plus a second Fandom, Era, and AU; AU gives established roleplay continuity precedence over conflicting canon chronology.
- A successful extraction immediately and atomically creates an active Long Memory entry. There is no draft or approval queue.
- Each entry contains Scene Details, a substantially more detailed longform summary than Short Memory, a Tiny Recall card, activation and emitted tags, typed relationships, importance/entities, and complete provenance.
- Longform extraction retains Memory Books' configurable 4,000-output-token default and detailed beat-by-beat behavior. Tiny Recall is normally two to four short subject–verb statements, one for the Persona and each principal non-user character, with a 128-token ceiling.
- Extraction preserves a frozen source and pending boundary, uses at most two classified transport retries and one structured repair within a four-call cap, and commits no partial entry.
- Tag activation and bounded hopping occur automatically. Only explicit emitted tags and typed links propagate recursion; arbitrary full-memory rescanning cannot create an uncontrolled chain.
- Suggest remains the default assisted boundary mode. Automatic requires version-specific qualification on a 400-window labeled corpus, precision-first pass criteria, exact gap placement, branch-safe commit guards, ambiguous two-pass confirmation, and immediate Undo.
- Ordinary use is zero-maintenance after configuration. Entries remain visible and editable for exceptional correction without requiring routine manual tagging or linking.

### Simplified Lorebook categories

The default UI should replace raw order-number management with meaningful category presets. The initial requested taxonomy is:

| Default order | Category | Intended contents |
| --- | --- | --- |
| 100 | World / General Lore | Setting rules, broad world facts, cosmology, common knowledge |
| 200 | Locations / History | Places, institutions, events, chronology, regional knowledge |
| 300 | NPC / Established Knowledge | People, factions, relationships, discovered facts |
| 400 | User Data | Persona-specific facts, preferences, user history, player state |
| 500 | RP Behavioral Rules | Style, boundaries, scenario rules, character or simulation behavior |

Category labels should be primary. Numeric order remains available through an Advanced view for compatibility and expert control. The final injection ordering and collision rules require testing against existing SillyTavern behavior before these values are treated as technical semantics.

## 7. Internet research direction

Internet research should be a deliberate tool, not invisible prompt inflation.

### Intended experience

- Search can be invoked explicitly or enabled for a response under a clear policy.
- Retrieval, deduplication, caching, and initial filtering happen outside the generation model where practical.
- The model receives only the compact excerpts needed for the response.
- Sources are visible and can be opened, excluded, or reused.
- Repeated queries can use cached results within an understandable freshness window.
- Search provider, privacy, safe browsing, and cost behavior are explained in Preferences.

### Token constraint

Fetching search results does not inherently require NanoGPT generation tokens. However, text supplied to the model as evidence occupies input/context tokens. The product goal is therefore **minimal-token grounded research**, not a promise of zero-token model use. Exact retrieval and summarization methods will be selected during architecture validation.

## 8. Original UI delta ledger — version 1

| Existing area | Disposition | Rework direction | Priority/status |
| --- | --- | --- | --- |
| Chat workspace | Rework | Conversation-first center with contextual actions and reduced permanent chrome | Must |
| Chat switching/history | Replace | Fast searchable library optimized for many chats and frequent switching | Must |
| Character management | Rework | Library-oriented browsing plus native progressive card editor | Must |
| Character generation preferences | Add | Optional Advanced section for preferred model and preset; absent values use pinned Default Settings | Must |
| Persona management | Rework | Visible active persona, fast switching, and character/profile associations | Must |
| Model/provider settings | Replace | Full NanoGPT/model management under Preferences → AI & Models; quick model switch with pricing in Generation panel | Must |
| Generation Settings | Replace | Named bundles save model, base preset, Preset Configuration, Temperature, Top P, Top K, Context Size, and Response Length | Must |
| Default Settings | Replace | Pin one protected Generation Settings file; Revert reloads it without overwriting or deleting other files | Must |
| Preset settings | Rework | Base presets support independently saved named configurations of their complete rules and switches | Must |
| Generation parameter menus | Rework | Five common controls in a collapsible Core Parameters section; everything else under Advanced | Must |
| Lorebooks/World Info | Replace | Category-led knowledge and memory workspace with inspectable activation | Must |
| Summary and memory extensions | Replace | Unified layered memory system rather than multiple disconnected panels | Must |
| Context/token display | Rework | Compact status with an inspector for prompt contributors and budget | Must |
| Message swipes/branches | Rework | Preserve power while reducing persistent controls | Must |
| Extension menus | Replace | Shared navigation, settings, permissions, and module surfaces | Must foundation |
| Dialogue Colorizer extension UI | Replace | Native chat rendering preference and per-speaker controls | Should |
| Character Library extension UI | Replace | Native/first-party discovery and import module | Should |
| ST Card Editor extension UI | Replace | Native Character editor | Must |
| Horae or Multihog UI | Replace | Native Scene State surface; no extension UI or DnD control wall in the default product | Should |
| Model/regex tracker cards | Remove | Native ambient clock/environment and collapsible Cast panel preserve prose immersion | Should |
| Image generation | Defer | Optional module; accessible when installed/enabled, absent from default workspace | Could |
| Character expressions | Defer | Compatibility or optional module; no native v1 prominence | Later |
| Voice | Defer | Compatibility or optional module; no native v1 prominence | Later |
| Advanced formatting | Defer | Preserve required rendering compatibility without a primary control surface | Later |
| Translation | Defer | Compatibility or optional module | Later |
| Idle features | Defer | Compatibility or optional module | Later |
| Vector storage UI | Replace/Defer | Hide implementation jargon; retain only if selected memory architecture needs retrieval storage | Architecture decision |
| External terminal | Remove from production UX | Hidden supervised runtime with embedded console | Must |
| Diagnostics | Add | Redacted in-app console, status, restart, and export | Must |

## 9. Extension integration register — version 1

| Extension/capability | Desired value | Initial classification | Target | Required review |
| --- | --- | --- | --- | --- |
| Dialogue Colorizer | Distinguish speakers during multi-character roleplay | Native core candidate | Wave 1 | Parsing reliability, themes, accessibility, overrides, group-chat behavior |
| Summaryception / Memory Books | Short- and long-term continuity | Retire/replace with native memory system | Wave 1 | Existing data formats, summary prompts, migration, editing, failure behavior |
| Character Library | Discover/download cards from ChubAI, JannyAI, CharacterTavern, Pygmalion, and Wyvern | First-party module candidate | Wave 1 or 2 | Source APIs, terms, authentication, attribution, moderation, duplicates, outages |
| ST Card Editor | Create and edit compatible character cards | Native core candidate | Wave 1 | Card specifications, embedded assets, validation, round-trip compatibility |
| Horae | Qualitative roleplay-state vocabulary and replayable changes | Design reference only; clean native reimplementation | Wave 1 Scene State | No declared license in audited snapshot prevents direct code reuse without clarification |
| Multihog DnD Framework | State Worker isolation, per-chat safety, history, recovery, and module catalog patterns | Narrow engineering reference for native Scene State | Wave 1 Scene State | GPL obligations; tagged memo and DnD systems are not adopted as the core data model |
| MeguminSuite NPC Bank | Character discovery, configurable field lifetimes, change-only updates, undo, and injection limits | Narrow design reference for native Character Bank | Wave 1 Scene State | Conflicting non-commercial Creative Commons declarations; no direct reuse selected |
| DnD Playing Mode | Optional numerical mechanics and rules-driven play | Deferred modular native mode | After first final release | Scope, rules engine, dice, mobile UX, compatibility, and maintenance cost |

### Horae and Multihog tracker decision

The capability audit is complete in [Scene State and Tracker Foundation Audit](./TRACKER-FOUNDATION-AUDIT.md). Neither extension will be copied wholesale. The product will implement a smaller typed Scene State foundation first.

The accepted split is:

- Horae informs the compact live-scene vocabulary and replayable-change concept;
- Multihog informs the dedicated State Worker, asynchronous chat/branch commit guards, configuration catalogs, history, and recovery;
- MeguminSuite informs Character Bank discovery thresholds, configurable fields, lifetime distinctions, change-only updates, and undo;
- the native data model uses typed snapshots and change events instead of response tags or one rolling text memo;
- Long Memory receives independently extracted, attributable Scene Details rather than a live tracker snapshot;
- visual tracker consumers render application state directly; dialogue color is stored by stable character identity and never emitted by the model;
- DnD mechanics remain outside first-release scope and may later use the same module contract.

New chats may inherit tracker definitions and enabled modules, but never values. Existing chats restore their exact tracker configuration, values, history, and worker cursor.

## 10. Candidate desktop v1 scope

This is an initial scope proposal, not yet the Phase 1 exit decision.

- Electron application shell and embedded console.
- NanoGPT setup and model use.
- Chat, character, and persona libraries.
- Exact per-chat resolved settings, Character/Persona defaults, and Save/Export with recoverable writable user settings and separately versioned Factory Defaults.
- Complete core conversation workflow.
- Preferences-based model management plus a compact collapsible Generation panel.
- Named Generation Settings, configurable preset variants, pinned Default Settings, and reversible changes.
- Chat-relative Memorybooks and simplified Character/Persona-relative Lorebooks.
- Native character-card editor and compatible import/export.
- Dialogue coloring for multi-character roleplay.
- Backup, restore, and migration.
- Native qualitative Scene State foundation, subject to schema and worker-validation gates.
- Native scene clock, optional environmental ambience, collapsible Cast panel, Character Bank, and Dialogue Colorizer.
- Per-character relationship toward the active Persona, presented as a neutral-centered `-100` to `+100` meter plus a qualitative label.
- Application-validated five-point relationship deltas, a `±10` automatic ceiling, five-turn reversal protection, Realistic five-/ten-turn cooldowns based on influence size, and Creative direct-setting/locking controls.
- Collapsible Cast panel whose character rows reduce to name, mood, and Persona relationship and expand to age, general role, current activity, clothes, salient inventory, and other enabled continuity fields.
- Direct user-only Lorebook Entry shortcut on a Cast character, with no activation, priority, or model-injection side effects from the link itself.
- Card Character, NPC, and Recurring Character discovery tiers with branch-safe speaking-turn counting and no provisional-character state.
- `Name:` and Novel Dialogue modes with configurable theme/Bank colors and optional same-color speaker names.
- Location delivered On change with context-boundary re-anchoring, plus a compact Story Continuity Profile replacing Universe Fandom and Timeline.
- Nine-phase approximate day cycle and visual dial, with time-phase delivery On change and configurable fictional-cycle support.
- Clickable forward-only Time Skip HUD with next-occurrence phase selection, day-boundary detection, and atomic phase/date updates.
- Exactly two enabled weather GFX levels: Static clock-adjacent indicator and Animated upper-third conversation sky, with accessibility and device safeguards falling back to Static.
- OpenWeather-backed opt-in real-world weather with local normalization, no model call for visual updates, and a mandatory licensing/attribution review before distribution.
- Provider-aware usage accounting with configurable Warning and Protection controls; the 60-million-token weekly fixture applies only when an active NanoGPT subscription is detected.
- Character discovery if external-source feasibility is confirmed in time.

## 11. Phase 1 closure questions

The memory, tracker, generation, and application-shell passes have established sufficient product direction. Five remaining decisions now form the complete Phase 1 closure queue; lower-level implementation questions receive an owner and validation method at the exit review rather than expanding this queue indefinitely.

### 11.1 Settings versioning and ownership

The complete decision is defined in [Settings, Defaults, and Versioning Specification](./SETTINGS-VERSIONING-SPEC.md). Human-readable commented development defaults are validated and promoted deterministically into a read-only compiled Factory Defaults module. Validated development builds begin at `0.0.1`, every promoted version receives a local behavioral changelog, and `1.0.0` remains reserved for the first public release. Independent application, persisted-schema, and Factory Defaults revision identities prevent unrelated changes from triggering false migrations.

The field-aware ownership table is accepted. **Factory Defaults** names the shipped developer baseline; **Default Settings** names the user's pinned Generation Settings file. Save atomically replaces current writable user settings with a recovery snapshot, while Export creates a separate portable file. Repository/legal ownership remains with the solo developer and is distinct from settings-layer ownership.

### 11.2 Character Card metadata portability

The supplied complete SillyTavern card and the fork's parser, validator, editor, PNG, JSON, CharX, and export paths are audited in [Character Card Compatibility and Portability Specification](./CHARACTER-CARD-COMPATIBILITY-SPEC.md). The direction is tolerant import, lossless preservation, normalized runtime data, targeted editing, and strict target-aware export. JSON and PNG remain primary while existing SillyTavern compatibility formats and unknown extension data are not needlessly discarded.

The remaining product confirmation is whether new rework-specific preferences stay app-local by default and enter a card only through an explicit **Include App Metadata** export. Standard card content, embedded Character Books, imported extensions, and provenance continue to round-trip; chats, Memorybooks, trackers, relationships, credentials, paths, usage, and local favorite state never enter a standard shared card.

### 11.3 Lorebook compatibility

Identify the SillyTavern Lorebook fields and activation behaviors that must round-trip losslessly even when the default UI hides them behind meaningful categories and Advanced controls. Define migration, export, broken-link repair, and explicit Memorybook-to-Lorebook promotion, including how the user selects Character or Persona ownership.

### 11.4 Internet research

Choose explicit, per-chat, and rule-based activation behavior; provider and credential boundaries; visible evidence and citations; cache freshness and invalidation; safe-browsing behavior; and honest token, request-cost, and privacy disclosure. Retrieval may avoid generation calls, but evidence inserted into model context is never described as token-free.

### 11.5 Exact desktop and Android v1 scope

Approve separate Must/Should/Deferred matrices for desktop and Android rather than assuming identical releases. This decision absorbs Character Library source feasibility, Wave 1 native integrations, compatibility-only extensions, desktop operating-system targets, mobile backend assumptions requiring Phase 2 validation, and release-blocking versus follow-up behavior.

## 12. Next definition pass

Work through the five Phase 1 closure questions in order: settings versioning, Character Card metadata, Lorebook compatibility, internet research, and exact desktop/Android v1 scope. Each decision updates the workflow inventory, UI delta ledger, extension register, and platform scope where applicable.

Detailed Memorybook schema behavior, cross-layer deduplication, branch/source-mutation mechanics, tracker threshold tuning, State Worker model choice, weather refresh and performance, exact provider fields, and external-service feasibility are assigned to later design or validation phases unless they change the promised product behavior.

## 13. Phase 1 exit review procedure

After the exact platform scopes are approved, review every Phase 1 gate rather than treating the last conversation as automatic completion. The review must confirm that core workflows are inventoried and prioritized, every UI delta has a disposition, every considered extension has a classification and release wave, both platform scopes are explicit, and every Must capability has an intended information-architecture home.

Every remaining uncertainty must either block the gate as a product question or carry a named later phase, validation method, and consequence of failure. The review records evidence, resolves contradictions among the Development Bible, Product Definition, and Living Delivery Plan, updates the dashboard, and produces either **Phase 1 Complete** or a short explicit blocking list.
