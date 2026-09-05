---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md"
source_line: 110
heading_level: 2
heading_order: "08"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 8. Phase 1 decision

> [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]

Settings versioning and ownership are complete for Phase 1. The accepted contract uses **Factory Defaults** for the compiled developer baseline and **Default Settings** for the user's pinned Generation Settings file; records independent application, settings-schema, and Factory Defaults revisions; validates and promotes developer configuration before compilation; applies the field-aware ownership table; and uses Save to replace current user settings while Export creates a separate file.

Exact filenames, serialization library, schema technology, backup retention count, and promotion command are architecture and implementation decisions. They must preserve this contract but do not keep product definition open.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/07 User Save and Export contract|7. User Save and Export contract]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/09 Resolved values and mutable references|9. Resolved values and mutable references]]

- Source location: `ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md:110`
