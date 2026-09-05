---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md"
source_line: 9
heading_level: 2
heading_order: "01"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 1. Terminology boundary

> [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]

Two different concepts must not share the same name:

- **Factory Defaults** are the developer-authored, application-owned safe baseline shipped with a particular build. Normal application use cannot overwrite them.
- **Default Settings** remains the user-selected, pinned Generation Settings file used for new-chat fallback and the existing **Revert to Default Settings** action.

The recovery action that deliberately ignores the user's pinned bundle is therefore named **Restore Factory Defaults**. It is separate, explains the affected scope, and never deletes chats, characters, personas, Lorebooks, Memorybooks, or reusable settings files.

Packaging Factory Defaults inside an Electron module makes them inaccessible to ordinary settings writes, but it does not make them secret or impossible for a determined user to unpack. Correctness and safety depend on read-only application boundaries, validation, constrained paths, and package integrity rather than obscurity.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]
- Previous: [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/02 Version identities|2. Version identities]]

- Source location: `ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md:9`
