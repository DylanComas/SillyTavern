---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md"
source_line: 33
heading_level: 2
heading_order: "03"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 3. Authoritative state

> [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]

Each chat branch owns:

- a typed current Scene State snapshot;
- a validated state-event ledger;
- periodic recovery checkpoints;
- a Character Bank with stable identities and aliases;
- tracker configuration and model-delivery policies;
- the State Worker cursor and generation version.

New chats may inherit configuration but start with no previous-chat values or automatically discovered NPC records. Existing chats restore their exact Scene State, Character Bank, colors, relationships, history, and worker cursor. Branches share history only up to the branch point.

## Subsections

- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/03.01 Story Continuity Profile|3.1 Story Continuity Profile]]

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/02.04 Configurable without becoming a control wall|Configurable without becoming a control wall]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/03.01 Story Continuity Profile|3.1 Story Continuity Profile]]

- Source location: `ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md:33`
