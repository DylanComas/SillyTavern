---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT.md"
source_line: 332
heading_level: 2
heading_order: "08"
document_index: "[[Sources/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 8. Required implementation invariants

> [[Sources/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT|Scene State and Tracker Foundation Audit]]

The following are release requirements, not optional refinements:

1. A State Worker result can commit only to the exact chat, branch, source revision, schema version, and expected state revision that launched it.
2. Newer work aborts or supersedes older work deterministically.
3. Empty values have explicit semantics; clearing the scene cast, location, or another field must not be confused with no change.
4. Model output is structurally validated before any state mutation.
5. Manual corrections are first-class events with provenance and survive replay.
6. Edits, deletions, swipes, regeneration, and branches invalidate or replay dependent tracker changes predictably.
7. Failed tracking never blocks ordinary chat generation.
8. Prompt injection uses a budgeted projection of state, not the complete database.
9. Secrets and provider selection live in the application's shared NanoGPT connection layer.
10. Scene Details are independently extracted, fixed, attributable to their source range, and contain no live Scene State or tracker history.
11. Visual presentation reads application state and never requires the roleplay model to emit HTML, CSS, colors, meters, or tracker cards.
12. Each tracker declares an explicit model-delivery policy: Visual-only, On change, When relevant, or Always current.
13. Dialogue color belongs to a stable Character Bank identity and never to model-generated markup.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT|Scene State and Tracker Foundation Audit]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/07.04 Inheritance and ownership|7.4 Inheritance and ownership]]
- Next: [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/09 Verification performed|9. Verification performed]]

- Source location: `ST-UI/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT.md:332`
