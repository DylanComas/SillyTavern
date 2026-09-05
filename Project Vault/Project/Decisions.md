---
tags:
  - project/decisions
---

# Decisions

## 2026-09-01 — Use this vault as the project knowledge base

- Keep code and configuration authoritative in their repository locations.
- Use this vault for project documentation, plans, research, decisions, task state, and working context.
- Generate source-document index notes under `Sources/` and heading-level entries under `Entries/`.
- Preserve source documents rather than moving or rewriting them during vault synchronization.

## 2026-09-01 — Limit mirrored documents to collaborative concept work

- Include Markdown files under `concepts/sillytavern-ui-rework/` and `concepts/sillytavern-unified-suite/`.
- Exclude SillyTavern's repository documentation.
- Exclude imported documentation under all cloned extension folders, including Memory Books, Summaryception, Horae, and Multihog.
- Keep the Memory Book foundation audit and functional specification inside the UI-rework folder because they are part of the collaborative rework definition.

## 2026-09-01 — Create and activate Long Memory entries immediately

- Do not place successfully extracted Long Memory entries into a draft or approval queue.
- Atomically create and activate a complete Memorybook entry after structural and source-revision validation.
- Include Scene Details, a detailed longform summary, Tiny Recall, activation tags, emitted tags, typed relationships, importance/entities, and stable provenance.
- Allow later inspection and correction without requiring routine manual maintenance.

## 2026-09-01 — Run Long Memory recall automatically after setup

- Match active entries automatically when their tags become relevant.
- Permit associative hopping only through explicit emitted tags and typed relationships.
- Enforce configurable recursion and context budgets during automatic retrieval.
- Preserve manual intervention for optional correction, pinning, and advanced tuning rather than ordinary operation.

## 2026-09-01 — Build a native qualitative Scene State engine

- Do not integrate Horae or Multihog wholesale.
- Use Horae as the domain reference for qualitative fanfiction-style continuity and replayable changes.
- Use Multihog as the engineering reference for an isolated State Worker, chat/branch commit guards, configuration catalogs, history, and recovery.
- Store typed snapshots, validated state events, and recovery checkpoints instead of response tags or one rolling text memo.
- Confine Scene State to ongoing tracking and Persistent Scene Memory; Long Memory stores only a separately extracted, fixed Scene Details record.
- Treat Horae as design research only unless its missing license is clarified; review Multihog's GPL obligations before any direct reuse.

## 2026-09-01 — Defer DnD Playing Mode

- Keep the first-release tracker focused on story continuity rather than numerical game mechanics.
- Defer bars, attributes, skills, equipment rules, reputation meters, levels/XP, dice, combat, and related simulation until after the first final release.
- Preserve a modular contract so those systems can be added later without cluttering the default product.

## 2026-09-01 — Establish the Scene Details base

- Require a one-sentence Scene Summary for user-facing display and navigation only.
- Record time of day as an approximate named phase from the configured story-day cycle; do not store or simulate an exact clock time.
- Record date, month, and year where known without inventing unavailable precision.
- Record every character materially present during the extracted scene; this differs from the live Scene State cast, which means present now.
- Record one simple location or an ordered hierarchical location path.
- Keep per-character mood, activity, clothing, disguise, and visible condition as optional candidates.
- Consider universe/reality/timeline as an optional field for stories that need it.
- Exclude Scene Summary from retrieval, activation, embeddings, scoring, prompt injection, and model context; keep Tiny Recall independent.

## 2026-09-01 — Replace generated tracker cards with native visual state

- Keep the conversation prose-first: do not place model-generated status bars, regex dashboards, or tracker cards beneath messages.
- Render live state through native surfaces: an upper-left scene clock, an optional environmental layer, and a collapsible Cast panel.
- Make environmental animation configurable and subordinate it to reduced-motion, contrast, performance, battery, and mobile-thermal limits.
- Keep all visuals application-owned; the roleplay model may propose structured state changes but never emits tracker HTML or styling.

## 2026-09-01 — Give every tracker a lifetime and model-delivery policy

- Support Persistent, Progressive, Scene-bound, Volatile, and Manual-lock lifetimes.
- Support Visual-only, On change, When relevant, and Always current model-delivery policies independently for each tracker.
- Treat model-facing change-only delivery as a token-saving tradeoff, not persistent model memory: hosted APIs remain stateless outside the context sent with each request.
- Expose every injected tracker value and its token cost in the context inspector.
- Start real-world weather as an opt-in provider-backed mode whose visuals update without model involvement; send compact weather to the roleplay model only according to the configured policy.

## 2026-09-01 — Build a chat-relative Character Bank and native Dialogue Colorizer

- Store automatically learned NPCs and relationships with their chat; new chats inherit configuration but not another chat's learned Character Bank.
- Give every character an opaque stable identity, aliases, stable message provenance, presence state, dialogue color, optional portrait, enabled continuity facets, and typed relationship history.
- Combine deterministic speaker-label recognition with optional State Worker discovery and an always-available manual Add Character action.
- Support rename, alias, merge, split, ignore, lock, undo, and branch-safe replay for automatically discovered records.
- Store dialogue colors on stable Character Bank identities and apply them at render time from recognized speaker labels such as `Name:`; never ask the model to generate `<font>` markup.
- Keep the raw message unchanged so a color edit updates past and future recognized dialogue consistently.
- Use MeguminSuite as a narrow design reference for NPC significance, configurable fields, change-only updates, history, and undo—not as a selected direct dependency. Its repository license signals are inconsistent and noncommercial, so code reuse requires separate permission and compatibility review.

## 2026-09-02 — Combine Persona relationship labels with a visual meter

- Track one directed relationship from every first-release Character Bank identity toward the active Persona attached to that chat.
- Display both a neutral-centered `-100` to `+100` disposition meter and a short descriptive adjective or phrase.
- Treat the value as overall disposition rather than romance, obedience, morality, or a reward mechanic.
- Change relationships only for meaningful evidence-backed events; do not increment them after routine messages.
- Derive the default descriptive label from configurable score bands so ordinary updates need no additional model call.
- Keep the meter and score Visual-only by default; send the compact qualitative label to the roleplay model only when that character is relevant.
- Defer Character-to-Character relationships beyond the first release. Preserve a sparse directed-edge design that can retrieve only relevant current-cast relationships and reuse the normal State Worker pass.

## 2026-09-02 — Lock the initial relationship bands as configurable defaults

- Use Hostile for `-100` to `-76`, Antagonistic for `-75` to `-51`, Distrustful for `-50` to `-26`, Wary for `-25` to `-11`, Neutral for `-10` to `+10`, Receptive for `+11` to `+25`, Friendly for `+26` to `+50`, Trusting for `+51` to `+75`, and Devoted for `+76` to `+100`.
- Treat these as locked defaults for the current design pass, not immutable product constants.
- Allow settings to rename the labels and change the score bands later.

## 2026-09-02 — Use nested progressive disclosure in the Cast panel

- Collapse the whole Cast panel to a compact launcher and count; expand it into a character list with a visible `+` action for manual character creation.
- Let every character item collapse independently.
- Show only name, mood, and Persona relationship in a reduced character item.
- Show grouped tracked information in an expanded item: name, age, relationship, general role/occupation, current activity, mood, clothes, and salient inventory.
- Store general role separately from current activity even if the interface groups them.
- Limit inventory to active or relevant objects and explicit carried/nearby/missing/transferred/broken state changes; never construct an exhaustive possessions list.
- Include presence and visible condition in the first release; support pronouns, species/type, aliases, and dialogue color when relevant, with optional hideable portrait/avatar presentation.
- Keep hidden motives, secrets, private thoughts, exhaustive biographies, and complete inventories out of the default Cast panel.

## 2026-09-02 — Replace the Cast manual note with a Lorebook Entry shortcut

- Remove the abstract short manual-note field from the default Cast design.
- Allow a Character Bank record to expose one primary Lorebook Entry link for direct user navigation and editing.
- Store the link by stable entry identifier rather than title, folder, position, tag, or copied content.
- Preserve the link through entry renames and reorganization; show a repairable broken-link state if the target is deleted or unavailable.
- Offer Link, Create, Open, Relink, and Unlink actions without losing the user's Cast panel position.
- Treat the shortcut strictly as user-interface navigation. Creating, linking, unlinking, opening, or navigating never activates, injects, reprioritizes, enables, disables, or duplicates the entry.
- Let edits affect later prompts only through the Lorebook entry's ordinary activation rules, as they would when editing from the Lorebook workspace.
- Never promote a chat-discovered NPC into reusable Lorebook knowledge automatically; creating or selecting its link is an explicit user action.

## 2026-09-02 — Deliver location only when it changes

- Set Location's default model-delivery policy to On change instead of Always current.
- Include a validated location change in the next eligible roleplay request, then rely on retained conversation prose while it remains recent.
- Re-anchor the current location through Short Memory or Persistent Scene Memory when the originating evidence is about to leave retained context.
- Treat context compaction, branch restoration without the source event, and explicit correction as boundaries that may make the current location eligible again without repeating it on every message.

## 2026-09-02 — Replace Universe Fandom and Timeline with a Story Continuity Profile

- Rename the primary Universe Fandom field to Fandom.
- Add a Crossover checkbox that reveals a second Fandom field when enabled and omits it when disabled.
- Rename Timeline to Era.
- Add an AU (Alternate Universe) checkbox.
- When AU is enabled, established roleplay state, explicit user direction, and chat memory override conflicting canon chronology, outcomes, and timeline-dependent lore.
- Keep applicable fandom lore available in AU mode; AU changes conflict precedence rather than disabling all lore.
- Store the profile with the exact chat state. Recommend a tiny Always-current model line so its governing continuity remains unambiguous, subject to confirmation during the remaining delivery-default review.

## 2026-09-02 — Let models propose relationship changes while the application retains authority

- Store every relationship score as an integer in the inclusive `-100` to `+100` range.
- Let a configured automation source propose an evidence-backed signed delta rather than write the final score.
- Require stable Character/Persona identities, evidence message references, and a concise reason category on automatic proposals.
- Let the application enforce range, configured step size, cadence, aggregation, locks, provenance, branch validity, and undo.
- Quantize all stored scores and accepted deltas to multiples of five.
- Limit automatic changes to `±5` or `±10`, with ten points as the absolute maximum per accepted automatic change.
- Use the shared State Worker pass by default while preserving Main Model Sidecar as a complete tested backup and Manual-only as an option.
- Permit the Main Model Sidecar to replace the default if evaluation shows the State Worker is not sufficiently accurate, reliable, efficient, or economical.
- Do not silently run two sources for one evaluation window; any future automatic failover must share one job identity and at-most-one commit guard.
- Keep tracker instructions and schemas versioned separately from creative roleplay presets even when the main model supplies both outputs.

## 2026-09-02 — Provide Realistic and Creative manual relationship controls

- In Realistic mode, expose only `-10`, `-5`, `+5`, and `+10` influence actions.
- Apply a five-turn cooldown after a five-point influence and a ten-turn cooldown after a ten-point influence.
- Do not expose arbitrary jumps or locking in Realistic mode.
- In Creative mode, allow direct setting anywhere on the permitted scale without a turn cooldown and allow relationship locking.
- Make a Creative lock block every automatic source until explicitly unlocked.
- Record manual changes in the same attributable, reversible, branch-safe history as automatic changes.
- Never change an existing score or erase history merely because the user switches control modes.

## 2026-09-02 — Protect relationship direction for five turns

- After an accepted non-Creative relationship change, reject ordinary proposals in the opposite direction for five canonical roleplay turns.
- Record a rejected reversal as suppressed rather than queueing it to apply after the story has moved on.
- Allow only a clearly evidenced pivotal event to bypass the reversal guard; retain the `±10` maximum and normal validation.
- Let Creative direct setting bypass the reversal guard intentionally and optionally lock the resulting value.

## 2026-09-02 — Classify discovered speakers directly as NPCs

- Do not expose or store a provisional-character category.
- Seed Card Characters from every individual character represented by the active card, including multi-character cards.
- Create an NPC immediately when an unknown speaker is attributed or the State Worker identifies a named narrative participant.
- Count NPC speaking participation once per canonical roleplay turn regardless of how many lines that NPC speaks within the turn.
- Replay the counter from stable message evidence after swipes, regeneration, edits, deletion, rewind, or branching.
- Promote sustained NPCs into Recurring Characters after a configurable threshold or explicit user action; default to 25 attributed speaking turns.
- Do not let promotion silently create a portable Character Card, reusable Lorebook entry, or cross-chat knowledge.

## 2026-09-02 — Support only Name-label and Novel Dialogue formats

- Support `Name:` speaker labels with deterministic native parsing.
- Support ordinary Novel Dialogue with quoted prose and dialogue tags.
- Do not add additional first-release dialogue-format contracts.
- Default Novel Dialogue colorization to State Worker quote-span attribution stored separately from raw prose, with Main Model Sidecar as its backup source.
- Preserve explicit HTML Compatibility if testing or personal use finds native attribution inadequate.
- Treat compatibility HTML as a constrained transport rather than trusted document content: accept only the narrow colorization contract, strip unrelated tags and attributes, reject scriptable content, and convert to clean prose plus safe annotations wherever possible.
- Never switch into HTML Compatibility automatically or without making the active mode visible to the user.

## 2026-09-02 — Make dialogue colors opt-in and identity-owned

- Default Colorized Dialogues off so names, narration, and dialogue use the theme's normal foreground color.
- Store configured dialogue colors on stable Character Bank identities.
- Let Preferences define fallback colors for body/narration, unattributed dialogue, and speaker names.
- Add Color Speaker Name: when on, a `Name:` label shares its character's dialogue color; when off, the name remains at body-text color.
- Apply Bank color changes at render time so recognized past and future dialogue updates together.
- Keep Novel Dialogue free of visible name labels and color only its attributed quoted text.

## 2026-09-02 — Treat 60 million weekly NanoGPT tokens as a measured operating budget

- Design and benchmark the complete enabled system for several hours of use per day across a full week without exceeding the current 60-million-token NanoGPT allowance.
- Keep the allowance configurable so the product is not hard-coded to one plan or provider.
- Attribute usage separately to roleplay, Short Memory, Long Memory, State Worker, research, retries, and manual tools.
- Batch tracker and relationship extraction into one State Worker pass and process only new messages plus compact relevant state.
- Use no model calls for native visual rendering, dialogue colors, clocks, or provider-backed weather retrieval.
- Begin validation with visible warnings at 80%, configurable conservation at 90%, and a 10% reserve; retain these as recommended values until representative long-chat measurements confirm them.

## 2026-09-02 — Represent every source heading as its own vault file

- Treat a source document's first heading as the title of its generated document-index note under `Sources/`.
- Create one generated note under `Entries/` for every remaining heading.
- Store only the direct text belonging to that heading in its entry; represent subordinate content through child-note links.
- Preserve document order, parent/child hierarchy, source line provenance, previous/next navigation, and area tags.
- Keep the original Markdown documents authoritative and regenerate the vault structure rather than editing generated notes.

## 2026-09-03 — Use a nine-phase approximate story clock

- Replace exact story time with nine default semantic phases: Dawn, Morning, Late Morning, Noon, Afternoon, Evening, Night, Midnight, and Deep Night.
- Use `05:00–07:00`, `07:00–10:00`, `10:00–12:00`, `12:00–14:00`, `14:00–17:00`, `17:00–20:00`, `20:00–00:00`, `00:00–02:00`, and `02:00–05:00` as phase definitions and visual sectors only, never as a hidden advancing timestamp.
- Let the visual clock show the active phase with an approximate hand position and a clear text label rather than minutes or seconds.
- Do not advance story time from real elapsed time, message count, or turn count. A scene may remain in one phase for as long as its fiction requires.
- Change the phase only from narrative evidence, an explicit time skip, a validated State Worker proposal, or a manual correction.
- Deliver the compact phase label to the roleplay model On change and re-anchor it when context compaction would otherwise remove the active time state.
- Keep date and calendar state separate; changing phase does not automatically advance the date.
- Treat phase descriptions and example activities as explanatory cues only, not scheduled events, assumptions about the setting, or prompt instructions.
- Allow advanced users to rename phases, edit boundaries and descriptions, or define a different cycle for fictional worlds while preserving complete non-overlapping coverage.

## 2026-09-03 — Make the visual clock a forward-only time-skip control

- Open a compact Time Skip HUD when the user clicks or taps the visual clock.
- Treat every selected phase as its next chronological occurrence and never offer backward movement from this HUD.
- Limit the first-release control to a target within the next complete phase cycle; use separate calendar controls for longer jumps.
- Preview whether the target is later today or on the next day before applying it.
- Detect the configured calendar boundary along the forward path. In the default cycle, moving across Night into Midnight advances the day once; moving from Deep Night into Dawn does not advance it again.
- Increment a known date through month and year rollover, or record a relative day advance when the exact date is unavailable rather than inventing it.
- Commit phase and date/day effects atomically as one attributable state event and send one compact On-change time-skip update to the roleplay model.
- Keep dial animation visual-only and suppress intermediate model updates for phases crossed during the animation.

## 2026-09-03 — Require populated standalone concept notes

- Keep each authoritative concept document's first heading as its major Vault index under `Sources/`.
- Give every standalone locked concept its own subordinate source heading and generated note under `Entries/`.
- Require useful direct text in every subordinate note, including organizational parents; child links alone are insufficient.
- Preserve immediate-parent metadata, breadcrumbs, child links, document order, and source provenance for every entry.
- Allow summary tables to repeat decisions for scanning, but never use a table row as the only durable home of a standalone concept.
- Make empty direct bodies, incorrect parent metadata, missing heading files, broken links, and non-index document roots synchronization errors.

## 2026-09-03 — Limit enabled weather presentation to Static and Animated

- Keep a separate Off switch, but expose exactly two GFX levels when weather presentation is enabled.
- Static shows a compact application-owned weather indicator beside the scene clock without changing the conversation background.
- Animated keeps the indicator and adds a weather-responsive sky across approximately the upper third of the conversation surface.
- Keep the animated sky fixed to the conversation viewport, separate from message content, and subordinate to prose readability.
- Let reduced motion, accessibility contrast, low-power, battery, performance, and mobile-thermal safeguards fall back to Static rather than introduce more user-facing levels.
- Leave the exact Animated art direction open for later concept work, using modern phone weather applications as an initial interaction and motion reference.

## 2026-09-03 — Select OpenWeather with a distribution-license gate

- Use OpenWeather as the selected provider for opt-in Real-world linked weather because it documents global coordinate-based coverage and a privacy-favorable API request policy.
- Keep the user-selected location and normalized cache local, sending only the coordinates and authentication required for the weather request directly to OpenWeather.
- Never send the real-world location, API key, or raw provider response to NanoGPT, the roleplay model, or State Worker.
- Store user-provided OpenWeather credentials in the desktop operating-system credential store or Android Keystore.
- Normalize provider data locally and update visuals without a model call; deliver only compact weather meaning according to the tracker policy.
- Require a pre-release legal and licensing decision because OpenWeather's Free, Startup, and Developer terms impose attribution and ShareAlike requirements, while business tiers differ.
- Resolve required branding placement, caching rights, plan selection, and desktop/APK redistribution compatibility before official deployment.

## 2026-09-03 — Require an explicit State Worker setup choice

- Offer Local first during onboarding; if declined, open API worker setup.
- If API is declined or cancelled, return to a final Local or Disable State Worker Functions choice.
- Never leave automatic tracking presented as configured without a valid inference source.
- Disabling worker functions preserves chat, manual state editing, manual scene boundaries, manual time controls, deterministic `Name:` parsing, real-world weather updates, and access to saved state.

## 2026-09-03 — Use managed llama.cpp with a browsable GGUF model

- Use an app-owned hidden `llama.cpp` runtime for the Local State Worker path and route its logs to the in-app Console.
- Prefer consented first-run delivery of a verified Q4-class GGUF, with an optional desktop offline package where licensing and distribution permit it; use resumable on-demand delivery on Android.
- Compare Qwen3.5-2B, Qwen3-1.7B, and SmolLM2-1.7B in the working interface before selecting the managed default.
- Put Browse beside Local Model so a user can select a compatible `.gguf`; validate metadata, architecture, context, loadability, and structured-output health before activation.
- Preserve the last working model on failure and provide Restore Managed Model.

## 2026-09-03 — Keep State Worker cadence factual and non-blocking

- Run one asynchronous incremental worker job after every committed model turn, including Continue, only after the active response/branch is settled.
- Debounce briefly, allow only one running job, coalesce pending work, and batch at most three turns under backpressure.
- Never delay roleplay generation for worker completion.
- Default to 8,192 input and 512 output tokens, expose both as Advanced settings, and treat output as a compact change ceiling rather than a target length.
- Use near-deterministic sampling and require evidence-backed factual changes; do not invent motives, events, people, objects, or missing values.
- Permit genuine provider streaming, but show already-complete responses immediately in full and exclude artificial Smooth Streaming.

## 2026-09-03 — Make usage protection provider-aware

- Preserve the agreed priority order: roleplay, Short Memory, due Long Memory, explicit tools, then automatic cloud fallback/research/enrichment.
- Default Warning to 80% and Protection to 90%, expose both as settings, and require Warning to remain below Protection.
- Activate the 60-million-token weekly fixture only when NanoGPT is selected and its existing usage endpoint detects an active subscription with a valid weekly allowance.
- For other providers, use authoritative allowance data when available, then provider-reported request usage, then a user-configured locally estimated ledger; never invent a provider plan limit.
- Track currency/credit budgets in their native unit and keep local inference outside cloud-token allowances.

## 2026-09-03 — Build worker reliability on top of SillyTavern foundations

- Reuse existing atomic writes, throttled backups, chat concurrency identifiers, abort signals, provider profiles, JSON-schema transport, `llama.cpp` compatibility, and NanoGPT subscription usage reporting.
- Add a dedicated coordinator for job identity, chat/branch/message/state revisions, authoritative schema and semantic validation, evidence checks, idempotent atomic commits, append-only events, checksums, snapshots, replay, and quarantine.
- Retry transient transport failures at most twice with bounded jittered backoff and `Retry-After`; do not retry permanent authentication, permission, quota, invalid-model, invalid-request, or unsupported-schema failures.
- Give malformed current output one deterministic repair attempt, then allow one Main Model Sidecar fallback only if configured, current, and permitted by Protection.
- Treat stale cancellations as normal coalescing rather than failures, and open the circuit breaker after three consecutive failed logical jobs.

## 2026-09-04 — Keep Persistent Scene Memory persistent through semantic lifecycle rules

- Do not decay Persistent Scene Memory by age, elapsed turns, retrieval frequency, or probability.
- Keep a current fact until new evidence or a manual action replaces, clears, invalidates, or semantically retires it.
- Reconcile cards at scene boundaries instead of erasing them; use unknown rather than retaining a contradicted value as current.
- Keep explicitly pinned messages across scene changes until the user unpins them or resolves a budget conflict.

## 2026-09-04 — Budget verbatim pinned messages without silent eviction

- Offer Message Count as the normal mode with a configurable default maximum of ten pinned messages per chat.
- Offer Advanced Token Budget mode with a configurable default of 2,000 tokens measured from the exact serialized prompt contribution, including wrappers.
- Recalculate token usage when the active model or tokenizer changes. Label fallback counts Estimated and reserve a ten-percent safety margin when an exact tokenizer is unavailable.
- Refuse a new over-budget pin and open Manage Pins; never silently evict, truncate, summarize, or omit a pinned message.
- Pause sending and offer a clear resolution when an existing pin set becomes over budget after a model or context change.

## 2026-09-04 — Expose bounded recursive-recall depth modes

- Define Light as direct activation only, Default as at most two hops, and Deep as at most three hops.
- Keep Custom behind Advanced Settings and bound it to zero through five hops plus explicit candidate, longform, Tiny Recall, and token ceilings.
- Make the configured token budget and duplicate/cycle suppression absolute stopping rules in every mode.
- Start Default at no more than sixteen inspected candidates, two injected longforms, six Tiny Recall cards, and the lesser of 8,192 tokens or fifteen percent of the active context.

## 2026-09-04 — Preserve Memory Books longform scale and define Tiny Recall separately

- Use Memory Books' configurable 4,000-output-token maximum as the initial Long Memory extraction ceiling, not as a length target.
- Retain a detailed beat-by-beat longform extraction prompt and keep structured metadata outside the prose summary.
- Generate Tiny Recall as two to four short factual sentences totaling roughly 20–80 words, with a hard 128-token ceiling.
- Give the Persona one sentence and each of up to three principal non-user characters one sentence, using explicit names and concrete subject–verb–description phrasing.

## 2026-09-04 — Combine Summaryception transport retries with Memory Books extraction discipline

- Freeze the source message range and use an idempotency key for every extraction attempt.
- Retry transient network, timeout, rate-limit, and retryable server failures at most twice with bounded exponential backoff, jitter, `Retry-After`, and cancellation of stale work.
- Do not retry authentication, permission, quota, invalid-model, invalid-request, schema-unsupported, or source-validation failures.
- Permit one deterministic structured-output repair for a complete but malformed result and cap one logical extraction at four automatic model calls total.
- After exhaustion, preserve the source and mark extraction Pending—Needs Retry; do not retry automatically on every subsequent chat turn.
- Commit exactly one active Memorybook entry atomically after schema, semantic, evidence-range, branch, and source-revision validation.

## 2026-09-04 — Keep scene-boundary detection conservative and measurable

- Default automatic detection to Suggest, leaving manual boundaries authoritative and immediately undoable.
- Evaluate each prompt/model version on at least 400 windows from at least 40 varied chats, including at least 100 true boundaries and 300 negative windows.
- Require at least 98% precision, 85% recall, 98% exact-gap placement, no more than one false automatic boundary per 200 negative windows, and zero stale or cross-branch commits before enabling Automatic.
- Return an updated prompt/model pair to Suggest until it requalifies; mark early Automatic support Experimental.
- Allow immediate placement for clear transitions, wait for more evidence after ambiguous transitions, and default to a three-turn minimum scene length unless decisive evidence overrides it.

## 2026-09-04 — Close Phase 1 through five remaining product decisions

- Treat the Memorybook, Scene State, visual tracker, and State Worker topic sequence as product-definition complete.
- Move remaining implementation mechanics to their appropriate architecture, UX, data, integration, Android, or validation phase unless they alter promised behavior.
- Close the remaining Phase 1 questions in dependency order: settings versioning, Character Card metadata portability, Lorebook compatibility, internet research, and exact desktop/Android v1 scope.
- Fold Character/Persona settings ownership into settings versioning, Memorybook promotion into Lorebook compatibility, and Character Library/deferred-extension choices into exact platform scope.
- Follow the fifth decision with a formal Phase 1 exit review; do not advance the dashboard without recorded gate evidence.

## 2026-09-04 — Version and protect developer-authored Factory Defaults

- Begin validated internal application builds at `0.0.1` and reserve `1.0.0` for the first public release.
- Give every promoted internal application version a dedicated local changelog describing additions, changes, removals, migrations, and intended behavior.
- Author changes first in a human-readable commented development candidate, then validate, test, and promote it deterministically before generating the production module.
- Keep application version, persisted-settings schema version, and Factory Defaults revision/content hash independent so migrations reflect data-shape changes rather than every software edit.
- Make the compiled Factory Defaults layer read-only to normal runtime APIs, but do not claim packaged Electron resources are secret or impossible to alter.
- Protect critical flags, toggles, limits, thresholds, and paths through schemas, semantic invariants, safe path resolution, tests, atomic writable-state handling, and explicit documentation.
- Preserve the user's existing **Default Settings** term for the pinned known-good Generation Settings file and use **Factory Defaults** for the developer-authored baseline.

## 2026-09-04 — Confirm settings ownership and retain Save/Export behavior

- Confirm **Factory Defaults** for the compiled developer baseline and **Default Settings** for the user's pinned Generation Settings file.
- Accept the field-aware ownership table across Factory Defaults, Application Preferences, Default Settings, Generation Settings, Preset Configurations, Character Defaults, Persona Defaults, and Chat State.
- Use Save to atomically replace the currently selected writable user settings rather than creating an immutable user revision.
- Use Export, not Save As, to create a separate portable file; exporting does not silently change the active settings.
- If the current file is pinned as Default Settings, Save updates it visibly after creating an automatic recoverable pre-save snapshot.
- Keep recovery snapshots, atomic writes, and backups as implementation safeguards rather than exposing a separate user-facing version-history system.
- Mark the Phase 1 settings versioning and ownership question complete.

## 2026-09-04 — Preserve broad Character Card compatibility

- Keep SillyTavern's broad Character Card handling as the compatibility foundation rather than inventing a narrow proprietary card format.
- Treat card content as untrusted data and never as application or development instructions.
- Use explicit V3/V2 specification discriminators before falling back to legacy V1 root-field detection.
- Accept ecosystem-imperfect but usable V1, V2, and V3 cards; supply normalized runtime defaults without rewriting the untouched source envelope.
- Preserve unknown root, `data`, `extensions`, Character Book, and entry-extension fields through import, edit, save, and export whenever safely representable.
- Keep JSON and PNG as primary formats while retaining current compatibility formats, including CharX where embedded V3 assets require it.
- Make export target-aware and strict: canonical V3 in PNG `ccv3`, a true V2 projection in `chara`, visible downgrade/repair reporting, and no silent loss.
- Exclude chats, Memorybooks, tracker state, relationships, credentials, system paths, usage data, and local favorite state from standard shared cards.
- Leave app-local-by-default placement of new rework-specific preferences pending final confirmation.

## 2026-09-05 — Rework-only audit follow-up

- Restrict all work to `ST-UI/sillytavern-ui-rework/` and `Project Vault/`. Never inspect, audit, test, or fix the original application or extension clones. Historical audits do not authorize revisiting them.
- Preserve the user's folder split and outer Git metadata. Repository-boundary, updater, and CI changes are excluded from this repair.
- Keep the final diagonal desktop/Android showcases as active art direction; later functional contracts supersede outdated pictured controls.
- Preserve stable Vault note IDs and graph tags while migrating source provenance. Validate complete candidate output before replacing generated notes; retain recovery copies and refuse failed validation without touching live output.
- Apply documented safety corrections: generation-segment identity, cutoff-state extraction, request-aware re-anchoring, bounded worker progress/attempts, immutable provider request inputs, Unknown-aware quota accounting, realistic cast seeding, and explicit export privacy precedence. These are rework contracts, not implemented runtime claims.
- Distinguish separate main-model extraction requests from provider-gated same-response sidecars. Disabled tracking leaves independent Short/Long Memory jobs available. Rendering is local; inference-assisted attribution still has a cost.
- Do not accept product proposals implicitly: simpler onboarding, Short Memory compression/pressure defaults, changed linked-content policy, card metadata, Lorebook behavior, research, delivery defaults, and exact platform scope remain tracked decisions as applicable.
- Finish the audit follow-up and its verified changelog before resuming Phase 1 closure. No application release/version or Phase 1 exit is created by this maintenance work.

## 2026-09-05 — Authorized local folder-layout checkpoint

- The user approved recording the existing restructure in a local Git commit to clear the Changes panel, with no push and no change to original-app or extension contents.
- Keep the outer repository, prior history, exact folder spelling/placement, and all local files. Track the relocated historical application files and the project documents/artwork/Vault; exclude local-only data and extension checkouts.
- This narrowly supersedes the no-staging restriction for the checkpoint only; it does not authorize source audits, updater/CI changes, further repository restructuring, or a Phase 1 exit.
