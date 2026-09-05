---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT.md"
source_line: 9
heading_level: 2
heading_order: "01"
document_index: "[[Sources/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 1. Executive conclusion

> [[Sources/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT|Scene State and Tracker Foundation Audit]]

Neither extension should be integrated wholesale.

The first-release product should implement a native **Scene State engine** for fanfiction-style roleplay continuity. Horae is the stronger product reference for what that state should describe. Multihog is the stronger engineering reference for how a separate State Worker should update, isolate, recover, and persist it safely.

The recommended foundation is therefore:

- cleanly reimplement Horae-inspired qualitative tracker domains;
- adapt Multihog-inspired State Worker orchestration, per-chat isolation, commit guards, history, and recovery patterns;
- store typed state and typed change events rather than model-authored tag blocks;
- keep Scene State confined to ongoing tracking and Persistent Scene Memory, then extract a smaller fixed **Scene Details** record for each Long Memory entry;
- defer DnD mechanics to an optional Playing Mode after the first final release.

Horae cannot currently be used as a direct code source because its snapshot contains no declared license. Its concepts can guide independent design, but code should not be copied unless licensing or permission is established. Multihog declares GPL-3.0-or-later and can be studied or reused only with the required attribution, source, and compatibility obligations reviewed for the final distribution.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT|Scene State and Tracker Foundation Audit]]
- Previous: [[Sources/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT|Scene State and Tracker Foundation Audit]]
- Next: [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/02 Audit scope and snapshots|2. Audit scope and snapshots]]

- Source location: `ST-UI/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT.md:9`
