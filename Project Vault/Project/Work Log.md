---
tags:
  - project/work-log
---

# Work Log

## 2026-09-05

- Audited the reorganized project's definitions and selected implementation foundations following the user's move to GPT-6 Astra.
- Verified the `SIllyTavern Original/`, `Project Vault/`, and `ST-UI/` structure, including `ST-UI/Concept Arts/` and the five extension references.
- Added [GPT-6 Astra audit and changelog](../../CHANGELOG-ASTRA-AUDIT-2026-09-05.md), containing 19 evidenced findings, quick fixes, a pending modification ledger, and main-chat resume instructions.
- Added an audit handoff notice to Current Context. Product decisions and implementation remain unchanged; recommendations are explicitly proposed.
- Identified obsolete source roots and deletion before validation in the Vault synchronizer; did not run it. Identified the remaining outer Git layout and updater mismatch without staging or moving repository metadata.

## 2026-09-01

- Established the Obsidian vault as the project knowledge base.
- Added persistent project guidance in the repository root.
- Mirrored the project document set into the vault.
- Generated per-document title and subtitle indexes.
- Narrowed the mirrored document set to the eight collaborative Markdown files in the UI-rework and unified-suite concept folders.
- Removed generated SillyTavern, imported Memory Books, and Summaryception documentation from the vault.
- Added area tags and colored Graph View groups for navigation, UI rework, unified suite, project state, and vault system notes.
- Expanded the Memorybook functional specification with direct Long Memory creation, complete extracted-entry contents, immediate activation, and automatic bounded tag/link hopping.
- Updated the Development Bible, Product Definition, and Living Delivery Plan to reflect the zero-maintenance Long Memory lifecycle.
- Updated the Vault's current focus and durable decision record for the active Memorybook definition work.
- Audited the local Horae 1.15.1 and Multihog DnD Framework 2026.8.81 snapshots for tracker domains, State Worker behavior, persistence, branching, recovery, tests, licensing, and DnD coupling.
- Added the Scene State and Tracker Foundation Audit and linked it from the Development Bible, Product Definition, Living Delivery Plan, and Memorybook Functional Specification.
- Selected a typed native Scene State engine: a compact Horae-informed live vocabulary, Multihog-inspired worker reliability, and separate Scene Details extraction for Long Memory.
- Deferred DnD Playing Mode until after the first final release.
- Confined live Scene State to ongoing tracking and Persistent Scene Memory.
- Established the five-field Scene Details base: one-sentence summary, time of day, date, scene participants, and simple or hierarchical location; character facets remain optional.
- Classified Scene Summary as display-only user metadata and kept it completely separate from Tiny Recall and model-facing retrieval.
- Audited the local MeguminSuite snapshot, including its NPC Bank discovery, configurable fields, persistence, updates, undo, injection strategy, speaker parsing, dialogue-color approach, tests, and conflicting noncommercial license signals.
- Selected MeguminSuite only as a narrow design reference; rejected model-emitted tracker blocks, name-only identity, numerical message positions, speculative full dossiers, and model-generated color markup.
- Added the Scene State and Visual Tracker Functional Specification.
- Defined tracker lifetimes and separate Visual-only, On change, When relevant, and Always current model-delivery policies.
- Defined the native scene clock, configurable environment/weather layer, collapsible Cast panel, chat-relative Character Bank, and renderer-owned Dialogue Colorizer.
- Updated the Development Bible, Product Definition, Living Delivery Plan, Memorybook specification, tracker audit, and Vault project state to reflect the visual tracker direction.

## 2026-09-02

- Selected a combined relationship presentation: a neutral-centered `-100` to `+100` visual meter plus a descriptive label for each tracked character's disposition toward the active Persona.
- Made relationship changes evidence-driven, attributable, reversible, configurable, and quiet during routine conversation.
- Kept relationship meters Visual-only by default and limited model delivery to compact qualitative labels when relevant.
- Deferred Character-to-Character tracking behind a future sparse directed-graph design that reuses the existing State Worker pass.
- Added a configurable 60-million-token weekly NanoGPT operating target, component-level usage accounting, conservation behavior, and a required representative long-chat benchmark.
- Locked the initial Hostile-through-Devoted relationship labels and score bands as configurable defaults for the current design pass.
- Defined the Cast panel's nested disclosure: a collapsible panel and list, manual Add Character, reduced character rows, and expanded grouped continuity information.
- Confirmed age, general role, current activity, mood, clothes, and salient inventory as expanded character fields.
- Limited inventory to relevant objects and explicit item-state changes; recommended presence and visible condition as the remaining first-release continuity additions.
- Confirmed presence and visible condition as first-release Cast fields and added pronouns, species/type, dialogue color, aliases, and optional portrait/avatar support.
- Replaced the abstract Cast manual note with a stable primary Lorebook Entry shortcut for direct user editing.
- Specified that Lorebook linking and navigation have no activation, priority, or injection side effects and that broken targets remain visibly repairable.
- Set Location's default delivery to On change and defined memory/context-boundary re-anchoring so it is not repeated every message.
- Replaced Universe Fandom and Timeline with a Story Continuity Profile containing primary Fandom, conditional Crossover Fandom, Era, and AU.
- Defined AU conflict precedence so established roleplay and chat memory override contradictory canon chronology without disabling all fandom lore.
- Defined model-proposed, application-validated relationship events with stable identity, evidence, range, cadence, lock, history, undo, and branch-safety enforcement.
- Added selectable State Worker, main-model structured-sidecar, and Manual-only automation paths; recommended the shared State Worker pending evaluation.
- Added Realistic manual relationship influence with configurable turn cooldown and Creative direct-setting/locking controls.
- Recorded five-point score quantization and a `±10` automatic ceiling as recommendations awaiting confirmation.
- Confirmed five-point quantization in both modes and an absolute `±10` automatic influence ceiling.
- Confirmed State Worker as the default relationship source and Main Model Sidecar as the preserved backup if testing finds the worker inadequate.
- Set Realistic cooldowns to five turns after `±5` influence and ten turns after `±10` influence.
- Added five-turn reversal protection for non-Creative changes with a pivotal-evidence exception.
- Removed the provisional-character state and defined Card Character, NPC, and Recurring Character classifications.
- Added branch-safe NPC speaking-turn counting and proposed a configurable 25-turn promotion default without automatic Character Card or Lorebook creation.
- Limited dialogue formats to deterministic `Name:` labels and Novel Dialogue.
- Defined colorization-off theme defaults, Character Bank dialogue colors, fallback text-type colors, and optional same-color speaker names.
- Proposed novel-dialogue quote-span attribution through the existing State Worker/Main Model backup rather than storing model-generated HTML.
- Confirmed a configurable 25 attributed-speaking-turn default for NPC-to-Recurring-Character promotion.
- Confirmed State Worker span attribution as the Novel Dialogue default and retained explicit sanitized HTML Compatibility for failed testing or personal preference.
- Replaced full-document mirrors and separate outline notes with document-index files and one dedicated note for every subordinate Markdown heading.
- Added hierarchical filenames, breadcrumbs, parent/child links, previous/next navigation, section-local content, source-line provenance, and persistent area tags to generated heading notes.

## 2026-09-03

- Replaced exact story time with a configurable nine-phase cycle spanning Dawn through Deep Night.
- Defined the phase ranges as semantic boundaries and visual sectors only, with no hidden minute clock and no automatic advancement from real time, messages, or turns.
- Set the active time phase to On-change model delivery with context-boundary re-anchoring.
- Kept date/calendar tracking separate from phase changes.
- Classified the example activities associated with each phase as explanatory cues rather than scheduled events, setting assumptions, or automatic triggers.
- Made the visual clock clickable and specified a forward-only Time Skip HUD where targets mean their next chronological occurrence.
- Defined explicit day-boundary detection, known-date rollover, relative-day handling for incomplete dates, and atomic phase/date commits.
- Added a dedicated source heading so the HUD specification synchronizes into its own generated Vault entry rather than remaining hidden inside a larger note.
- Audited all generated Vault files and found no zero-byte files but 24 organizational headings without direct source body text.
- Added meaningful overviews to all 24 affected source headings so their generated notes contain information as well as child links.
- Added dedicated Location delivery and Time-phase delivery concept headings instead of leaving those locked rules inside the broader delivery-policy note.
- Strengthened synchronization to validate populated bodies, document-root index status, heading-entry type, and immediate-parent metadata.
- Added the permanent Vault concept-note contract to the Development Bible and project guidance.
- Recorded the completed file-level and hierarchy audit in a dedicated Vault Structural Audit note linked from Project Home.
- Limited enabled weather presentation to two GFX levels: a Static clock-adjacent indicator and an Animated upper-third sky.
- Defined accessibility, battery, performance, and mobile-thermal fallback from Animated to Static without adding more visible levels.
- Verified OpenWeather's documented global coordinate coverage, API request privacy claims, current-weather interface, attribution rules, and plan-dependent licensing.
- Selected OpenWeather for opt-in Real-world linked weather while adding a required distribution-license and attribution gate before desktop or APK release.
- Split weather presentation, provider, privacy, normalization, and licensing into populated standalone concept notes with explicit parenting.
- Researched current permissively licensed 2B-class State Worker candidates, llama.cpp packaging, and Android large-asset delivery limits.
- Added a clearly Proposed tracker-technical-limits section covering the local worker, cadence, conservation, the 60-million-token reference week, and recovery/validation for joint review.
- Agreed the State Worker technical baseline and moved it from proposal into the tracker decision record.
- Added Local → API → Local-or-Disable onboarding and documented which model-managed features become unavailable when the worker is disabled.
- Selected an app-owned hidden `llama.cpp` runtime, first-run verified model delivery, custom-GGUF Browse, and Restore Managed Model behavior.
- Established the in-interface comparison of Qwen3.5-2B, Qwen3-1.7B, and SmolLM2-1.7B and added a reusable multi-character roleplay evaluation fixture.
- Locked asynchronous per-committed-turn cadence, coalescing, configurable worker limits, near-deterministic factual output, and the exclusion of artificial Smooth Streaming.
- Replaced the universal 60-million-token assumption with provider-capability accounting; retained 60 million only for a detected active NanoGPT subscription and made 80% Warning/90% Protection configurable defaults.
- Audited SillyTavern's atomic persistence, backups, integrity guard, cancellation, provider profiles, structured-output support, NanoGPT usage reporting, retry behavior, and streaming presentation.
- Added the State Worker Reliability Foundation Audit and defined the reuse boundary for the new branch-safe transaction, validation, retry, event-replay, and circuit-breaker layer.
- Updated the Development Bible, Product Definition, Memorybook specification, Scene State tracker specification, Living Delivery Plan, tasks, decisions, and current context to remove the earlier API-only worker assumption.

## 2026-09-04

- Removed time-based decay from Persistent Scene Memory and replaced it with evidence-driven semantic replacement, invalidation, retirement, and boundary reconciliation.
- Defined configurable pinned-message Count and Advanced Token Budget modes, including exact serialized-prompt accounting where possible, safe estimation fallback, and no silent eviction.
- Added Light, Default, Deep, and Advanced-only Custom recursive-recall modes with hard candidate, payload, cycle, duplicate, and token ceilings.
- Kept Memory Books' configurable 4,000-token Long Memory output ceiling and specified the separate compact Tiny Recall form.
- Audited retry behavior in Summaryception, Memory Books, and SillyTavern and adopted a hybrid classified-retry, repair, snapshot, validation, and idempotent-commit contract.
- Defined a conservative scene-boundary evaluation corpus and qualification gates while keeping Suggest as the default mode.
- Updated the Development Bible, Product Definition, Living Delivery Plan, Memorybook audit/specification, Vault current context, tasks, decisions, and work log.
- Closed the product-level Memorybook, Scene State, visual tracker, and State Worker topic sequence and moved remaining implementation mechanics to later accountable phases.
- Reconciled the remaining product backlog into five Phase 1 closure questions followed by a formal exit review.
- Added explicit Phase 1 closure-sequence, later-validation, and exit-review notes to the authoritative source documents.
- Added a dedicated Settings, Defaults, and Versioning Specification.
- Defined separate application, persisted-schema, and Factory Defaults revision identities, including the `0.0.1` development start and `1.0.0` first-public-release reservation.
- Defined the commented development candidate, deterministic validation/promotion pipeline, per-version local changelog, compiled Factory Defaults module, and layered protection contract.
- Proposed a field-aware settings ownership table and immutable user settings revisions for confirmation.
- Confirmed Factory Defaults terminology, independent application/schema/default revisions, and field-aware ownership.
- Replaced the proposed immutable Save/Save As model with SillyTavern-style Save/Export behavior, retaining atomic writes and recoverable pre-save snapshots.
- Marked the Phase 1 settings versioning and ownership question complete and advanced the active queue to Character Card metadata portability.
- Audited the supplied 7,570-byte SillyTavern V3-shaped Character Card by structure and fingerprint without treating its contents as instructions.
- Audited the fork's Character Card validator, V1/V2 conversion, raw-field preservation, PNG `chara`/`ccv3` handling, JSON export, embedded Character Book handling, and CharX asset path.
- Identified V1-first misclassification and permissive V3/Lorebook acceptance in the current implementation as compatibility lessons.
- Added a dedicated Character Card Compatibility and Portability Specification with tolerant-import, lossless-preservation, strict-export, security, and proposed metadata-placement rules.

## 2026-09-05 — Astra audit follow-up

- Read the audit handoff and recorded the relocated source folders. Preserved the audit itself and all user-moved folders.
- After the user's scope clarification, reversed only this task's original-app edits and removed its temporary outer-root guidance/ignore/layout files and extension-reference manifest. Stopped inspecting original-application and extension contents.
- Added scoped rework/Vault guidance; repaired source discovery, staged validation, recoverable publication, crash recovery, stable note IDs, source links, and graph-tag preservation.
- Added a dependency-free maintenance regression suite for missing sources, empty content, broken links/anchors, rollback, locking, path safety, crash recovery, operational-note exclusion, and generated artwork links.
- Reconciled ten rework source documents and added implementation-safety contracts and a current workflow-to-surface map, each with populated concept headings.
- Replaced the oversized Current Context with concise current state, updated Tasks/Decisions, and created a finding-by-finding disposition for A01–A19.
- Preserved genuinely open product decisions and explicitly assigned runtime/schema/model/provider/platform proof to later phases. No original-app/extension fix, runtime implementation, benchmark, release version, or Phase 1 completion is claimed.
- Prepared a separate Added/Modified/Removed changelog and regenerated the Vault only after successful candidate validation. Final counts and validation evidence are in the Sync Report and repair changelog.
- Final verification passed: 12 regression tests; 16 source indexes; 396 populated entries; 412 represented headings; zero validation errors. All 386 old note identities remain, with 3 new indexes and 23 new entries. The prior generation is retained in `.sync-recovery/1788565784216-7ac23217-8730-4e53-9409-fe1751309a0d/`. Marked the in-scope audit follow-up complete without resuming Phase 1 closure.

## 2026-09-05 — Local Git layout checkpoint

- Received explicit approval to record the existing folder restructure locally and clear the staged deletion count without pushing.
- Confirmed by path existence only that all 988 historical tracked files are present under `SIllyTavern Original/`; no original-app or extension review was performed.
- Added scoped root ignores for local-only/reference material, retained checkpoint recovery metadata, and documented the one-time Git authorization without weakening the ongoing source-edit boundary.
- Recorded the current rework, artwork, audit handoff, Vault, and relocated historical application paths as the new local baseline, retaining parent history and the user's folder structure.
