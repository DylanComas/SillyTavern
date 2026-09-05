---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md"
source_line: 37
heading_level: 2
heading_order: "05"
document_index: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 5. Provider and local-runtime adapters

> [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]

SillyTavern already has a Connection Manager request service that applies a saved profile and dispatches either chat-completion or text-completion requests. Its provider registries cover the broad compatibility surface already presented by SillyTavern, including NanoGPT, OpenAI-compatible custom endpoints, OpenRouter, Claude, Google, Mistral, local `llama.cpp`, Ollama, KoboldCpp, and other text-generation backends.

The State Worker should consume these registries through a narrow worker-provider adapter instead of maintaining a second hard-coded provider list. Local managed inference uses an app-owned `llama.cpp` process or library, while a user-selected external GGUF or server remains reachable through the same adapter boundary.

The earlier recommendation is not evidence of an independent backend: the historical service depends on browser context, profile registries, and extension services. The rework must provide explicit immutable request inputs, platform-owned credentials, and concurrency tests. Do not wire the new worker directly to mutable active-chat settings or claim Electron/Android portability without the Phase 2 adapter spike.

Evidence: `SIllyTavern Original/public/scripts/extensions/shared.js:385-487`, `SIllyTavern Original/public/scripts/openai.js:175-202`, and `SIllyTavern Original/public/scripts/textgen-settings.js:31-47`.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/04 Cancellation and stale-job handling|4. Cancellation and stale-job handling]]
- Next: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/06 Structured output support|6. Structured output support]]

- Source location: `ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md:37`
