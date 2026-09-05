# Memorybook Foundation Audit

**Status:** Complete foundation audit; detailed Memorybook design not yet started  
**Audit date:** 2026-08-31  
**Sources:** [Summaryception clone](../Extension-Summaryception/) · [Memory Books clone](../Extension-MemoryBooks/)  
**Related:** [Product Definition](./PRODUCT-DEFINITION.md) · [Development Bible](./README.md) · [Living Delivery Plan](./REWORK-PLAN.md)

## 1. Executive conclusion

The proposed Memorybook should use the two extensions as complementary foundations, but it should not embed either extension wholesale.

- **Summaryception provides the stronger short/mid-term mechanism:** keep recent messages verbatim, summarize older batches into context-aware narrative deltas, inject a compact continuity block, and progressively compress as the conversation grows.
- **Memory Books provides the stronger durable-memory mechanism:** append structured scene memories, retain their source lineage, review/edit them, consolidate without deleting source records, and protect them through branching, rollback, regeneration, queues, and write checks.
- **The merged product needs a new first-class Memorybook domain model:** chat-owned, separate from Character/Persona Lorebooks, with replaceable derived summaries and durable editable memories in one coherent interface.

The central rule is:

> Short-term memory is derived, compact, and replaceable. Long-term memory is durable, attributable, and never silently rewritten.

## 2. Audit scope and evidence

The audit covered:

- manifests, licenses, repository state, and build setup;
- extension/global settings and per-chat persistence;
- message-range selection and summary triggers;
- provider request paths and prompt construction;
- parsing, retry, cancellation, and error handling;
- message hiding and prompt injection;
- lorebook entry creation and metadata;
- recursive summarization and consolidation tiers;
- editing, regeneration, compaction, deletion, and rollback;
- chat switching, swipes, deletion, and native branches;
- queues, concurrency guards, and stale-write prevention;
- trackers/side prompts and group-chat handling;
- automated tests and architectural maintainability.

### Source snapshots

| Extension | Version/commit | Shape |
| --- | --- | --- |
| Summaryception | Manifest 5.5.3; commit `96db242acecb109a4b271e071a84cbf35cffe2df` | 7 files; 2 source JavaScript files; approximately 2,889 source lines; no tests |
| Memory Books | Manifest 9.0.0; commit `b5a5b8aeff65c385972f74b8e39549a41497f7a0` | 206 files; 51 source JavaScript files; approximately 39,648 source lines; 16 test files |

Both extensions and the parent SillyTavern project are licensed under AGPL-3.0. Direct code reuse is compatible with the fork’s license, but retained code must preserve applicable copyright notices and attribution.

## 3. Side-by-side functional model

| Concern | Summaryception | Memory Books |
| --- | --- | --- |
| Primary purpose | Keep a very long chat inside a compact active context | Create durable, selectively recalled memories from chat ranges |
| Ownership | Per-chat metadata | One or more SillyTavern lorebooks bound to a chat/character/group |
| Unit | Short text snippet | Structured lorebook entry with title, content, keywords, and metadata |
| Trigger | Assistant-turn count beyond the verbatim window | Message interval/buffer, manual scene selection, or command |
| Short-term behavior | Recursive layers; lower snippets are removed after promotion | Base memories remain unless manually changed or disabled |
| Long-term behavior | Repeated re-summarization into deeper layers | Optional tiered consolidation creates new entries linked to sources |
| Source preservation | Raw chat remains, but promoted snippet lineage becomes incomplete | Source ranges/chat IDs and source-entry UIDs are recorded |
| Injection | Entire assembled summary block at a fixed extension-prompt location | Normal lorebook activation/positioning, keywords, constants, vectors, or outlets |
| User review | Snippet browser; edit/delete; Layer 0 regeneration | Optional preview, manual edit, regeneration, compaction review, rollback |
| Branching | Repairs Layer 0 ranges after detecting a shorter branch | Copies and rebinds Memory Books for native branches |
| Failure handling | Retry/backoff; failed batch remains unsummarized | Structured errors, job states, cancellation, fingerprints, write lanes, review-needed state |
| UI character | Compact extension panel but still settings-heavy | Feature-rich and extremely broad; many popups, profiles, and advanced modes |

## 4. Summaryception audit

Summaryception is assessed as the foundation for temporary Short Memory: periodic compression, configurable triggers, prompt behavior, and verbatim preservation. Its strengths and failure modes are kept separate so the rework can preserve the former without inheriting the latter.

### 4.1 Storage model

Global extension settings are stored under `extensionSettings.summaryception`. Per-chat state is stored in `chatMetadata.summaryception`:

```text
layers[]
summarizedUpTo
ghostedIndices[]
```

Each Layer 0 snippet contains summary text, a message-index range, and a timestamp. Promoted snippets contain summary text and partial promotion metadata, but not complete stable source lineage.

### 4.2 Processing pipeline

1. Listen for a received assistant message.
2. Count assistant turns not already marked as Summaryception-ghosted.
3. Preserve a configured number of recent assistant turns verbatim.
4. Select the oldest overflow batch, using assistant turns as batch boundaries.
5. Include both user and assistant messages inside the resulting message-index range.
6. Build prior context from all existing summary layers.
7. Ask the summarizer to emit only the narrative delta not already represented.
8. Retry eligible network/provider failures with exponential backoff and jitter.
9. Append the result to Layer 0.
10. Mark the covered messages as ghosted and optionally execute SillyTavern `/hide` commands.
11. Promote old snippets recursively when a layer exceeds its configured count.
12. Inject every retained snippet, deepest layer first, through `setExtensionPrompt`.

### 4.3 Promotion behavior

The first snippet entering an empty deeper layer is moved directly as a seed without an AI call. Later promotions remove a group of older source snippets, summarize them into one deeper snippet, and keep only the new result in the active layer store.

This is intentionally lossy at the derived-memory level. The raw chat remains available, but each promotion can discard nuance, and the active summary store no longer retains the replaced source snippets.

### 4.4 Strong foundation elements

- Clear recent-verbatim versus summarized-history boundary.
- Context-aware delta prompt that discourages repeated facts.
- Small configurable batches.
- Recursive compression suitable for extremely long conversations.
- Provider retry/backoff and cancellation.
- Backlog detection and cancellable catch-up.
- Injection preview, layer statistics, snippet browsing, editing, export/import, and repair.
- Raw chat messages are not deleted.
- Failed generations do not advance the summary boundary or hide the batch.
- User-hidden messages are distinguished from extension-hidden messages.

### 4.5 Risks and defects we must not inherit

The following risks define explicit design constraints for the new Short Memory implementation. Each child note isolates one failure mode so it can be tracked through architecture and testing.

#### Information loss is inherent

The README describes the system as losing nothing, but the implementation repeatedly summarizes summaries and removes the inputs from the active derived store. Important nuance can be lost even when the raw transcript remains on disk. Our product must describe this honestly and give users recovery/provenance tools.

#### Deepest-layer growth is not hard-bounded

When promotion reaches `maxLayers - 1`, the function returns. The deepest layer can therefore continue growing beyond `snippetsPerLayer`, so active injected context is not indefinitely bounded.

#### Promoted lineage is insufficient

Layer 0 records message-index ranges. Deeper promoted snippets do not retain the full set of source message IDs or source snippet IDs. This weakens auditing, branch repair, targeted regeneration, and invalidation after edits.

#### Branch repair can preserve stale deep memory

Branch repair filters Layer 0 snippets whose ranges exceed the new branch, but explicitly retains promoted snippets without ranges. A deep summary can therefore contain events that never occurred in the branch.

#### Editing lower layers does not invalidate dependents

Editing or deleting a lower-layer snippet does not rebuild or mark deeper summaries derived from it as stale. The injected memory can contain contradictory versions of the same history.

#### Chat-switch race exposure

Summarization uses extension-global in-flight state and does not commit against a stable chat identity/fingerprint. Switching chats during an asynchronous request risks saving metadata through whichever chat context is active when persistence occurs.

#### Message indices are fragile identifiers

Ranges are based on array indices. Deletion, insertion, swipe changes, branch creation, or migration can change what those indices mean. Stable message IDs and content fingerprints are required for the rework.

#### Prompt-toggle mutation is too invasive

In default connection mode, the extension snapshots and disables the active prompt-manager toggles, makes the summary request, and restores them afterward. A first-class product should construct an isolated summarization request rather than mutating live chat configuration.

#### Injection policy is rigid

The summary is injected at a hard-coded extension-prompt position/depth/role. There is no explicit token budget, relevance selection, or model-aware adaptation.

#### Credential storage is unsuitable

The direct OpenAI-compatible API key lives in extension settings. Our application must use the shared secure NanoGPT credential service and never store memory-provider secrets in ordinary renderer settings.

#### No automated tests

The clone contains no test harness or regression suite. Algorithms adopted from it need new tests before production use.

## 5. Memory Books audit

Memory Books is assessed as the foundation for durable Long Memory entries, retrieval metadata, and scene-scale consolidation. The audit deliberately separates those useful mechanisms from its broader extension surface and storage assumptions.

### 5.1 Storage model

Memory Books treats a SillyTavern lorebook as the durable database. A base memory entry is marked with `stmemorybooks: true` and stores:

- generated content;
- title/comment;
- activation keywords;
- source chat ID;
- source message start/end indices;
- lorebook activation/position/order settings;
- optional character/group ownership metadata;
- optional links used by consolidation, regeneration, and trackers.

Higher-tier summaries add:

- `stmbSummary: true`;
- a summary tier;
- a type such as Arc, Chapter, Book, Legend, Series, or Epic;
- explicit source-entry UIDs.

### 5.2 Base-memory pipeline

1. Select a scene manually or trigger after a configured message interval and safety buffer.
2. Validate or create the target Memory Book.
3. Compile the source chat range and relevant character/group metadata.
4. Optionally include preceding memories and explicitly selected additional lore context.
5. Generate structured JSON containing `title`, `content`, and `keywords`.
6. Prefer provider structured output and fall back to plain-text JSON when unsupported.
7. Repair tolerant JSON locally where possible and classify malformed/truncated output.
8. Optionally show a preview for approval/editing.
9. Create a new flagged lorebook entry and save source metadata.
10. Optionally hide the processed chat range.
11. Advance the per-chat processed boundary only after a successful write.
12. Optionally enqueue trackers and later consolidation.

### 5.3 Durable consolidation model

Memory Books supports tiers from base Memory through Arc, Chapter, Book, Legend, Series, and Epic. Consolidation:

- groups selected lower-tier entries;
- creates a new higher-tier entry;
- records source-entry UIDs;
- can leave originals active or disable them;
- does not delete the source entries;
- records which higher-tier entry disabled each source;
- supports preview, regeneration, and rollback relationships.

This is materially safer than destructive recursive replacement.

### 5.4 Lifecycle safeguards

- Structured-output schema with provider fallback.
- Token estimation and warning threshold.
- Optional preview and manual correction.
- Job queue states for queued, running, approval, saving, blocked, failed, canceled, and completed work.
- Cancellation and retry policies.
- Serialized lorebook write lanes.
- Fingerprints checked before regeneration/replacement commits.
- Exact source links for consolidated summaries.
- Message-deletion rollback planning, including nested consolidations.
- Side-prompt restoration after rollback.
- Native-branch detection that clones and rebinds Memory Books.
- Group and narrator ownership policies.
- Regeneration that preserves entry identity and requires source availability.
- Compaction that produces a reviewable draft and never replaces the original without approval.

### 5.5 Tracker foundation

Side Prompts are effectively durable, focused trackers. They can track relationships, quests, inventory, mood, world state, or other narrow concerns. They support:

- templates and named sets;
- automatic and manual triggers;
- overwrite-in-place tracker entries;
- prior tracker context;
- per-chat destinations and profile overrides;
- exact regeneration snapshots;
- rollback restoration.

This is relevant to the later Horae/Multihog tracker decision, but tracker UI and rules should remain a separate layer from narrative Memorybook summaries.

### 5.6 Strong foundation elements

- Append-first durable memory rather than silent replacement.
- Structured memory result with title/content/keywords.
- Reviewable, editable records.
- Source chat/range metadata.
- Previous-memory context without asking the model to reprocess it.
- Explicit higher-tier source links.
- Non-destructive consolidation.
- Regeneration, rollback, branch copying, and stale-write protection.
- Queue and concurrency concepts suitable for background work.
- Provider-independent memory profiles, including NanoGPT mapping.
- Strong pure-policy test coverage for branching, locks, retries, rollback, regeneration, groups, narrator mode, routing, trackers, and tier relationships.

### 5.7 Risks and costs we must not inherit

The following costs identify where the native Memorybook must diverge from Memory Books. Each child note records one architectural, operational, compatibility, or maintenance concern.

#### Lorebook-as-database conflates two concepts

The extension stores chat memories inside ordinary SillyTavern world-info/lorebook files. Our agreed product model separates chat-owned Memorybooks from Character/Persona Lorebooks. A first-class Memorybook needs its own schema and storage boundary.

#### UI and configuration breadth is excessive

The extension exposes many profiles, providers, title formats, insertion modes, vector/constant behavior, recursion flags, regex transforms, group modes, narrator modes, tiers, prompts, and popups. This is precisely the type of complexity the rework is intended to hide behind clear defaults and progressive disclosure.

#### Monolithic integration surface

`index.js` is roughly thirteen thousand lines and coordinates UI, events, jobs, generation, lorebooks, groups, branching, rollback, and settings. Directly merging it would preserve the old architecture’s coupling. Reusable policies should be extracted behind new domain services.

#### Tight dependency on SillyTavern internals

The extension imports internal scripts directly, uses jQuery and global events, edits world-info structures, executes slash commands, and attaches UI to current extension surfaces. These mechanisms are unsuitable as the foundation of a shared Electron/Android application layer.

#### Message ranges still depend on indices

The extension adds fingerprints and rollback tracking around them, but base source ranges remain numeric chat indices. The rework should use stable message IDs plus immutable content hashes.

#### Keyword activation is not sufficient retrieval by itself

Lorebook keywords are useful and transparent, but durable memory recall should not depend exclusively on exact keyword activation. Retrieval strategy must be designed separately and remain inspectable.

#### Connection/profile duplication

Memory Books maintains its own broad provider/profile system, including a full-manual API key path. The rework already has one NanoGPT connection/settings model. Memory jobs should reference secure shared Generation Settings rather than duplicate credentials and provider menus.

#### Integration tests remain incomplete

The existing tests strongly cover pure policy modules, but they do not prove the full browser event, provider request, lorebook persistence, hide/unhide, or complete UI workflow inside this fork. Those paths require new integration and end-to-end tests.

#### Build tool availability

The extension’s build script targets Bun, which is not currently installed in the workspace environment. Its Node-native tests do not require Bun and pass successfully.

## 6. Automated validation result

`node --test` was run in the Memory Books clone:

- **139 tests passed**;
- **0 failed**;
- **0 skipped/cancelled**.

Covered areas include branch copying, character locks, connection-profile resolution, consolidation routing, regeneration eligibility, deletion rollback, narrator state, OpenRouter routing, side-prompt defaults, STLO filters, job retry behavior, and memory-only retry behavior.

Summaryception has no automated tests to run.

## 7. Reuse, adapt, reject

This disposition separates concepts that can be carried forward directly, concepts that require substantial redesign, and patterns that should be excluded. It is a design-selection index rather than a license to copy either extension wholesale.

### Reuse as conceptual foundations

From Summaryception:

- recent verbatim window;
- batch-based short-term summarization;
- context-aware delta summaries;
- recursive/rolling compaction concept;
- catch-up processing;
- retry, cancellation, preview, browse, repair, import/export concepts.

From Memory Books:

- append-first durable entries;
- structured memory output;
- source provenance;
- review/edit workflow;
- previous-memory continuity context;
- explicit consolidation lineage;
- non-destructive source disabling;
- regeneration and compaction previews;
- rollback and branch semantics;
- queued background jobs and serialized writes;
- tracker snapshots and restoration.

### Adapt substantially

- Store all Memorybook data in a first-class chat-owned format rather than chat metadata plus world-info files.
- Use stable message IDs and content fingerprints instead of array indices.
- Make the short-term summary explicitly replaceable while retaining enough revision/provenance data for diagnosis and recovery.
- Preserve all durable entries unless the user explicitly edits or deletes them.
- Use a bounded, token-budgeted injection planner instead of injecting every retained summary.
- Retrieve durable memory through an inspectable hybrid policy rather than keyword-only activation.
- Fork Memorybook state transactionally when chats branch.
- Use the shared NanoGPT connection and secure credential storage.
- Integrate memory controls into the new conversation inspector instead of extension popups.
- Reduce configuration to beginner-safe presets with advanced controls collapsed.

### Reject from the new foundation

- Plain-text API keys in extension settings.
- Mutating live prompt toggles for background summarization.
- Extension-global jobs that can commit after the active chat changes.
- Unbounded deepest summary layers.
- Promoted summaries without complete source lineage.
- Silent invalidation gaps after edits, deletions, swipes, or branches.
- Treating `/hide` state as the authoritative memory boundary.
- Using one enormous UI/controller module.
- Duplicating the full provider stack inside Memorybook settings.
- Exposing lorebook insertion/vector/recursion internals to ordinary users.

## 8. Required invariants for the future Memorybook

These are audit-derived constraints, not yet the full design.

1. A Memorybook belongs to exactly one chat timeline.
2. Starting a new chat creates an empty Memorybook.
3. A branch receives a point-in-time fork of memory valid at the branch point, never future parent events.
4. Raw messages are never deleted by memory processing.
5. Short-term summaries are explicitly marked as derived and replaceable.
6. Durable memories are append-first and never silently rewritten.
7. Every summary or memory records stable source message IDs, content fingerprints, timestamps, and generation provenance.
8. Editing/deleting/swiping source messages marks dependent derived memory stale before the next model call.
9. A background result may commit only if the target chat, source fingerprint, and expected memory revision still match.
10. Failed generation never advances the processed boundary.
11. Memory writes, branch forks, rollback, and consolidation are transactional or recoverable.
12. The injection planner has an explicit token budget.
13. Users can inspect exactly what memory will be sent and why.
14. Manual edits are preserved and distinguished from generated content.
15. Durable memory promotion, compaction, replacement, and deletion are reviewable and reversible.
16. Provider credentials come only from the application’s secure shared connection service.
17. Memory generation uses isolated requests and cannot mutate the active roleplay preset.
18. The UI starts with safe automation and concise status; thresholds, prompts, retrieval, and repair live under Advanced.

## 9. Foundation recommendation

Build the Memorybook as a new subsystem with separate services for:

- source timeline and stable message identity;
- short-term summary generation;
- durable memory extraction;
- memory persistence and revision history;
- retrieval/injection planning;
- background jobs and commit validation;
- branching and rollback;
- user review/editing;
- trackers.

Port narrow algorithms and policy tests where they remain appropriate. Do not port either extension’s settings UI or top-level controller architecture. Memory Books’ policy modules are the better structural reference; Summaryception’s delta summarization is the better short-term behavioral reference.

## 10. Questions reserved for Memorybook design

The audit establishes the foundation but does not yet decide:

- whether short-term summarization triggers by messages, tokens, context pressure, scene boundaries, or a hybrid;
- how many replaceable short-term layers exist;
- when a durable memory is extracted from raw messages versus short-term summaries;
- whether durable memories are saved automatically, suggested for review, or governed by a per-chat mode;
- how retrieval balances chronology, keywords, recency, entities, and semantic relevance;
- how much revision history is retained for overwritten short-term summaries;
- how branches fork summaries, durable entries, and tracker state;
- when compacted/consolidated entries replace active sources in the injection plan;
- which controls appear in the normal Memorybook UI;
- which advanced prompts and thresholds are user-editable;
- how memory generation cost is estimated and displayed.

These questions should be answered in the Memorybook functional specification using this audit as its evidence base.

## 11. Extraction retry follow-up

A focused second inspection compared the retry paths in SillyTavern, Summaryception, and Memory Books before the native extraction policy was locked. The useful behaviors are complementary rather than identical, so the rework adopts a bounded hybrid documented in the Memorybook Functional Specification.

### 11.1 Summaryception retry behavior

Summaryception classifies cancellation as non-retryable, distinguishes connection errors that explicitly declare recoverability, retries HTTP 429 and 500/502/503/504 plus common transient network failures, respects numeric or date-form `Retry-After`, and otherwise applies exponential backoff with jitter from a two-second base up to 60 seconds. It permits five retries and imposes a 120-second request timeout.

Most importantly, a failed summary does not advance the processed pointer or hide the source turns. The current summarization cycle stops and the intact batch remains available for a future trigger. This source-preservation rule and the transport classification are appropriate foundations; five background retries are excessive for the new token-conscious Long Memory extraction default.

Evidence: `ST-UI/Extension-Summaryception/index.js:140-191,794-915,970-981,1047-1069` and `ST-UI/Extension-Summaryception/connectionutil.js:21-33,518-535`.

### 11.2 Memory Books retry behavior

Memory Books defaults to two automatic retries separated by an abortable fixed two-second delay. It carries a generation retry-state object and the original memory/source snapshot through recursive attempts, classifies token warnings and invalid profiles as non-retryable, avoids retrying scene compilation, invalid memory-result, and invalid Lorebook errors, and keeps specific error states available for user retry. Separate structured-response paths perform a single explicit JSON-only repair.

These are valuable extraction-specific safeguards: retry against frozen evidence, do not retry invalid input/configuration, preserve cancellability, and separate malformed-output repair from transport recovery. Fixed-delay recursion and broad “retry by default” classification should be replaced by the more precise provider-aware policy.

Evidence: `ST-UI/Extension-MemoryBooks/constants.js:8-15`, `ST-UI/Extension-MemoryBooks/index.js:5122-5158,5162-5180,5299-5319,5647-5688`, and `ST-UI/Extension-MemoryBooks/arcanalysis.js:914-957`.

### 11.3 SillyTavern retry boundary

Core SillyTavern supplies abort-signal plumbing and isolated service-specific retry examples, but its ordinary chat-completion and custom request paths generally perform one request and return the failure. It does not expose a single background-extraction retry transaction with immutable source identity, schema repair, idempotent commit, or pending-work recovery.

The native Memorybook therefore shares the provider error classifier and worker transaction infrastructure defined in the State Worker Reliability Foundation Audit rather than copying an extension loop. The agreed extraction layer adds two bounded transport retries, one deterministic structured repair, a four-call cap, pending-source preservation, and delayed/manual recovery after exhaustion.

Evidence: `SIllyTavern Original/public/scripts/custom-request.js:118-159,462-500`, `SIllyTavern Original/src/endpoints/backends/chat-completions.js:2590-2628`, and `SIllyTavern Original/src/endpoints/backends/kobold.js:93-140`.
