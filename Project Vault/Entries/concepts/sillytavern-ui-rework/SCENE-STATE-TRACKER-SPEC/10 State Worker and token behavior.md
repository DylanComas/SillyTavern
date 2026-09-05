---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md"
source_line: 424
heading_level: 2
heading_order: "10"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 10. State Worker and token behavior

> [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]

The roleplay model never generates the visual tracker UI. When State Worker functions are enabled, the selected local or API worker receives only unprocessed messages and the relevant current subset, then returns schema-validated changes. Users may disable model-managed tracker functions during setup; deterministic and manual tracker functions remain usable.

Recommended cadence options are:

- every committed model message;
- every roleplay turn;
- every configurable number of turns;
- only after deterministic change signals;
- manual only.

Critical rules:

- jobs never block normal chat;
- late results cannot commit across chats, branches, source revisions, schemas, or state revisions;
- an unchanged result creates no delta payload, but cannot suppress an independently required context re-anchor;
- visual-only changes create no model payload;
- change-only payloads are concise and deduplicated against the actual assembled request, not merely a sent-once flag;
- field-level relevance retrieval replaces full Character Bank dossier injection;
- every model-facing contribution appears in the context inspector with its token cost.

## Subsections

- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/10.01 Provider-aware usage protection|10.1 Provider-aware usage protection]]

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/09.02 Color controls|9.2 Color controls]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/10.01 Provider-aware usage protection|10.1 Provider-aware usage protection]]

- Source location: `ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md:424`
