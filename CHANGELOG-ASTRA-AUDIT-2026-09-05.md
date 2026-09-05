# GPT-6 Astra project audit and handoff changelog

Date: 2026-09-05 (Europe/Paris). Status: audit completed; recommended product and implementation changes remain proposed.

## Request and scope

The user moved this project task to GPT-6 Astra and requested an audit of everything defined so far: incoherences, weak decisions, unspecified areas, technical risks, and possible improvements, with the quickest fixes. They also requested a changelog describing the request, their folder changes, and the modifications to make depending on the audit, for loading into the main chat.

Reviewed the 13 authored Markdown documents in the rework and concept-art folders, Vault context/tasks/decisions/work log and indexing machinery, the two final concept showcases, and selected original implementation paths relevant to the promises: Continue, Electron startup, provider-profile requests, NanoGPT usage, and update scripts. The rework remains in Phase 1 definition: its folder contains specifications and artwork, not a new runnable application. Existing extension tests and previous audit results are historical evidence, not tests rerun in this audit. This is a definition and targeted implementation audit, not an exhaustive security or dependency audit of every upstream file. External provider terms, pricing, licensing, and model performance were not revalidated or newly certified.

## Folder changes supplied by the user and verified on disk

Workspace root: `C:/Users/dylan/Documents/ChatGPT/SillyTavern`.

| Previous location | Current location | Meaning |
| --- | --- | --- |
| SillyTavern implementation at workspace root | `SIllyTavern Original/` | Original application and its existing Electron work. The on-disk spelling has an uppercase `I` after `S`; use the actual spelling in portable paths. |
| `Project Vault/` | `Project Vault/` | Vault remains in place. |
| `concepts/sillytavern-ui-rework/` | `ST-UI/sillytavern-ui-rework/` | Authoritative rework specifications and earlier concept images. |
| `concepts/sillytavern-unified-suite/` | `ST-UI/Concept Arts/` | Unified-suite image collection, README, and prompts. |
| `concepts/Extension-*/` | `ST-UI/Extension-*/` | Five reference extension checkouts, each retaining its own `.git`. |

The outer `.git` stayed at workspace root. The original application's `.gitignore`, `.github`, package files, and `AGENTS.md` moved inside `SIllyTavern Original/`. No folders were moved or renamed by this audit.

## Completed changes in this audit

- Added this standalone audit/changelog handoff file.
- Added a short audit notice to `Project Vault/Project/Current Context.md` without replacing the existing product focus.
- Recorded the audit in `Project Vault/Project/Work Log.md`.
- Inspected source and repository state read-only. At inspection, Git reported 988 tracked paths missing from their old locations; that is evidence of the unrecorded move, not proof of lost file contents.
- Did not run the existing vault synchronizer because its old roots and deletion-before-validation sequence are unsafe after the move.
- No product decision was accepted on the user's behalf. No runtime code, source specification, generated Vault note, Obsidian configuration, Git metadata, or release version changed.

This is a project-work changelog, not an application release. It does not create a `0.0.1` build or imply that the planned versioned Factory Defaults pipeline exists.

## Incoherences

Each finding below has a stable ID for follow-up. High means resolve before relying on the affected implementation contract; Immediate means repair before the affected maintenance operation. A proposed fix is not an approved design change.

### A01 — Immediate: the folder migration broke maintenance paths

**Finding:** The synchronizer still discovers `concepts/sillytavern-ui-rework` and `concepts/sillytavern-unified-suite`. Missing directories return an empty list, after which it deletes generated `Sources/` and `Entries/` before validation. The last successful report predates the move. Vault provenance and maintenance text also use the old paths. The only `AGENTS.md` is now scoped to the original application, so future work under ST-UI or the Vault does not inherit that guidance.

**Quickest fix:** Add workspace-root guidance using current paths; migrate both sync roots and group/tag handling; update live maintenance references and code-evidence path prefixes. Require every configured root to exist and contain expected documents before any replacement. Render and validate a staged generation, then replace the previous output with recovery available. Preserve existing note IDs or provide an explicit link migration so source relocation does not invalidate saved links. Keep `area/unified-suite` if needed to preserve the existing graph configuration without editing `.obsidian`.

**Evidence:** `Project Vault/System/sync-project-vault.mjs:11,57,388,396`; `Project Vault/System/Vault Maintenance.md`; `Project Vault/Project/Current Context.md`; `SIllyTavern Original/AGENTS.md`. Before adding any new in-scope document, the expected source count remains 13: 11 rework documents plus 2 Concept Arts documents.

### A02 — Immediate: Git and updater layout no longer match the application

**Finding:** The outer Git repository tracks the old application layout, showing 988 missing tracked paths and the relocated trees as untracked. `SIllyTavern Original/UpdateAndStart.bat` explicitly requires `.git` in its own directory and will refuse this layout. The moved `.github` directory is also no longer at the outer repository root. The outer workspace has no root ignore policy for the Vault and reference clones.

**Quickest fix:** Decide the repository boundary before staging. The least disruptive long-term match for the user's folder split is a standalone original-application checkout inside `SIllyTavern Original/` and a separate project/docs repository outside it. Preserve local changes and repository metadata first; do not simply relocate or reset `.git`. If retaining one outer repository instead, explicitly adapt the updater and CI to a monorepo and record the move. Add scoped outer ignores before any bulk staging; record extension revisions without accidentally adding their working trees as unmanaged nested repositories.

**Evidence:** outer `git rev-parse --show-toplevel`, `git status --porcelain=v1 -uno`, nested `.git` inventory, `SIllyTavern Original/UpdateAndStart.bat`, and the moved `.gitignore`/`.github` paths. This audit neither stages nor changes Git state.

### A03 — Medium: summaries still contradict newer decisions

**Finding:** The Bible's “Not currently required” list excludes managed local models despite the agreed local worker. The boundary action still links to a “review draft” despite immediate active creation. The tracker foundation retains exact time ranges and the retired “context profile” terminology. Workflow rows still say Character Card format audits are needed; candidate scope still says “protected versioned settings files.” The lifetime table permits volatile expiry without explicitly excluding age-based decay, unlike the newer semantic-retirement contract. The Bible identifies the older 11/12 artwork while Concept Arts calls the diagonal showcases final.

**Quickest fix:** Perform one reconciliation pass using the newer dedicated specifications and dated accepted decisions. Qualify local-model exclusion as creative generation only; remove draft language; align phase-only time, settings Save/Export, and evidence-based retirement; mark completed format audits accurately. Clearly label historical audit recommendations as superseded where appropriate. Choose and link the active artwork once.

**Evidence:** `ST-UI/sillytavern-ui-rework/README.md` §§7,9; `MEMORYBOOK-FUNCTIONAL-SPEC.md` §7.4; `TRACKER-FOUNDATION-AUDIT.md` §§3,7.4; `PRODUCT-DEFINITION.md` §§3,10; `SCENE-STATE-TRACKER-SPEC.md` §4; `ST-UI/Concept Arts/README.md`.

### A04 — High: worker modes and disabled behavior have conflicting meanings

**Finding:** Memorybook describes “Use main model” as an isolated request; the tracker describes Main Model Sidecar as a structured channel alongside creative output. These have different provider support and cost. Worker Disable says it disables “model-managed scene extraction,” although manual boundaries and independently profiled Long Memory extraction are separate capabilities. Conservation text assumes routine tracking is local even when API was selected. “No model calls for dialogue colors” also fails to distinguish rendering from model-assisted attribution.

**Quickest fix:** Write one capability matrix for Local, API, main-model extraction, provider-supported sidecar, and Disabled. Name a separate main-model request distinctly from a same-response sidecar. State explicitly that disabling tracking leaves separately configured Short/Long Memory jobs available. Attribute API worker and attribution costs correctly; rendering itself creates no call.

**Evidence:** `MEMORYBOOK-FUNCTIONAL-SPEC.md` §§4,8.5; `SCENE-STATE-TRACKER-SPEC.md` §§8.5.1,9.1,10.1,13.1.1,13.3.

## Weak decisions

### A05 — Medium: onboarding makes declining the worker unnecessarily cumbersome

**Finding:** Local → API → Local-or-Disable makes users reject two paths before reaching an already supported Disabled mode. This adds friction to the primary goal of entering a chat quickly, especially while Android local execution is unproven.

**Quickest fix:** Offer Local, API, and Disable together, explain what each enables, and allow setup later in Preferences. Keep the explicit choice and consent requirements. This changes an agreed interaction, so treat it as a recommendation for the main chat, not an implemented correction.

**Evidence:** `SCENE-STATE-TRACKER-SPEC.md` §13.1.1; `REWORK-PLAN.md` Phase 2 onboarding spike.

### A06 — Medium: configurability is expanding faster than validated defaults

**Finding:** The Memorybook requires an explicit setting for every user-facing behavior while worker, retrieval, relationships, weather, and versioning add many interacting controls. Collapsing them under Advanced does not reduce validation, migration, documentation, or testing cost.

**Quickest fix:** Preserve the agreed customization direction, but implement a few coherent presets first. Expose existing promised settings progressively once their allowed combinations are validated. Keep internal mechanics in validated Factory Defaults unless a concrete user workflow needs a control. Avoid adding more tunable dimensions before the first vertical slice.

**Evidence:** `MEMORYBOOK-FUNCTIONAL-SPEC.md` §2; `SCENE-STATE-TRACKER-SPEC.md` §§4–5,13; `SETTINGS-VERSIONING-SPEC.md` §§3,5.

## Non-specified areas

### A07 — High: Short Memory is not behaviorally closed

**Finding:** The current context says the Memorybook product pass is complete, but the Short Memory specification still leaves its default trigger, rolling versus layered compression, scheduling, and oversized protected-window behavior open. Ten turns can exceed context before compression completes. The layers have separate budgets without one complete ordering and overflow contract for required prompt instructions, lore, summaries, current state, pins, recent prose, research, and response reserve.

**Quickest fix:** Add one small behavior table before Phase 1 closure: proposed baseline is turn-triggered bounded rolling summary, the existing 10/3 window, and a separate hard context-pressure path. Define what stays raw while summarization is pending or failed and what happens when a single required message cannot fit. One prompt planner should reserve output and mandatory content, deduplicate contributors, and visibly block with resolution choices when required content cannot fit. Preserve the accepted no-silent-pin-eviction rule. Exact algorithms can remain Phase 2 work.

**Evidence:** `MEMORYBOOK-FUNCTIONAL-SPEC.md` §§3.2,3.5,6,7.2,8.2.1,10; `Project Vault/Project/Current Context.md`.

### A08 — High: the remaining release decisions are genuinely open

**Finding:** Four existing closure topics remain: app-local card preferences/export opt-in; Lorebook activation compatibility and promotion ownership; research activation/privacy/evidence/cache/cost; and exact desktop/Android v1 matrices. Present-cast and continuity-profile delivery defaults also still await confirmation. An Android APK is agreed, but standalone versus connected operation and local-worker feasibility are not settled. These are acknowledged open items, not newly discovered implementation failures.

**Quickest fix:** Close the four existing topics in order. Use the existing app-local metadata proposal as the candidate, preserve imported Lorebook activation settings by default, make research opt-in, and give every platform feature a Must/Should/Deferred disposition with a failure fallback. Explicitly assign the cast/profile delivery decision. Keep Android runtime choices conditional until the Phase 2 spike passes; do not infer parity from “Both” inventory rows.

**Evidence:** `Project Vault/Project/Tasks.md`; `PRODUCT-DEFINITION.md` §§11–13; `SCENE-STATE-TRACKER-SPEC.md` §12; `REWORK-PLAN.md` Phase 2 Android topology.

### A09 — High: “restore exactly” needs a rule for mutable linked content

**Finding:** Chat State snapshots resolved settings, but the specifications do not clearly say whether later edits to referenced base presets, Preset Configurations, Character Cards, or Lorebooks change an existing chat's effective prompt. A stable ID preserves identity, not the previous content. A deleted-reference repair state is specified, but changed-reference behavior is not fully resolved.

**Quickest fix:** Define exact restoration for resolved generation values and preset rules. Separately decide whether reusable Character/Lorebook content follows current edits or a retained version; expose a changed-content notice if needed. Store IDs plus content revisions/hashes and resolved values needed for reproducibility, without introducing the rejected user-facing immutable settings system.

**Evidence:** `PRODUCT-DEFINITION.md` §4; `SETTINGS-VERSIONING-SPEC.md` §§6–7; `SCENE-STATE-TRACKER-SPEC.md` §8.6 explicitly permits ordinary Lorebook edits to affect later context.

### A10 — Medium: multi-character cards lack a reliable seeding contract

**Finding:** Discovery promises immediate Card Character records for every individual represented by a multi-character card. The audited card schema is a character envelope with prose; it does not supply a guaranteed structured cast list. Name parsing cannot reliably enumerate a prose-defined cast or distinguish two characters sharing a name.

**Quickest fix:** Seed the explicit card identity and structured members when available. Use an editable cast list or evidence-backed discovery for additional prose-defined people, with aliases and stable IDs. Do not manufacture a complete cast during import. Decide this alongside card portability and preserve the no-provisional-NPC direction.

**Evidence:** `SCENE-STATE-TRACKER-SPEC.md` §§8.2–8.3; `CHARACTER-CARD-COMPATIBILITY-SPEC.md` §§2–3,7.

## Technical risks

### A11 — High: Continue cannot be counted using stored message IDs alone

**Finding:** The new rule gives every Continue a new canonical turn. Current SillyTavern appends Continue text to `lastMessage.mes`, retaining the message object. Counting committed stored messages or hashing the whole message therefore loses continuation boundaries and can double-count or reset NPC participation, cooldowns, and summary ranges.

**Quickest fix:** Add stable generation/continuation segment identities beneath a message, with source spans, revisions, and swipe lineage. Count canonical turns from those events while allowing the existing visual message grouping. For old imports with no segment history, define a deterministic fallback without inventing missing turns.

**Evidence:** `SIllyTavern Original/public/script.js:6638` onward; `MEMORYBOOK-FUNCTIONAL-SPEC.md` §§3.3–3.4; `SCENE-STATE-TRACKER-SPEC.md` §§8.3,8.5.3.

### A12 — High: worker limits do not yet guarantee forward progress

**Finding:** Requests cap at 8,192 input / 512 output tokens and split oversized evidence only on canonical turn boundaries. A single large turn cannot be split by that rule. A busy group scene's attributed operations can exceed 512 output tokens, and retrying the same shape will not fix deterministic truncation. “Only one job” is not explicitly scoped, three-turn batching does not bound a persistent backlog, and the worker lacks Long Memory's explicit total automatic-call cap across repair/fallback/chunks.

**Quickest fix:** Define per-chat cursors under one resource scheduler, span-aware chunking for oversized turns, bounded pending work, and a visible catching-up state. Specify chunk identity and commit/cursor semantics; source data must never be dropped. Budget the complete serialized schema and evidence, measure the smallest workable output cap, and enforce a total attempt/cost ceiling for each logical job. Prove progress under repeated commits and manual edits as well as stale-result rejection.

**Evidence:** `SCENE-STATE-TRACKER-SPEC.md` §§13.2,13.5; contrast `MEMORYBOOK-FUNCTIONAL-SPEC.md` §7.5.3's four-call limit.

### A13 — High: historical extraction can receive future scene state

**Finding:** Manual boundaries may be placed in old gaps and automatic detection can place a boundary up to three turns back. Extraction receives the source range plus “current validated Scene State.” Current state may already describe the following scene, contaminating the fixed time, place, or participant record even when message fingerprints still validate.

**Quickest fix:** Freeze supporting state at the extraction cutoff, reconstructed from events/checkpoints on the same branch. Include only corrections explicitly applicable to that range. Never pass the latest scene snapshot simply because it is current. Add a fixture where a delayed boundary separates two locations and casts.

**Evidence:** `MEMORYBOOK-FUNCTIONAL-SPEC.md` §§7.4,8.3,8.4.1; `TRACKER-FOUNDATION-AUDIT.md` §7.3.

### A14 — High: one-shot On-change delivery can disappear on the next request

**Finding:** Location/time changes are injected once and re-anchored when source evidence leaves context. A manual Time Skip can have no supporting prose at all; a temporary injected line may not be retained in the next request. Tracking whether it was sent once is insufficient for a stateless model. An unchanged worker result also must not suppress independently due re-anchoring.

**Quickest fix:** Track whether the current fact is actually represented in the assembled request, via retained prose, summary, or a delivery event. Re-anchor when that representation is absent. Define pending delivery across failed/cancelled requests and multiple changes. Keep delivery eligibility separate from worker-delta production.

**Evidence:** `SCENE-STATE-TRACKER-SPEC.md` §§5.1–5.2,6.1.2,10; `MEMORYBOOK-FUNCTIONAL-SPEC.md` §8.1.

### A15 — High: the reusable usage adapter is not yet safe as quota authority

**Finding:** `parseNumber` maps missing/invalid values to zero, while null also coerces to zero. A successful subscription response is discarded when the independent balance request fails. The code exposes both daily and weekly input-token buckets, whereas the reference week totals input plus output and does not fully specify daily exhaustion, stale readings, request reservation, or overage behavior. The table is useful workload estimation, not proof of billing semantics or enforcement.

**Quickest fix:** Preserve Unknown/null and freshness, handle balance and subscription partial success separately, and distinguish provider quota units from workload token totals. Reconcile both daily and weekly buckets. Define a pre-request reservation/check and explicit policy for stale readings and overage; do not claim protection from a missing denominator. Validate against recorded/current provider responses in Phase 2 before enabling enforcement.

**Evidence:** `SIllyTavern Original/src/endpoints/nanogpt.js:12,23,56,81`; `SCENE-STATE-TRACKER-SPEC.md` §§10.1,13.4.1. These are local code findings, not claims about current provider plan terms.

### A16 — High: reusing provider plumbing requires an actual isolation layer

**Finding:** The foundation audit recommends reusing `ConnectionManagerRequestService`, but that service still depends on `SillyTavern.getContext()`, enabled extensions, profile registries, and browser-side services. It cannot be treated as an already independent Electron/Android worker backend. Existing Electron code also imports the server into the main process; it is a prototype rather than the promised supervised child-runtime/console platform.

**Quickest fix:** Introduce a narrow request interface with explicit immutable profile/configuration inputs. Start by adapting the existing desktop services behind it; prove concurrent roleplay and worker requests do not change one another's configuration. Resolve the Android transport during the existing topology spike. Keep secure credentials behind the platform boundary. Include startup failure and clean shutdown in the Electron spike rather than assuming packaging is done.

**Evidence:** `SIllyTavern Original/public/scripts/extensions/shared.js:417` onward; `SIllyTavern Original/src/electron/index.js`; `STATE-WORKER-FOUNDATION-AUDIT.md` §5; `REWORK-PLAN.md` Phase 2.

### A17 — Medium: unknown-field preservation needs a precise privacy promise

**Finding:** Card export promises to retain arbitrary imported extensions while also saying credentials, paths, and private runtime data never enter a shared card. The app can reliably exclude its own private state and recognized fields, but cannot guarantee that opaque third-party fields contain no private information. “Preserve Source” also needs explicit precedence relative to privacy exclusions and strict target export.

**Quickest fix:** State that app-owned private data and recognized sensitive fields are excluded even in Preserve Source. Keep unknown extensions subject to the documented export preview/removal controls, and avoid claiming automatic semantic privacy classification. Define Preserve Source as compatible with ecosystem imperfections; strict V2/V3 export performs disclosed repairs. Add synthetic fixtures for unknown nested fields, known private fields, and mixed-version cards.

**Evidence:** `CHARACTER-CARD-COMPATIBILITY-SPEC.md` §§7–11. This is a contract limitation, not evidence that the current project has leaked data.

## Possible improvements

### A18 — High-value improvement: make the first evaluation fixture executable early

**Finding:** The “ready” worker fixture uses character names, unlabeled message records, and `STATE_PATCH_SCHEMA` as a placeholder. It cannot establish the stated schema, identity, provenance, or replay gates. The formal metrics are targets, not measured performance, and the single fixture does not cover their corpus requirements.

**Quickest fix:** In Phase 2, turn it into a minimal versioned schema, stable-ID transcript, expected patches, and deterministic validator before polishing the UI. Add no-change, alias collision, Continue/swipe, oversized turn, delayed boundary, manual correction, and stale-result cases. Then run the agreed candidate comparison in the working interface and expand to the prescribed held-out corpus. This supplements, rather than replaces, the agreed in-interface qualification.

**Evidence:** `SCENE-STATE-TRACKER-SPEC.md` §§13.5,14; `MEMORYBOOK-FUNCTIONAL-SPEC.md` §8.4.2. No model performance result is asserted by this audit.

### A19 — Medium-value improvement: add one current screen-to-workflow map

**Finding:** The final concept images predate the clock, Cast panel, Memorybook, and detailed Generation Settings rules. The mobile navigation has Chats, Characters, Lore, Create, More but no explicitly mapped Persona or Memorybook destination. The existing plan correctly defers detailed UX, yet the Phase 1 gate still needs a home for each Must workflow.

**Quickest fix:** Add a one-page map linking each Must workflow to its desktop surface and mobile route/sheet. Explicitly place Personas, Memorybook, Cast, scene actions, and diagnostics. Treat the final diagonal showcases as art direction only and label their superseded controls; no new artwork is necessary before continuing definition.

**Evidence:** `ST-UI/Concept Arts/README.md`, `desktop-diagonal-theme.png`, `android-diagonal-theme.png`; `PRODUCT-DEFINITION.md` §§3,13; `README.md` §§6–7.

## Proposed modification ledger for the main chat

All rows below are pending. Replace a row's status with Applied only after the change and its evidence exist. Append a dated completed-change entry; do not rewrite an audit finding to imply the issue never existed.

| Batch | Findings | Proposed modification | Timing / completion evidence | Status |
| --- | --- | --- | --- | --- |
| Maintenance | A01–A02 | Repair root guidance, source mapping, fail-safe sync, and repository ownership/update policy | Before sync or bulk Git staging; unchanged notes after failed sync; 13 expected sources before scope additions; valid migrated links | Proposed |
| Consistency | A03–A04 | Reconcile stale text and publish one worker capability/cost matrix | Before implementation relies on summaries; no contradictory live rules | Proposed |
| Small product closures | A05–A10 | Simplify setup if accepted; bound control surface; settle Short Memory overflow, mutable references, cast seeding, and existing Phase 1 decisions | Explicit accepted behavior and updated workflow/platform matrices | Proposed |
| Core architecture | A11–A14,A16 | Add generation segments, job/cursor limits, cutoff-state extraction, request-aware delivery, provider adapter | Phase 2 vertical slice with Continue, branch/edit, backlog, failure, and replay evidence | Proposed |
| Usage / portability | A15,A17 | Correct quota normalization and partial success; define enforcement and export privacy precedence | Phase 2 provider fixtures and early data contracts; Phase 8 broader compatibility corpus | Proposed |
| Validation / UX map | A18–A19 | Executable worker fixtures and current workflow-to-screen map | Minimal harness in Phase 2; screen homes at Phase 1 exit; detailed UX in Phase 3 | Proposed |

## Resume instructions

Load this file alongside the existing Current Context. Start with the maintenance repair; do not run the old synchronizer. Reconcile obvious stale statements without reopening settled decisions. Resolve A07's remaining user-visible behavior and the four existing Phase 1 closure topics. Record accepted deviations from previous choices explicitly. Then perform the existing Phase 1 exit review and build one Phase 2 vertical slice covering chat generation, persisted identity, prompt budgeting, a worker job, and branch-safe replay. Do not expand first-release scope merely because additional architecture details are now visible.

The next user decision already queued before this audit remains app-local-by-default Character preferences with explicit Include App Metadata export. Keep source specs authoritative for detailed behavior and the Vault authoritative for project state; this changelog records audit findings and change status, not replacement product specifications.
