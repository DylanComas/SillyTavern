---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md"
source_line: 94
heading_level: 2
heading_order: "07"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 7. User Save and Export contract

> [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]

The rework keeps SillyTavern's direct Save/Export mental model rather than introducing Save As or user-facing immutable revisions:

- **Save** atomically rewrites the currently selected writable user settings file or managed settings object.
- **Export** writes a new portable file chosen by the user and does not silently change which settings are active.
- **Import** validates and previews a portable file before copying or applying it to managed user settings; it never writes into Factory Defaults.
- Factory Defaults are never a writable Save target. A user settings document is seeded from them when no writable document exists.
- If the selected Generation Settings file is pinned as Default Settings, Save updates that same pinned file. The UI identifies it as the active default so the consequence is visible without adding a confirmation to every save.
- Before replacement, Save creates an automatic recoverable snapshot and uses a temporary file plus atomic rename. Recovery history is an implementation safeguard, not a separate user-facing version system.
- Export includes its schema version, stable object identity where applicable, compatibility metadata, and no secrets unless a separate explicit encrypted-secret export is designed later.
- Revert to Default Settings loads the current contents of the pinned file into the active chat without modifying Character Defaults, Persona Defaults, other saved configurations, or chat history.
- Import, export, backup, and migration preserve names, pins, associations, and stable references; collisions require an explicit replace, merge, or imported-copy result.

Save and Export are distinct actions in the UI. Export is the route for creating another file; Save is deliberately simple and replaces the selected writable settings.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/06 Logical settings ownership|6. Logical settings ownership]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/08 Phase 1 decision|8. Phase 1 decision]]

- Source location: `ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md:94`
