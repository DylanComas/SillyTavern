---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md"
source_line: 29
heading_level: 2
heading_order: "04"
document_index: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 4. Cancellation and stale-job handling

> [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]

The existing provider backends commonly attach an `AbortController` to the client socket so an abandoned client request cancels the upstream fetch. The client generation services also accept abort signals. This is directly reusable for user cancellation, application shutdown, chat changes, and replacement of obsolete worker jobs.

Cancellation alone does not prevent a completed but stale result from committing. Every worker result still needs the revision and active-branch commit guard. A job discarded only because its source became stale is normal coalescing, not a worker failure and not a reason to trip the circuit breaker.

Evidence: `SIllyTavern Original/src/endpoints/backends/chat-completions.js:223-228`, `SIllyTavern Original/src/endpoints/backends/chat-completions.js:1692-1704`, and `SIllyTavern Original/public/scripts/custom-request.js:118-159,462-500`.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/03 Concurrent-overwrite protection|3. Concurrent-overwrite protection]]
- Next: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/05 Provider and local-runtime adapters|5. Provider and local-runtime adapters]]

- Source location: `ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md:29`
