---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_line: 136
heading_level: 2
heading_order: "11"
document_index: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 11. Security and privacy boundary

> [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]

Character Cards and library downloads are untrusted packages. Import applies decompression and size ceilings, JSON nesting/member limits, image decoding limits, normalized archive paths, MIME/signature checks, URL-scheme restrictions, and safe filename generation. CharX extraction prevents traversal and never executes embedded files.

Macros and prompt fields are evaluated only during explicit prompt construction under the prompt system's rules. Regex scripts remain disabled or compatibility-only until explicitly trusted according to the later extension policy. HTML is sanitized for display, remote assets do not load invisibly, and opening a source URL requires a visible user action.

The Library records source and license/attribution metadata where supplied. It must not remove upstream provenance merely to make a card appear locally authored.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/10 Portable versus app-local metadata proposal|10. Portable versus app-local metadata proposal]]
- Next: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/12 Audit findings and remaining confirmation|12. Audit findings and remaining confirmation]]

- Source location: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md:136`
