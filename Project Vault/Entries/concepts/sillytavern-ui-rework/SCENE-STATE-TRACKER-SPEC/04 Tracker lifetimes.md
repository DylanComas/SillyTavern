---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md"
source_line: 59
heading_level: 2
heading_order: "04"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 4. Tracker lifetimes

> [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]

Every tracker declares a lifetime independently from how it is displayed or sent to a model.

| Lifetime | Behavior | Initial candidates |
| --- | --- | --- |
| Persistent | Carries forward until explicitly changed or cleared | Fandom/Crossover/Era/AU profile, clothing, disguise, visible condition |
| Progressive | Carries forward and normally advances | Date and time |
| Scene-bound | Replaced or explicitly cleared when the scene changes | Location and characters present now |
| Volatile | Re-evaluated when evidence changes; retires only for an evidenced or manual semantic reason | Mood and current activity |
| Manual lock | Automatic workers cannot modify the value until unlocked | Any user-corrected field |

Omission always means **no change**. Set, replace, add, remove, clear, expire, and lock are explicit operations. Empty cast and unknown location are valid explicit states.

Here, expire means evidence-based semantic retirement, never age-, turn-, relevance-, or probability-based decay. Scene-bound fields are reconciled at boundaries, not erased just because a new scene began. Persistent Scene Memory retains the last supported value until replacement, invalidation, or explicit clearing.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/03.01 Story Continuity Profile|3.1 Story Continuity Profile]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/05 Model-delivery policies|5. Model-delivery policies]]

- Source location: `ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md:59`
