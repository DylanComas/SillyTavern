---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md"
source_line: 386
heading_level: 2
heading_order: "09"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 9. Native Dialogue Colorizer

> [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]

Dialogue color is application-owned Visual-only state stored on the stable Character Bank identity.

The product supports exactly two dialogue-format modes:

1. **Name label:** spoken dialogue begins with `Name:`. The native parser resolves the name through aliases and applies the Character Bank color.
2. **Novel dialogue:** ordinary quoted prose and dialogue tags are preserved without visible speaker labels.

Speaker parsing fails safely. Ambiguous colons, headings, times, and prose are not treated as characters.

## Subsections

- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/09.01 Novel-dialogue attribution|9.1 Novel-dialogue attribution]]
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/09.02 Color controls|9.2 Color controls]]

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/08.06 Lorebook Entry link|8.6 Lorebook Entry link]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/09.01 Novel-dialogue attribution|9.1 Novel-dialogue attribution]]

- Source location: `ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md:386`
