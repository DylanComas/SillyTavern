---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md"
source_line: 116
heading_level: 2
heading_order: "09"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 9. Resolved values and mutable references

> [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]

Exact chat restoration requires the saved resolved generation values and complete effective preset rules/switches, not just IDs pointing at editable files. Store referenced IDs, revisions/content hashes, and the resolved values needed to rebuild that chat's generation request. Saving a reusable preset or Generation Settings file must not silently change another existing chat's resolved snapshot. Explicitly loading it into a chat adopts the new values. This is internal reproducibility, not the rejected user-facing immutable settings system.

Reusable Character/Persona prose and Lorebook content are a separate policy question. The current Lorebook shortcut permits normal edits to affect later context; do not claim that this is a historical content snapshot. Before Phase 1 closes, confirm whether those linked resources follow current edits with a changed-content notice or use retained revisions with explicit adoption. Keep reference identities and revision evidence in either case, and retain deleted-reference repair behavior.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/08 Phase 1 decision|8. Phase 1 decision]]

- Source location: `ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md:116`
