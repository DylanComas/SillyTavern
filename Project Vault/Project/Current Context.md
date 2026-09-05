---
tags:
  - project/context
---

# Current Context

## Working boundary

Work only in `ST-UI/sillytavern-ui-rework/` and `Project Vault/`. Never inspect, audit, test, or fix `SIllyTavern Original/` or the extension clones. Their historical audit findings are context only. The existing two Concept Arts documents remain in the Vault mirror; they are not an editing target. The user explicitly authorized a local Git checkpoint of the existing structure on 2026-09-05 to clear the folder-move change count. This exception permits recording paths/content in Git, not source review or edits. Do not move folders, push, further restructure Git, or modify Obsidian settings.

See [[./Git Layout Checkpoint|Git Layout Checkpoint]] for the accepted outer-repository baseline and local-only exclusions. The original application's historical tracked files retain their history at the moved paths; reference clones and extra original-app/local runtime files remain excluded.

## Project position

The rework remains **Phase 1 — Defining**. Electron desktop and an Android APK are the product direction; no replacement application or public build is claimed. Settings versioning/ownership is complete. Character Card structure was previously audited, but app-local preferences versus explicit metadata export is still awaiting confirmation.

The Astra follow-up is complete within the authorized documentation/Vault scope: 12 regression tests pass, the changelog exists, and the final generation validates with zero errors. See [[./Astra Audit Follow-up|Astra Audit Follow-up]] for all 19 dispositions. The product-closure conversation has not resumed; this was not the Phase 1 exit review.

## Authoritative material

- [[../01 Document Index|Document Index]] and [[../02 Heading Index|Heading Index]] locate the detailed source specifications and individual concept notes.
- Source documents: `ST-UI/sillytavern-ui-rework/`; artwork references: `ST-UI/Concept Arts/`.
- [[../Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Implementation Safety Contracts]] defines segment identity, worker progress, cutoff-state extraction, request-aware delivery, provider isolation, quota authority, prompt budgeting, and validation gates.
- [[../Sources/concepts/sillytavern-ui-rework/WORKFLOW-SURFACE-MAP|Workflow Surface Map]] gives candidate desktop/mobile homes without claiming approved release parity.
- The final diagonal desktop/Android showcases are the active art direction. Older 11/12 images remain historical, and later functional contracts supersede pictured controls.

## Corrections now governing the rework

An existing chat retains resolved generation values and effective preset rules, not merely mutable reference IDs. Character/Persona/Lorebook changed-content behavior still needs confirmation. Character Cards do not guarantee a structured cast list; seed explicit identities/members and use evidence or manual editing for others, without provisional NPCs or fabricated cast members.

Continue uses stable generation segments even when multiple segments share one displayed message. Worker jobs require bounded evidence prefixes, per-branch cursors, a resource scheduler, complete-response validation, and a total attempt ceiling. Historical extraction uses state at the source cutoff, never a newer scene snapshot.

Persistent Scene Memory has no age-based decay. On-change facts are omitted only while represented in the actual assembled request; manual time skips may need renewed anchoring. A worker no-change result cannot suppress that check.

Local/API worker, a separate main-model extraction request, provider-gated same-response sidecar, and Disabled are distinct. Disabling tracking does not disable independently configured Short/Long Memory jobs. Attribution may consume model tokens; visual rendering does not. API accounting preserves Unknown, freshness, partial success, separate daily/weekly units, and request reservations; the 60M workload table is not proof of provider billing semantics.

Card export excludes app-owned/recognized private fields even in Preserve Source. Opaque third-party metadata cannot be certified automatically free of private information; preservation requires disclosed preview/removal controls.

## Open product choices before Phase 1 exit

1. Confirm Character preference metadata placement/export opt-in.
2. Close Lorebook activation compatibility and explicit Memorybook promotion ownership.
3. Close research activation, evidence, privacy, cache/freshness, provider and cost behavior.
4. Approve desktop/Android Must/Should/Deferred matrices and failure fallbacks; do not assume standalone Android or local-worker feasibility.
5. Confirm the Short Memory rolling/trigger/context-pressure proposal.
6. Decide how changed linked Character/Persona/Lorebook content affects existing chats.
7. Confirm present-cast and Story Continuity Profile delivery defaults.

The simpler all-at-once Local/API/Disable onboarding is an optional audit recommendation, not accepted. The agreed explicit setup flow remains in force. Then conduct the formal Phase 1 exit review; do not advance merely because the topic list ended.

## Vault status

The synchronizer uses relocated roots, requires expected documents, validates candidate output before publication, preserves existing note IDs/graph area tags, and retains recovery copies. `Sources/concepts/` and `Entries/concepts/` are intentional stable IDs; provenance points to `ST-UI/`.

Each durable concept has a populated subordinate note and correct immediate parent; major document roots remain indexes. Operational AGENTS files are not mirrored. Run the read-only `--check` first, then synchronize and inspect [[../System/Sync Report|Sync Report]]. Tests and recovery behavior are documented in [[../System/Vault Maintenance|Vault Maintenance]].

Verified 2026-09-05: 16 document indexes and 396 populated entries represent 412 headings. All previous 386 note identities are retained; 3 indexes and 23 entries were added. The previous generation is retained in the publication recovery archive.

## Later evidence, not current completion

Phase 2 owns the executable stable-ID worker harness, isolated provider/runtime adapters, concurrency/replay/overflow tests, real model comparison, quota semantics, and Android topology spike. Phase 3 owns detailed UX; Phase 8 owns the broader card/privacy compatibility corpus. No model benchmark, original-app test, extension test, provider certification, or production runtime validation is part of the final repair scope.
