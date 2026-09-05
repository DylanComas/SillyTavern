# Astra Audit Follow-up — Added, Modified, Removed

Date: 2026-09-05, Europe/Paris. Project-work changelog, not an application release. Final scope: `ST-UI/sillytavern-ui-rework/` and `Project Vault/` only. The original Astra handoff is preserved unchanged. Phase 1 remains **Defining**; its closure conversation has not resumed.

This pass corrects the rework documentation and Vault machinery. It does not implement or certify the new application runtime. All 19 findings have an explicit disposition in [Astra Audit Follow-up](../../../Project%20Vault/Project/Astra%20Audit%20Follow-up.md); original-app/Git-boundary work is excluded, product choices remain pending where stated, and runtime proof stays assigned to its delivery phase.

## Added

- `ST-UI/sillytavern-ui-rework/AGENTS.md`: strict rework/Vault-only boundary, preservation of user files, source authority, concept-note rules, and no implicit product acceptance.
- `ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md`: individual concepts for generation/Continue identity; bounded worker scheduling and attempt ceilings; historical cutoff-state extraction; request-aware On-change delivery; worker capability/cost matrix; immutable provider request boundary; quota authority; shared prompt budgeting; Short Memory baseline proposal; progressive control delivery; and executable-evaluation gates.
- `ST-UI/sillytavern-ui-rework/WORKFLOW-SURFACE-MAP.md`: candidate desktop/mobile homes for conversation/identity, generation/settings, memory/scene tools, research/diagnostics, and the art-direction boundary. It does not approve feature parity or release inclusion.
- This changelog under `ST-UI/sillytavern-ui-rework/changelogs/`.
- `Project Vault/AGENTS.md`: scope and safe maintenance/recovery instructions.
- `Project Vault/System/vault-generation.mjs`: allowlisted generation publication, canonical/path/junction checks, staging, complete prior-output copies, transaction journal, publication lock, rollback, and explicit crash recovery.
- `Project Vault/System/sync-project-vault.test.mjs`: 12 dependency-free regression tests using temporary synthetic workspaces, not original-app or extension code.
- `Project Vault/Project/Astra Audit Follow-up.md`: disposition and evidence for every finding A01–A19, explicit exclusions, pending choices, later validation, and resumption gate.
- Generated concept notes and document indexes for the new documents and appended concepts. Final generation contains 16 source-document indexes and 396 populated subordinate entries (412 represented headings), adding 3 indexes and 23 entries to the previous 13/373 baseline. Existing note identities are retained.

## Modified

- `README.md`: active final diagonal artwork references; historical 11/12 boards distinguished; managed local creative-model exclusion corrected to retain the agreed local State Worker; links to safety contracts and workflow map; strict working scope.
- `PRODUCT-DEFINITION.md`: Character Card audit marked complete without approving metadata placement; candidate settings scope corrected to Save/Export and recoverable writable settings.
- `SETTINGS-VERSIONING-SPEC.md`: removed an unsupported legal-ownership implication; defined resolved generation/preset snapshots versus mutable reference IDs; retained linked Character/Persona/Lorebook content policy as an explicit pending choice.
- `MEMORYBOOK-FUNCTIONAL-SPEC.md`: segment-safe turns; no review draft after extraction; historical supporting state frozen at the source cutoff; clarified worker modes and independent memory-job availability; Short Memory behavior gap linked to the concrete proposal and shared overflow contract.
- `SCENE-STATE-TRACKER-SPEC.md`: no age-based volatile decay; request-aware On-change anchoring; realistic multi-character seeding and alias disambiguation; separate-request backup versus sidecar; API/local attribution costs; corrected Disabled behavior; scoped scheduler/cursors/span splitting; complete serialized budgets and four-attempt ceiling; synthetic workload versus verified quota units; illustrative fixture no longer claimed executable.
- `TRACKER-FOUNDATION-AUDIT.md`: labeled historical/superseded recommendations; relocated-source context without re-auditing clones; phase-only time; cutoff-state handoff; retired Context Profile terminology.
- `STATE-WORKER-FOUNDATION-AUDIT.md`: corrected historical code-evidence path prefixes; documented provider-isolation and quota-authority limitations from the handoff; explicitly prohibited original-app follow-up and linked new rework contracts.
- `MEMORYBOOK-FOUNDATION-AUDIT.md`: relocated extension evidence paths only; no extension re-audit or changes.
- `CHARACTER-CARD-COMPATIBILITY-SPEC.md`: Preserve Source versus strict export distinguished; recognized/app-owned privacy filtering takes precedence; opaque metadata requires disclosure/preview/removal, not an impossible privacy guarantee; added cast-seeding contract and synthetic compatibility-test requirements.
- `REWORK-PLAN.md`: explicit audit follow-up gate, Short Memory/linked-content/delivery exit questions, illustrative versus executable fixture status, Phase 2 safety validation, candidate workflow homes, and restricted implementation scope. Settings remain complete; no other closure choice is silently accepted.
- `Project Vault/00 Project Home.md`: relocated authored-source roots.
- `Project Vault/Project/Current Context.md`: concise current working boundary, project state, corrections, authoritative documents, pending choices, and later validation.
- `Project Vault/Project/Tasks.md`: audit-first gate and explicit remaining closure/validation work; initial topic completion qualified by the discovered Short Memory gap.
- `Project Vault/Project/Decisions.md`: appended scope and audit-correction record; preserved historical decisions and distinguished proposals from accepted behavior.
- `Project Vault/Project/Work Log.md`: recorded repair, scope restoration, tests, documents, and final synchronization.
- `Project Vault/System/Vault Maintenance.md`: relocated roots, expected-document validation, staged publication, recovery/locking, stable note-ID explanation, operational AGENTS exclusion, regression command, and original/extension boundary.
- `Project Vault/System/sync-project-vault.mjs`: new roots and expected source inventory; read-only `--check`; `--recover`; argument/path/case-collision checks; in-memory candidate validation; stable historical note paths with current provenance; source-anchor validation; relocated Markdown/artwork links; delegated recoverable publication. The existing Concept Arts documents are mirrored only and were not edited.
- Generated `Sources/`, `Entries/`, `01 Document Index.md`, `02 Heading Index.md`, `System/Inventory.md`, and `System/Sync Report.md`: current source paths, corrected content/links, new populated concept notes, counts and parent relationships. The 13 old document indexes and 373 old entry identities are preserved; previous output remains in `.sync-recovery/`.
- Verification: the 12 maintenance regression tests pass. Final synchronization validates 16 documents, 396 populated entries, all immediate parents and internal Vault links, with zero errors. No original-app or extension tests, model benchmark, live provider quota verification, or application release validation was run within the final scope.

## Removed

- The live synchronizer's deletion-before-validation path and silent missing-root acceptance; the unused destructive reset helper was removed. Legacy `Indexes/` now causes a validation refusal rather than silent deletion.
- Stale active claims about review drafts, precise scene timestamps, unconditional local-worker usage, sent-once context sufficiency, guaranteed whole-cast import, executable fixture readiness, and blanket opaque-field privacy. Historical findings remain recorded rather than rewritten as if they never happened.
- Operational `AGENTS.md` files from document mirroring; they remain ordinary instruction files in their allowed scopes.
- All original-app changes briefly started before the user's restriction were undone by reversing only this task's edits. The newly created original-app helper/test files were removed; the existing endpoint, display, guidance, and updater edits were restored. No original-app fix remains part of this deliverable.
- Temporary outer-root `AGENTS.md`, `.gitignore`, and `REPOSITORY-LAYOUT.md`, plus the temporary `ST-UI/AGENTS.md` and extension-reference manifest created during this task, were removed after scope was narrowed. They were this task's additions, not pre-existing user files.
- No pre-existing source document, artwork, extension file, Git metadata, or saved Vault note identity was intentionally removed. Generated files replaced during publication are recoverable from the retained transaction backup. No folder migration, bulk staging, or Obsidian configuration change was performed.
