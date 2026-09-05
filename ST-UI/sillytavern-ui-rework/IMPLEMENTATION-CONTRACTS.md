# Rework Implementation Safety Contracts

Recorded 2026-09-05 during the Astra audit follow-up. These are requirements for the new rework, not claims about implemented runtime behavior. They reconcile the existing specifications and define evidence needed in Phase 2. Original-application and extension code are outside the working scope. Product choices explicitly marked Pending still require user confirmation.

## 1. Generation and continuation identity

Canonical turns follow committed generation segments, not the number of stored or displayed messages. A Continue segment can share its visual message with an earlier segment while starting a new canonical turn. Give each segment an opaque ID, parent message ID, branch ID, source span, content revision/fingerprint, generation kind, active alternative/swipe lineage, and commit status. A retry cannot create a second committed segment for the same idempotency key.

Regeneration replaces the active alternative of the existing turn; editing changes its revision. A new Continue creates a new segment/turn. User replies attach to the preceding model-led turn. Rewinding or switching alternatives rebuilds affected participation counts, relationship cooldowns, memory source ranges, and worker cursors from the active lineage. A changed earlier span invalidates dependent later spans; character offsets alone are not identity.

Legacy imports without segment history receive one deterministic synthetic segment per stored model message, marked `legacy_segment_history_unknown`. Never invent historical Continue boundaries. Record the count limitation in the inspector, then track new generations normally. Phase 2 must test Continue within one displayed message, swipes, edits, and import/reload without double counting.

## 2. Worker scheduling and forward progress

One application resource scheduler arbitrates local inference and provider-account concurrency. Each chat branch has its own durable evidence cursor. “One job at a time” means one active State Worker inference request per configured runtime/profile resource, with at most one active state-mutating job per chat branch. Roleplay requests take priority; tracking never delays creative generation.

Maintain one coalesced pending range descriptor per branch, not an unbounded queue of copied prompts. Raw transcript evidence stays on disk. Normal batches cover up to three turns, but a single oversized turn is split into stable segment-relative spans. Include the complete serialized instructions, schema, relevant state, wrappers, and evidence in the input budget. If those fixed parts cannot fit, report a configuration error; do not retry an impossible request unchanged.

Each logical job processes a finite bounded evidence prefix and records its start/end cursor, chunk identity, source revisions, input-state revision, and idempotency key. A complete validated prefix patch and its cursor commit atomically; failure advances neither. Subsequent prefixes receive explicit successor jobs. Never skip a source span to catch up or mark the entire turn processed when only one prefix was accepted. A later edit invalidates dependent prefixes and replay resumes from the earliest affected checkpoint.

The default 512-output-token setting is an initial ceiling to measure, not proof that a full patch fits. Count the entire serialized response, including provenance. On truncation, do not accept partial operations or repeat the identical oversized shape. Reduce the evidence span or use an explicitly permitted larger output cap within the job's total budget; if neither works, preserve the cursor and surface Needs Attention.

One logical prefix job has at most four automatic model attempts total, including initial request, transport retries, one structured repair, and any explicitly enabled separate main-model backup. A provider/account reservation also caps its estimated spend. Exhaustion leaves it pending without retrying on every new turn; manual Retry or a classified recovery event starts a visibly new cycle. Switching models or transports does not reset an in-flight job's ceiling.

While lagging, show Catching Up and the age/range of the last supported state. Do not restart valid prefix jobs merely because later prose arrived: validate their source range and state dependency, not global transcript length. Backpressure may pause background processing, but may not drop raw evidence. Phase 2 must demonstrate bounded queue memory, progress under repeated commits, stale-edit rejection, and fair scheduling across chats.

## 3. Historical scene extraction

Freeze extraction inputs at the selected scene cutoff on the same branch. Reconstruct supporting state from events/checkpoints applicable at or before that cutoff; include later manual corrections only when explicitly targeted to that historical range. A latest-state snapshot describing the next scene is not valid supporting evidence.

Extraction provenance includes source spans/revisions, cutoff identity, supporting-state revision or replay fingerprint, applicable correction IDs, schema/prompt versions, and job identity. If historical state cannot be reconstructed, extract from the bounded source text with unknown supporting fields; never substitute future facts. Scene Summary remains display-only, and Scene Details record the extracted scene rather than the current scene.

Required fixture: a late boundary is inserted between a Great Hall breakfast and a classroom conversation. Extraction of breakfast must not adopt the classroom location, later rain, or later-arriving cast even if those are current when the job starts.

## 4. Request-aware On-change delivery

Decide delivery after assembling each roleplay request. For each required current fact, track its semantic identity and revision, plus whether retained prose, a valid summary, or a compact delivery event actually represents it in that request. A sent-once flag is not evidence of representation in a stateless request.

If represented, omit the duplicate tracker line. If absent or contradicted by stale evidence, add a compact current anchor according to the tracker's policy and show the reason in the inspector. A worker `no_change` result does not cancel this independent obligation. Visual-only fields never become anchors.

Manual Time Skip and location corrections create durable delivery events. Failed or cancelled generation does not consume pending delivery. Multiple changes coalesce to the latest applicable fact for current generation, while event history preserves earlier values for historical extraction. Recheck representation after retries, model switches, branches, compaction, and prompt-budget reductions. Do not assume the model repeated an injected fact in its prose.

## 5. Worker capabilities and cost

The following names apply consistently to Memorybook, relationship automation, dialogue attribution, and setup. They separate an inference source from optional provider transport. The previously agreed explicit Local → API → Local-or-Disable onboarding remains unchanged; showing all three options together is an audit recommendation still awaiting approval.

| Mode | Execution and supported behavior | Cost and fallback boundary |
| --- | --- | --- |
| Local State Worker | Hidden managed `llama.cpp`; factual tracker patches, attribution and boundary candidates where enabled | Local compute, no cloud quota; no unapproved API fallback |
| API State Worker | Isolated request through an explicitly selected provider/model profile | Account for input/output, retries, repairs and attribution on that provider |
| Main-model extraction request | Separate factual request using the creative model's resolved connection, not a replay of its creative preset | An additional request; independent profile snapshot and explicit enablement required |
| Main Model Sidecar | Metadata in the same creative response through a separately verified provider-supported structured channel | Additional prompt/output usage still counts; not universally available and cannot retrofit a completed response |
| Disabled | Manual state, deterministic `Name:` parsing, clock actions, rendering and provider weather remain usable | No model-managed tracking/attribution/boundary detection and no silent fallback reactivation |

Short Memory and Long Memory use their own configured jobs/profiles. Disabling the State Worker leaves those jobs available, including manual-boundary and safety-interval extraction. If their own generation profiles are missing, report that capability's setup issue rather than disabling the whole Memorybook.

Dialogue colors and visual clocks are rendered locally. Novel-dialogue speaker attribution and story-time inference may consume worker tokens. Real-world weather retrieval does not consume inference tokens, but including weather in a roleplay request does. An HTML compatibility prompt also contributes prompt/output tokens. None of these distinctions permits generated tracker UI in the prose.

## 6. Explicit provider request boundary

The new runtime needs an isolated request interface, not implicit access to mutable browser globals. Its inputs are an immutable resolved connection/profile snapshot, credential reference, role (`roleplay`, `state_worker`, `short_memory`, `long_memory`, or `research`), model, messages/evidence, schema/version, input/output limits, request/job IDs, and abort signal. Credentials are resolved only behind the platform transport boundary and never serialized into jobs, cards, logs, or exports.

Outputs distinguish complete versus truncated results, structured provider errors, usage with units/source/confidence, and actual transport streaming. Provider capability checks are explicit; unsupported structured output fails before spending where possible. Concurrent creative and worker requests must not mutate each other's selected model, preset, parameters, connection, or secret selection.

Phase 2 proves the interface with stub transports and isolated runtime adapters in the rework. Historical audits describe possible plumbing, not an already independent backend. Android transport remains conditional on its topology spike. Electron must separately prove hidden supervised child-runtime startup, failure reporting, clean shutdown, and Console redaction; the presence of older Electron work is not proof of completion.

## 7. Provider quota authority

Unknown is a first-class value. Missing, null, blank, malformed, non-finite, or invalid negative usage values remain unknown, never zero. An explicit numeric zero stays zero. Keep success/failure, observation time, reset time, unit, plan identity, and confidence independently for balance and each subscription bucket. A failed balance lookup must not discard a successful subscription lookup, or vice versa. Do not coerce an unknown or string-valued activity/overage flag into authorization.

Keep provider quota units distinct from workload totals. The existing 60M table sums input plus output as a synthetic workload estimate; it is not evidence that the provider debits that sum. Weekly input tokens, daily input tokens, currency, credits, images, and output workload require separate ledgers where applicable. Daily exhaustion can block a request even while the weekly bucket has room.

Before a cloud request, reserve estimated debit plus allowed retry exposure against every applicable verified or user-configured bucket under account-wide concurrency control. Reconcile with reported usage; release only unspent reservation. Cancellation/timeout with uncertain billing remains reserved or explicitly uncertain until reconciled, not refunded as if no tokens were consumed. Cached-token discounts apply only when the provider's accounting semantics are verified.

Never claim Warning/Protection is effective with a missing denominator or stale/unknown authoritative reading. Mark status Unknown/Stale, try one bounded refresh, and require explicit user acceptance of a labeled local/user-configured budget before spending under uncertainty. Do not silently permit overage. Known overage capability is distinct from user permission to use it.

Phase 2 requires recorded or synthetic response fixtures for partial endpoint success, null versus zero, daily exhaustion with weekly capacity, changed limits, stale resets, concurrent reservations, uncertain cancellation, and retries. Live provider terms/fields must be checked before enforcement; no quota authority or adapter implementation is claimed by this documentation repair.

## 8. Shared prompt budgeting

One planner owns the complete serialized prompt budget across all contributors. Reserve requested output and provider overhead first. Then account for mandatory instructions, required Character/Persona content, the current user request, explicit verbatim pins, and any user-declared required lore. Preserve established prompt ordering/activation semantics while the Lorebook compatibility decision is open; budget priority is not permission to reorder rules.

Within the remaining budget, admit valid Short Memory, required current-state anchors, the protected recent-prose window, and bounded long-term recall/research/relevance-only contributions according to their configured policies. Deduplicate the same source/fact where it appears in multiple layers. Display actual serialized cost by contributor, tokenizer identity, and estimation margin; never claim estimated token counts are exact.

If everything required cannot fit, block dispatch visibly and explain the contributors. Offer explicit remedies: reduce response reserve, choose a larger supported context/model, change protected-window settings, manually summarize eligible material, or unpin selected messages. Do not silently remove a pin, truncate a required message, drop required instructions, or send a malformed oversized request. Optional recall/research can be reduced within its agreed budgets and must be visible in the inspector.

Short Memory jobs may run asynchronously while the complete raw range still fits. Failed/pending summarization keeps the previous valid summary, unprocessed source, and cursor intact. If context pressure prevents a safe request, show the unresolved memory job and the same explicit resolution choices. Waiting for required context repair is separate from the rule that ordinary State Worker tracking never delays roleplay.

## 9. Short Memory baseline proposal

The accepted 10-turn verbatim ceiling and three-turn compression batch stay unchanged. The following resolves audit A07 as a concrete proposal for confirmation before Phase 1 exit; it is not silently promoted to an accepted product decision.

| Behavior | Proposed initial default |
| --- | --- |
| Trigger | Turn-based verbatim-pressure trigger: crossing ten raw canonical turns makes the oldest three eligible, matching the existing approximately 8–10-turn window |
| Compression | One bounded rolling summary plus recent raw prose; Summaryception's separate recursive-layer defaults are not inherited |
| Scheduling | Background processing after committed evidence becomes eligible; no pre-creation review |
| Token-interval mode | Optional threshold remains configurable; only eligible unprotected source is summarized |
| Oversized protected window | A separate hard context-pressure path invokes the planner's visible block/remedy behavior; it does not override protection silently |
| Pending/failure | Keep raw evidence and last valid summary; never advance the processed cursor on a failed or stale job |
| Ownership | Application default → reusable Memorybook configuration → explicit chat override, with inspectable provenance |

Exact summary output size, revision-history count, and tokenizer implementation are measured implementation defaults. Whether users may switch the protected-window unit to tokens remains a separate advanced-control decision. This proposal must be settled together with pressure behavior rather than declaring Short Memory behaviorally complete.

## 10. Progressive configuration delivery

Keep the promised customization and expose coherent basic presets/modes first. An Advanced setting ships only with documented constraints, supported interactions, migration behavior, restore behavior, and tests of its allowed combinations. Collapsing controls is not a substitute for validating them.

Security and data-integrity invariants remain non-optional Factory Defaults/schema constraints. Do not invent additional tunable dimensions during the first vertical slice. This is implementation sequencing, not removal of agreed user controls. Explicitly report an unimplemented control instead of presenting a nonfunctional setting.

## 11. Executable evaluation gate

The prose fixture in the tracker specification is illustrative, not executable or measured. Before UI polishing in Phase 2, create a versioned schema, stable-ID/segment transcript, expected patches, and deterministic local validator in the rework. There must be no unresolved `STATE_PATCH_SCHEMA` placeholder in an executable test input.

Required cases are no-change, alias collision, Continue in one visual message, swipe replacement, oversized evidence, deterministic output truncation, late historical boundary, manual correction, stale result, repeated pending commits, and branch restoration. Each case asserts accepted/rejected operations, exact cursor progress, source provenance, and no partial/cross-branch commit. Schema validity alone cannot prove factual correctness.

The three-model comparison still occurs in the working interface, using identical frozen inputs and measuring latency, memory, cancellation, repair frequency, and factual error. Expand to the existing held-out corpus and pass its gates before enabling automatic commits/boundaries. No model benchmark was run or certified by the audit repair.
