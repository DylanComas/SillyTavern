---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md"
source_line: 65
heading_level: 2
heading_order: "08"
document_index: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 8. Retry behavior

> [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]

SillyTavern has isolated retries for particular services, such as a fixed retry loop for busy KoboldAI requests and a streaming-to-non-streaming fallback in one Connection Manager command. The main chat-completion and custom request services generally make one request, propagate an error, and rely on the caller or user to decide what happens next.

There is no generalized provider-aware policy that distinguishes transient transport errors, rate limits, permanent authentication or quota failures, malformed structured output, stale work, and semantic validation failures. The State Worker therefore needs its own small retry classifier. It should respect `Retry-After`, use bounded jittered backoff for transient transport failures, avoid retrying permanent failures, and route malformed-but-current output through one deterministic repair attempt rather than an indiscriminate repeat.

Evidence: `SIllyTavern Original/src/endpoints/backends/kobold.js:93-140`, `SIllyTavern Original/public/scripts/extensions/connection-manager/index.js:607-650`, `SIllyTavern Original/public/scripts/extensions/shared.js:419-486`, and `SIllyTavern Original/src/endpoints/backends/chat-completions.js:2590-2628`.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/07 Usage and subscription reporting|7. Usage and subscription reporting]]
- Next: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/09 Streaming presentation|9. Streaming presentation]]

- Source location: `ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md:65`
