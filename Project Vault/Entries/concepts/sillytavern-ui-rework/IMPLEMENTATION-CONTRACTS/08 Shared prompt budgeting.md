---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md"
source_line: 79
heading_level: 2
heading_order: "08"
document_index: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 8. Shared prompt budgeting

> [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]

One planner owns the complete serialized prompt budget across all contributors. Reserve requested output and provider overhead first. Then account for mandatory instructions, required Character/Persona content, the current user request, explicit verbatim pins, and any user-declared required lore. Preserve established prompt ordering/activation semantics while the Lorebook compatibility decision is open; budget priority is not permission to reorder rules.

Within the remaining budget, admit valid Short Memory, required current-state anchors, the protected recent-prose window, and bounded long-term recall/research/relevance-only contributions according to their configured policies. Deduplicate the same source/fact where it appears in multiple layers. Display actual serialized cost by contributor, tokenizer identity, and estimation margin; never claim estimated token counts are exact.

If everything required cannot fit, block dispatch visibly and explain the contributors. Offer explicit remedies: reduce response reserve, choose a larger supported context/model, change protected-window settings, manually summarize eligible material, or unpin selected messages. Do not silently remove a pin, truncate a required message, drop required instructions, or send a malformed oversized request. Optional recall/research can be reduced within its agreed budgets and must be visible in the inspector.

Short Memory jobs may run asynchronously while the complete raw range still fits. Failed/pending summarization keeps the previous valid summary, unprocessed source, and cursor intact. If context pressure prevents a safe request, show the unresolved memory job and the same explicit resolution choices. Waiting for required context repair is separate from the rule that ordinary State Worker tracking never delays roleplay.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/07 Provider quota authority|7. Provider quota authority]]
- Next: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/09 Short Memory baseline proposal|9. Short Memory baseline proposal]]

- Source location: `ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md:79`
