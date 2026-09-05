---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md"
source_line: 75
heading_level: 2
heading_order: "05"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 5. Model-delivery policies

> [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]

Every tracker independently chooses one of four policies:

| Policy | Model behavior | Intended use |
| --- | --- | --- |
| Visual-only | Never enters model context | Dialogue color, animation choice, decorative state |
| On change | Included after a validated change and again at defined re-anchor boundaries | Time phase, location, ambient weather, and non-critical visual changes |
| When relevant | Retrieved when the scene, character, action, or explicit cue requires it | Character dossiers, relationships, clothing details |
| Always current | A minimal current value appears in every relevant roleplay request | Critical continuity such as present cast or the Story Continuity Profile when enabled |

The default policy is chosen per built-in tracker and remains configurable. The context inspector shows exactly which values were included and why.

On-change delivery avoids a duplicate tracker line only while the current fact is demonstrably represented in the assembled request. Re-anchor when it is absent, even if it was sent on an earlier request. A manual Time Skip may have no prose evidence and therefore need repeated compact anchoring. Provider caching can affect billing, not this representation requirement. See [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/04 Request-aware On-change delivery|request-aware delivery]].

## Subsections

- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/05.01 Location delivery|5.1 Location delivery]]
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/05.02 Time-phase delivery|5.2 Time-phase delivery]]

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/04 Tracker lifetimes|4. Tracker lifetimes]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/05.01 Location delivery|5.1 Location delivery]]

- Source location: `ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md:75`
