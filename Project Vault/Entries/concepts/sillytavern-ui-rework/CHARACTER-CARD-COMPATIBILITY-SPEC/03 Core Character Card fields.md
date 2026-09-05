---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_line: 28
heading_level: 2
heading_order: "03"
document_index: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 3. Core Character Card fields

> [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]

The reference card demonstrates the complete V2-era core used by SillyTavern:

| Area | Fields |
| --- | --- |
| Identity/content | `name`, `description`, `personality`, `scenario`, `first_mes`, `mes_example` |
| Creator metadata | `creator_notes`, `creator`, `character_version`, `tags` |
| Prompt overrides | `system_prompt`, `post_history_instructions` |
| Conversation openings | `alternate_greetings` |
| Extensibility | `extensions` |
| Embedded knowledge | optional `character_book` |

Character Card V3 additionally defines optional assets, nickname, multilingual creator notes, source records, creation/modification timestamps, and the required `group_only_greetings` array. An import may omit these fields or carry a later minor V3 version; missing known fields receive runtime defaults without rewriting the preserved source merely because it was opened.

The rework tracks empty, absent, and `null` distinctly. Some tools use them differently, and collapsing them during import would damage round-trip fidelity.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/02 Observed card envelope|2. Observed card envelope]]
- Next: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/04 SillyTavern extension fields in the fixture|4. SillyTavern extension fields in the fixture]]

- Source location: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md:28`
