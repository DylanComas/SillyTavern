---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_line: 17
heading_level: 2
heading_order: "02"
document_index: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 2. Observed card envelope

> [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]

The reference card has four structural layers:

1. **Legacy root mirror:** `name`, `description`, `personality`, `scenario`, `first_mes`, `mes_example`, `creatorcomment`, `avatar`, `talkativeness`, `fav`, `tags`, and `create_date` support older SillyTavern and V1-style consumers.
2. **Specification discriminator:** `spec` and `spec_version` declare Character Card V3.
3. **Canonical data object:** `data` contains the modern character fields, prompts, greetings, creator metadata, extensions, and embedded Character Book.
4. **Vendor and feature extensions:** `data.extensions` and each Character Book entry's `extensions` object contain SillyTavern behavior and provide room for unknown third-party metadata.

For a declared V2 or V3 card, `data` is the canonical semantic source. Root mirrors are compatibility projections and may disagree because another application edited only one representation. The importer records such conflicts and uses explicit specification precedence rather than silently treating the root mirror as authoritative.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/01 Audited reference card|1. Audited reference card]]
- Next: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/03 Core Character Card fields|3. Core Character Card fields]]

- Source location: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md:17`
