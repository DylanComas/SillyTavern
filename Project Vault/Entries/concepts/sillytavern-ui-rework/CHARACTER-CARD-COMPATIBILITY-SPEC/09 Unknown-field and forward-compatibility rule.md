---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_line: 111
heading_level: 2
heading_order: "09"
document_index: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 9. Unknown-field and forward-compatibility rule

> [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]

Unknown data is first-class preserved data. The application may ignore it at runtime, but import, save, and export keep it unless the user removes it, privacy/safety filtering requires exclusion, or the target cannot represent it. Filtering or conversion loss is disclosed before export. Opaque semantics are not automatically classified for privacy.

Cards declaring a newer minor V3 specification remain importable with a visible compatibility notice. The editor exposes known fields normally and offers a read-only structured view of preserved unknown data under Advanced. It does not rewrite the declared specification version merely because the card was opened.

Application-specific fields belong only under `data.extensions` or a CharX application-data file, never as invented top-level specification fields. Namespaces are versioned and collision-resistant once the final product identifier exists.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/08 Compatibility export contract|8. Compatibility export contract]]
- Next: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/10 Portable versus app-local metadata proposal|10. Portable versus app-local metadata proposal]]

- Source location: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md:111`
