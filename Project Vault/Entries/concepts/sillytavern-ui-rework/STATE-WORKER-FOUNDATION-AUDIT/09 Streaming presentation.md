---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md"
source_line: 73
heading_level: 2
heading_order: "09"
document_index: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 9. Streaming presentation

> [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]

SillyTavern supports genuine provider streaming, but it also contains an optional Smooth Streaming transform that deliberately delays chunks for a gradual display effect. That presentation behavior is not part of the rework baseline.

Genuine provider streaming may display tokens as they arrive when the user enables it. A response that arrived complete is rendered immediately and in full; the app never meters out an already-complete message. State Worker output is not prose presentation: it remains hidden until the complete proposal validates and commits atomically.

Evidence: `SIllyTavern Original/public/scripts/sse-stream.js:340-386`, `SIllyTavern Original/public/script.js:5328-5382`, and `SIllyTavern Original/public/scripts/custom-request.js:503-530`.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/08 Retry behavior|8. Retry behavior]]
- Next: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/10 Reuse and replacement map|10. Reuse and replacement map]]

- Source location: `ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md:73`
