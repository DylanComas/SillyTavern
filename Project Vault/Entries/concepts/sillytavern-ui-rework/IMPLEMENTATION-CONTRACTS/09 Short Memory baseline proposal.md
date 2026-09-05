---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md"
source_line: 89
heading_level: 2
heading_order: "09"
document_index: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 9. Short Memory baseline proposal

> [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]

The accepted 10-turn verbatim ceiling and three-turn compression batch stay unchanged. The following resolves audit A07 as a concrete proposal for confirmation before Phase 1 exit; it is not silently promoted to an accepted product decision.

| Behavior | Proposed initial default |
| --- | --- |
| Trigger | Turn-based verbatim-pressure trigger: crossing ten raw canonical turns makes the oldest three eligible, matching the existing approximately 8–10-turn window |
| Compression | One bounded rolling summary plus recent raw prose; Summaryception's separate recursive-layer defaults are not inherited |
| Scheduling | Background processing after committed evidence becomes eligible; no pre-creation review |
| Token-interval mode | Optional threshold remains configurable; only eligible unprotected source is summarized |
| Oversized protected window | A separate hard context-pressure path invokes the planner's visible block/remedy behavior; it does not override protection silently |
| Pending/failure | Keep raw evidence and last valid summary; never advance the processed cursor on a failed or stale job |
| Ownership | Application default → reusable Memorybook configuration → explicit chat override, with inspectable provenance |

Exact summary output size, revision-history count, and tokenizer implementation are measured implementation defaults. Whether users may switch the protected-window unit to tokens remains a separate advanced-control decision. This proposal must be settled together with pressure behavior rather than declaring Short Memory behaviorally complete.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/08 Shared prompt budgeting|8. Shared prompt budgeting]]
- Next: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/10 Progressive configuration delivery|10. Progressive configuration delivery]]

- Source location: `ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md:89`
