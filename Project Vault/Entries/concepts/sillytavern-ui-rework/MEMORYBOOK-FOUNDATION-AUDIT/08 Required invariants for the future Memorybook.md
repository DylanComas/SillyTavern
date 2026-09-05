---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT.md"
source_line: 367
heading_level: 2
heading_order: "08"
document_index: "[[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 8. Required invariants for the future Memorybook

> [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT|Memorybook Foundation Audit]]

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

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT|Memorybook Foundation Audit]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/07.03 Reject from the new foundation|Reject from the new foundation]]
- Next: [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/09 Foundation recommendation|9. Foundation recommendation]]

- Source location: `ST-UI/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT.md:367`
