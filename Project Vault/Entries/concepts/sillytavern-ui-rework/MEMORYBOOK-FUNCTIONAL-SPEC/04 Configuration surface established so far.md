---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC.md"
source_line: 112
heading_level: 2
heading_order: "04"
document_index: "[[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 4. Configuration surface established so far

> [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC|Memorybook Functional Specification]]

The following settings are required, although their exact defaults and screen placement are not yet decided:

| Setting | Required choices or behavior |
| --- | --- |
| Automatic Short Memory | On or off |
| Trigger mode | Token interval or turn interval |
| Trigger threshold | Configurable positive token or turn count |
| Recent-context buffer | Configurable amount of newest conversation kept verbatim; default is 10 canonical turns |
| Turn compression batch | Configurable number of oldest eligible turns processed together; default is 3 |
| Manual summarization | Available regardless of automatic mode |
| Summarization generation profile | Uses a selectable shared NanoGPT Generation Settings profile without duplicating credentials |
| Summarization prompt | Editable under Advanced, with a restorable product default |
| Injection budget and placement | Configurable under Advanced and visible in the context inspector |
| Revision retention | Configurable history for replaced summaries, within safe storage limits |

Changing a trigger mode or threshold must not silently discard existing summaries or move a processed boundary. The application will preview the effect and either continue from the existing valid boundary or offer an explicit rebuild.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC|Memorybook Functional Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/03.06 Batch safety|3.6 Batch safety]]
- Next: [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/05 Decisions recorded|5. Decisions recorded]]

- Source location: `ST-UI/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC.md:112`
