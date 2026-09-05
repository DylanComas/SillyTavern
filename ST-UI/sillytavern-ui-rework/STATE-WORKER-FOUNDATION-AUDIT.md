# State Worker Reliability Foundation Audit

This audit identifies the SillyTavern mechanisms that can support the native State Worker and the parts that still require a dedicated implementation. It covers persistence, concurrency protection, cancellation, provider abstraction, structured output, usage reporting, retry behavior, and streaming presentation. The conclusion is to reuse several proven foundations without treating the existing generation path as a complete worker transaction system.

Historical evidence only: the 2026-09-05 correction updates this rework document, not the original application. The original and extension folders must not be inspected, tested, audited, or fixed. The [new implementation contracts](./IMPLEMENTATION-CONTRACTS.md) supersede assumptions about transport isolation, quota authority, and complete runtime readiness.

## 1. Executive finding

SillyTavern already provides useful low-level foundations: atomic file replacement, throttled backups, a chat-integrity guard, request cancellation, broad provider adapters, JSON-schema forwarding for many providers, direct `llama.cpp` compatibility, and NanoGPT subscription-usage detection. These materially reduce implementation risk.

It does not provide one generalized mechanism that makes background State Worker jobs branch-safe, idempotent, schema-and-semantics validated, retry-classified, and recoverable from an append-only history. The rework therefore reuses the foundations below and adds a dedicated worker coordinator and state store.

## 2. Atomic persistence and backups

SillyTavern uses `write-file-atomic` for chat, settings, presets, groups, World Info, secrets, cards, and several other persisted resources. Chat saving serializes the active chat and writes it through `tryWriteFileSync`; chat backups are separately throttled, timestamped, and pruned. Settings are also written atomically and periodically backed up.

The State Worker should reuse the same atomic-replacement foundation for compact snapshots and manifests. Its accepted history should be a separate append-only event log with checksums; normal chat backups alone are not a substitute for replayable tracker history.

Evidence: `SIllyTavern Original/src/util.js:1491-1497`, `SIllyTavern Original/src/endpoints/chats.js:41-77`, `SIllyTavern Original/src/endpoints/chats.js:457-467`, and `SIllyTavern Original/src/endpoints/settings.js:22-45,206-215`.

## 3. Concurrent-overwrite protection

SillyTavern gives each loaded chat an integrity identifier. Before saving, the server compares the identifier in memory with the first line of the file and refuses a mismatched overwrite unless the user explicitly forces it. This is a useful optimistic-concurrency pattern and protects against two open views overwriting each other.

The identifier is not a content checksum and does not prove that a worker result was computed from the active branch or current message revisions. The State Worker should extend the pattern with chat ID, branch ID, source message IDs and revisions, input-state revision, schema version, and a final pre-commit comparison.

Evidence: `SIllyTavern Original/src/endpoints/chats.js:311-334`, `SIllyTavern Original/src/endpoints/chats.js:457-465`, and `SIllyTavern Original/public/script.js:7336-7419`.

## 4. Cancellation and stale-job handling

The existing provider backends commonly attach an `AbortController` to the client socket so an abandoned client request cancels the upstream fetch. The client generation services also accept abort signals. This is directly reusable for user cancellation, application shutdown, chat changes, and replacement of obsolete worker jobs.

Cancellation alone does not prevent a completed but stale result from committing. Every worker result still needs the revision and active-branch commit guard. A job discarded only because its source became stale is normal coalescing, not a worker failure and not a reason to trip the circuit breaker.

Evidence: `SIllyTavern Original/src/endpoints/backends/chat-completions.js:223-228`, `SIllyTavern Original/src/endpoints/backends/chat-completions.js:1692-1704`, and `SIllyTavern Original/public/scripts/custom-request.js:118-159,462-500`.

## 5. Provider and local-runtime adapters

SillyTavern already has a Connection Manager request service that applies a saved profile and dispatches either chat-completion or text-completion requests. Its provider registries cover the broad compatibility surface already presented by SillyTavern, including NanoGPT, OpenAI-compatible custom endpoints, OpenRouter, Claude, Google, Mistral, local `llama.cpp`, Ollama, KoboldCpp, and other text-generation backends.

The State Worker should consume these registries through a narrow worker-provider adapter instead of maintaining a second hard-coded provider list. Local managed inference uses an app-owned `llama.cpp` process or library, while a user-selected external GGUF or server remains reachable through the same adapter boundary.

The earlier recommendation is not evidence of an independent backend: the historical service depends on browser context, profile registries, and extension services. The rework must provide explicit immutable request inputs, platform-owned credentials, and concurrency tests. Do not wire the new worker directly to mutable active-chat settings or claim Electron/Android portability without the Phase 2 adapter spike.

Evidence: `SIllyTavern Original/public/scripts/extensions/shared.js:385-487`, `SIllyTavern Original/public/scripts/openai.js:175-202`, and `SIllyTavern Original/public/scripts/textgen-settings.js:31-47`.

## 6. Structured output support

The current chat-completion backend translates a shared JSON-schema request into provider-specific structured-output formats for many services, usually requesting strict mode where the provider supports it. The text-generation path can pass JSON schema to Tabby and `llama.cpp`, and other backends expose guided JSON where supported. The custom request service parses returned JSON when a schema was requested.

This is a strong transport feature, but parsing JSON is not sufficient validation. The State Worker still needs a local authoritative validator for schema constraints, enums, sizes, provenance, tracker lifetimes, relationship quantization and cooldowns, identity references, and permitted operations. Provider-side strict output is an optimization and first defense, never the commit authority.

Evidence: `SIllyTavern Original/src/endpoints/backends/chat-completions.js:874-883,2542-2550`, `SIllyTavern Original/public/scripts/custom-request.js:489-493`, and `SIllyTavern Original/public/scripts/textgen-settings.js:1594-1692`.

## 7. Usage and subscription reporting

The fork already has a NanoGPT endpoint that checks both pay-as-you-go balance and subscription usage. When the subscription is active, it normalizes the authoritative weekly and daily token buckets, their limits, percent used, remaining amount, and reset time. The current UI can display that subscription state and weekly token usage.

This gives the rework a concrete detection path for the 60-million-token weekly plan: it applies only when NanoGPT is the selected worker or roleplay provider and the endpoint reports an active subscription with a valid weekly limit. Other providers require capability-based accounting rather than invented limits.

Audit correction: this is historical field-discovery evidence, not a safe quota authority. The handoff identified null-to-zero coercion and coupled partial failures. The new rework must preserve Unknown/freshness, independent endpoint outcomes, daily and weekly units, request reservations, and explicit overage policy as specified in the quota contract. No original endpoint was fixed as part of the final in-scope work.

Evidence: `SIllyTavern Original/src/endpoints/nanogpt.js:19-33,36-100` and `SIllyTavern Original/public/scripts/secrets.js:1204-1289`.

## 8. Retry behavior

SillyTavern has isolated retries for particular services, such as a fixed retry loop for busy KoboldAI requests and a streaming-to-non-streaming fallback in one Connection Manager command. The main chat-completion and custom request services generally make one request, propagate an error, and rely on the caller or user to decide what happens next.

There is no generalized provider-aware policy that distinguishes transient transport errors, rate limits, permanent authentication or quota failures, malformed structured output, stale work, and semantic validation failures. The State Worker therefore needs its own small retry classifier. It should respect `Retry-After`, use bounded jittered backoff for transient transport failures, avoid retrying permanent failures, and route malformed-but-current output through one deterministic repair attempt rather than an indiscriminate repeat.

Evidence: `SIllyTavern Original/src/endpoints/backends/kobold.js:93-140`, `SIllyTavern Original/public/scripts/extensions/connection-manager/index.js:607-650`, `SIllyTavern Original/public/scripts/extensions/shared.js:419-486`, and `SIllyTavern Original/src/endpoints/backends/chat-completions.js:2590-2628`.

## 9. Streaming presentation

SillyTavern supports genuine provider streaming, but it also contains an optional Smooth Streaming transform that deliberately delays chunks for a gradual display effect. That presentation behavior is not part of the rework baseline.

Genuine provider streaming may display tokens as they arrive when the user enables it. A response that arrived complete is rendered immediately and in full; the app never meters out an already-complete message. State Worker output is not prose presentation: it remains hidden until the complete proposal validates and commits atomically.

Evidence: `SIllyTavern Original/public/scripts/sse-stream.js:340-386`, `SIllyTavern Original/public/script.js:5328-5382`, and `SIllyTavern Original/public/scripts/custom-request.js:503-530`.

## 10. Reuse and replacement map

| Concern | Reuse | Add or replace |
| --- | --- | --- |
| File safety | `write-file-atomic`, existing backup location and pruning conventions | Append-only worker event log, content checksums, quarantine and replay |
| Concurrent saves | Chat integrity identifier pattern | Branch/message/state revision commit guard and idempotency key |
| Cancellation | Existing abort-signal plumbing | Worker lifecycle cancellation and stale-job classification |
| Providers | Existing connection profiles and provider registries | Worker capability adapter and per-provider budget adapter |
| Local inference | Existing `llama.cpp` request compatibility | Managed hidden runtime, verified model delivery, health and restart policy |
| Structured output | Existing JSON-schema transport | Authoritative local schema plus semantic and evidence validation |
| NanoGPT usage | Existing active-subscription usage endpoint | Continuous budget ledger, forecasts, configurable warning/protection actions |
| Retries | Selected service-specific examples | One bounded, classified worker policy with circuit breaker |
| Streaming | Genuine upstream streaming | Remove artificial pacing from the product baseline; atomic worker commit |

## 11. Audit conclusion for the technical limits

The agreed recovery design remains appropriate after the code review, with one refinement: use SillyTavern's existing atomic-write, backup, abort, provider-profile, structured-output, and NanoGPT-usage mechanisms as foundations, but keep State Worker validation and transactions in a separate first-party coordinator. This avoids duplicating mature plumbing while preventing a background bookkeeping system from inheriting the looser failure semantics of an interactive prose request.
