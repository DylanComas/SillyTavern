---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md"
source_line: 13
heading_level: 2
heading_order: "02"
document_index: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 2. Worker scheduling and forward progress

> [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]

One application resource scheduler arbitrates local inference and provider-account concurrency. Each chat branch has its own durable evidence cursor. “One job at a time” means one active State Worker inference request per configured runtime/profile resource, with at most one active state-mutating job per chat branch. Roleplay requests take priority; tracking never delays creative generation.

Maintain one coalesced pending range descriptor per branch, not an unbounded queue of copied prompts. Raw transcript evidence stays on disk. Normal batches cover up to three turns, but a single oversized turn is split into stable segment-relative spans. Include the complete serialized instructions, schema, relevant state, wrappers, and evidence in the input budget. If those fixed parts cannot fit, report a configuration error; do not retry an impossible request unchanged.

Each logical job processes a finite bounded evidence prefix and records its start/end cursor, chunk identity, source revisions, input-state revision, and idempotency key. A complete validated prefix patch and its cursor commit atomically; failure advances neither. Subsequent prefixes receive explicit successor jobs. Never skip a source span to catch up or mark the entire turn processed when only one prefix was accepted. A later edit invalidates dependent prefixes and replay resumes from the earliest affected checkpoint.

The default 512-output-token setting is an initial ceiling to measure, not proof that a full patch fits. Count the entire serialized response, including provenance. On truncation, do not accept partial operations or repeat the identical oversized shape. Reduce the evidence span or use an explicitly permitted larger output cap within the job's total budget; if neither works, preserve the cursor and surface Needs Attention.

One logical prefix job has at most four automatic model attempts total, including initial request, transport retries, one structured repair, and any explicitly enabled separate main-model backup. A provider/account reservation also caps its estimated spend. Exhaustion leaves it pending without retrying on every new turn; manual Retry or a classified recovery event starts a visibly new cycle. Switching models or transports does not reset an in-flight job's ceiling.

While lagging, show Catching Up and the age/range of the last supported state. Do not restart valid prefix jobs merely because later prose arrived: validate their source range and state dependency, not global transcript length. Backpressure may pause background processing, but may not drop raw evidence. Phase 2 must demonstrate bounded queue memory, progress under repeated commits, stale-edit rejection, and fair scheduling across chats.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/01 Generation and continuation identity|1. Generation and continuation identity]]
- Next: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/03 Historical scene extraction|3. Historical scene extraction]]

- Source location: `ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md:13`
