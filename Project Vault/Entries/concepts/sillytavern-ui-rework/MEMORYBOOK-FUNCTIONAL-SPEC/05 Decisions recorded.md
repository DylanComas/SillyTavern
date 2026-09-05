---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC.md"
source_line: 131
heading_level: 2
heading_order: "05"
document_index: "[[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 5. Decisions recorded

> [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC|Memorybook Functional Specification]]

| ID | Decision | Status |
| --- | --- | --- |
| `MEM-001` | Short Memory is derived, compact, injected, and replaceable; Long Memory is durable and not silently rewritten. | Agreed |
| `MEM-002` | Memorybook settings are configurable, use clear defaults, and place detailed controls under Advanced. | Agreed |
| `MEM-003` | Automatic Short Memory supports token-interval and roleplay-turn-interval modes. | Agreed |
| `MEM-004` | Every committed model message starts/increments a turn; following user messages belong to that turn. | Agreed |
| `MEM-005` | Continue generations create new turns; regeneration and swipe alternatives retain the existing turn identity. | Agreed interpretation |
| `MEM-006` | Threshold progress advances only after a valid summary is safely committed. | Agreed foundation invariant |
| `MEM-007` | The default verbatim ceiling is 10 canonical turns and the default turn-compression batch is 3, preserving Summaryception's approximately 8–10-turn rolling raw window. | Agreed |
| `MEM-008` | Summaryception's recursive layer-count defaults are not inherited until the replacement compression model is defined and bounded. | Agreed |

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC|Memorybook Functional Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/04 Configuration surface established so far|4. Configuration surface established so far]]
- Next: [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/06 Next decisions|6. Next decisions]]

- Source location: `ST-UI/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC.md:131`
