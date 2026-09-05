---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_line: 59
heading_level: 2
heading_order: "05"
document_index: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 5. Embedded Character Book structure

> [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]

The reference `data.character_book` has a `name` and three `entries`. Each entry contains `id`, primary and secondary keys, a display comment, content, constant/selective flags, insertion order, enabled state, prompt position, regex mode, and a large SillyTavern extension object.

Observed entry-extension fields include display order, probability, recursion controls, scan depth, word/case matching, selective logic, group behavior, role/depth placement, sticky/cooldown/delay behavior, matching against Character or Persona fields, triggers, vectorization, automation ID, outlet name, and budget bypass. Most will be hidden in the simplified Lorebook interface, but none may be deleted merely because the new UI does not expose them.

The reference book lacks a top-level `extensions` object required by the formal V2/V3 Lorebook shape. Tolerant import supplies an empty runtime default while preserving the original omission. Strict V3 export adds required structural defaults after showing any compatibility repair in the export summary.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/04 SillyTavern extension fields in the fixture|4. SillyTavern extension fields in the fixture]]
- Next: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/06 Existing SillyTavern handling to retain|6. Existing SillyTavern handling to retain]]

- Source location: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md:59`
