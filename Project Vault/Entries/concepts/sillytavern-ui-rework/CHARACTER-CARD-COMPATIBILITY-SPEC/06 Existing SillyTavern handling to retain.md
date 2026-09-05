---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_line: 67
heading_level: 2
heading_order: "06"
document_index: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 6. Existing SillyTavern handling to retain

> [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]

The fork already provides useful compatibility behavior:

- imports legacy V1-shaped JSON, V2/V3 JSON, PNG card metadata, YAML, CharX, and BYAF through format-specific paths;
- keeps the raw JSON in `json_data` while editing understood fields, then deep-merges extension data so foreign keys are not intentionally discarded;
- reads PNG `ccv3` metadata before `chara` when both chunks exist;
- writes card metadata into PNG and supports JSON export;
- imports embedded Character Books and CharX assets;
- removes explicitly private/local values such as current chat and favorite state from shared exports;
- uses atomic writes for card PNG persistence.

These are foundations, not a verbatim implementation requirement. The rework should correct ambiguous version classification, incomplete V3 validation, true V2 fallback generation, asset round-trip gaps, and any edit path that reconstructs an object from only known fields.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/05 Embedded Character Book structure|5. Embedded Character Book structure]]
- Next: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/07 Compatibility import contract|7. Compatibility import contract]]

- Source location: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md:67`
