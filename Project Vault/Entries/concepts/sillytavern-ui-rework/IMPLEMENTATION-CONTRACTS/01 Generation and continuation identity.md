---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md"
source_line: 5
heading_level: 2
heading_order: "01"
document_index: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 1. Generation and continuation identity

> [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]

Canonical turns follow committed generation segments, not the number of stored or displayed messages. A Continue segment can share its visual message with an earlier segment while starting a new canonical turn. Give each segment an opaque ID, parent message ID, branch ID, source span, content revision/fingerprint, generation kind, active alternative/swipe lineage, and commit status. A retry cannot create a second committed segment for the same idempotency key.

Regeneration replaces the active alternative of the existing turn; editing changes its revision. A new Continue creates a new segment/turn. User replies attach to the preceding model-led turn. Rewinding or switching alternatives rebuilds affected participation counts, relationship cooldowns, memory source ranges, and worker cursors from the active lineage. A changed earlier span invalidates dependent later spans; character offsets alone are not identity.

Legacy imports without segment history receive one deterministic synthetic segment per stored model message, marked `legacy_segment_history_unknown`. Never invent historical Continue boundaries. Record the count limitation in the inspector, then track new generations normally. Phase 2 must test Continue within one displayed message, swipes, edits, and import/reload without double counting.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]
- Previous: [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]
- Next: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/02 Worker scheduling and forward progress|2. Worker scheduling and forward progress]]

- Source location: `ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md:5`
