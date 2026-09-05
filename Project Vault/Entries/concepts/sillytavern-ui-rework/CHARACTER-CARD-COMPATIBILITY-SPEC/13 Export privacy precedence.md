---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_line: 152
heading_level: 2
heading_order: "13"
document_index: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 13. Export privacy precedence

> [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]

Apply safety limits and app-owned/recognized-private-field exclusions first, then the chosen target's structural conversion, then the user's explicit field-selection choices. Preserve Source never bypasses the privacy exclusions. Unknown vendor fields remain preserved where safe and representable, with an Advanced export preview/removal control and a warning that their meaning is not automatically privacy-classified. Do not promise semantic detection of secrets hidden inside arbitrary prose or extensions.

Strict V2/V3 exports disclose required-default repairs, conversion loss, and filtered fields before writing. Preserve Source discloses filtering without falsely promising byte-identical or strictly valid output. Phase 8 fixtures must cover unknown nested metadata, recognized private fields, secrets inside an opaque vendor field, mixed-version root/data conflicts, and strict versus preservation targets. Tests use synthetic cards, not the user's private fixture as a distributable asset.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/12 Audit findings and remaining confirmation|12. Audit findings and remaining confirmation]]
- Next: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/14 Multi-character identity seeding|14. Multi-character identity seeding]]

- Source location: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md:152`
