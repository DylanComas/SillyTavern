---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md"
source_line: 62
heading_level: 2
heading_order: "05"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 5. Protection and validation

> [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]

Critical configuration is protected in layers:

- Factory Defaults are immutable through ordinary application APIs and UI.
- A strict schema rejects unknown or mistyped critical fields where silent acceptance would be unsafe.
- Semantic validation enforces relations such as Warning below Protection, legal context/output limits, compatible feature combinations, and valid enum values.
- Paths are normalized, resolved, and checked against approved application or user-data roots before use; a configured string is never trusted merely because it passed parsing.
- Feature flags and dangerous toggles declare their owner, default, dependencies, supported platforms, and fallback behavior.
- Invalid writable configuration is quarantined with a diagnostic explanation; the app loads the last valid user state or Factory Defaults without overwriting the damaged source.
- Atomic writes, checksums, backups, and migration snapshots protect writable settings.
- Production package signing and integrity checks detect accidental or external bundle modification, while documentation remains honest that locally controlled software can ultimately be altered by its operator.

Comments in the development source improve maintenance but are not enforcement. The schema, validators, tests, and use-site guards are authoritative.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/04 Changelog and behavioral record|4. Changelog and behavioral record]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/06 Logical settings ownership|6. Logical settings ownership]]

- Source location: `ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md:62`
