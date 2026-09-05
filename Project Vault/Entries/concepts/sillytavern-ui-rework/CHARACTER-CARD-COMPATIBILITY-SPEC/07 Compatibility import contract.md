---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_line: 81
heading_level: 2
heading_order: "07"
document_index: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 7. Compatibility import contract

> [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]

Import follows a tolerant, evidence-preserving pipeline:

1. identify the container independently from the card specification;
2. parse with size, depth, archive, path, and resource limits;
3. select declared V3 or V2 semantics before V1 fallback instead of testing V1 root mirrors first;
4. validate known fields and create normalized runtime defaults for missing optional or ecosystem-common fields;
5. preserve the complete original object, unknown fields, unknown extensions, original scalar types, ordering where practical, and source fingerprint;
6. record warnings and conflicts without rejecting an otherwise usable card;
7. reject only structurally unusable or unsafe input, and explain the precise reason;
8. apply user edits as targeted field patches over the preserved envelope;
9. never execute regex, HTML, URLs, assets, macros, or prompt text during import.

Import adapters for Character Library sources all terminate at this same pipeline. A source-specific adapter may add provenance but may not silently invent, flatten, or discard card fields.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/06 Existing SillyTavern handling to retain|6. Existing SillyTavern handling to retain]]
- Next: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/08 Compatibility export contract|8. Compatibility export contract]]

- Source location: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md:81`
