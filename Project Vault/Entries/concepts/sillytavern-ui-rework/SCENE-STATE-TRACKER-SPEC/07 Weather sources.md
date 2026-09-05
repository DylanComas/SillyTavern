---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md"
source_line: 205
heading_level: 2
heading_order: "07"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 7. Weather sources

> [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]

Weather remains a pluggable state source independent from its Static or Animated presentation. It supports three initial source modes:

1. **Off/manual:** no automatic source; the user or deterministic event changes it.
2. **In-universe:** the State Worker extracts or proposes fictional weather from narration.
3. **Real-world linked:** OpenWeather updates state from an explicitly selected real location.

Changing the source does not change the two available GFX levels. Fictional and real-world weather normalize into the same application-owned condition vocabulary.

## Subsections

- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/07.01 OpenWeather provider|7.1 OpenWeather provider]]
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/07.02 Location and provider privacy boundary|7.2 Location and provider privacy boundary]]
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/07.03 Normalization and model delivery|7.3 Normalization and model delivery]]
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/07.04 OpenWeather attribution and distribution gate|7.4 OpenWeather attribution and distribution gate]]

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/06.03 Cast panel|6.3 Cast panel]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/07.01 OpenWeather provider|7.1 OpenWeather provider]]

- Source location: `ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md:205`
