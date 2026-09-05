---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC.md"
source_line: 144
heading_level: 2
heading_order: "06"
document_index: "[[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 6. Next decisions

> [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC|Memorybook Functional Specification]]

The next Short Memory design pass must establish:

Audit A07 confirmed that this is a Phase 1 behavior gap, not merely later tuning. The [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/09 Short Memory baseline proposal|baseline proposal]] consolidates the choices below; the [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/08 Shared prompt budgeting|shared prompt planner]] supplies mandatory no-silent-loss and overflow requirements. Confirm rolling versus layered compression and pressure behavior before the exit review.

1. whether the active trigger applies globally, through reusable configurations, per chat, or all three through inheritance;
2. the default trigger mode and threshold;
3. whether Advanced settings may change the recent raw-message buffer from its default turn measurement to tokens;
4. how token-triggered processing behaves when the protected 10-turn window itself exceeds the selected token threshold;
5. whether threshold crossing starts immediately, waits until idle, or asks for approval;
6. whether Short Memory uses one rolling summary, multiple bounded layers, or another bounded structure;
7. how many overwritten summary revisions are retained;
8. how token usage and NanoGPT cost are previewed and reported.

The Short Memory lifecycle remains in definition, but Long Memory and scene-continuity requirements can now be developed alongside it as long as their ownership remains separate.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC|Memorybook Functional Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/05 Decisions recorded|5. Decisions recorded]]
- Next: [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07 Long Memory retrieval direction|7. Long Memory retrieval direction]]

- Source location: `ST-UI/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC.md:144`
