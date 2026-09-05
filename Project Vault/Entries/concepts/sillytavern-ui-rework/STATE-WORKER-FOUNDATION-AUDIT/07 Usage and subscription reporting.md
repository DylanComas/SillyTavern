---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md"
source_line: 55
heading_level: 2
heading_order: "07"
document_index: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 7. Usage and subscription reporting

> [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]

The fork already has a NanoGPT endpoint that checks both pay-as-you-go balance and subscription usage. When the subscription is active, it normalizes the authoritative weekly and daily token buckets, their limits, percent used, remaining amount, and reset time. The current UI can display that subscription state and weekly token usage.

This gives the rework a concrete detection path for the 60-million-token weekly plan: it applies only when NanoGPT is the selected worker or roleplay provider and the endpoint reports an active subscription with a valid weekly limit. Other providers require capability-based accounting rather than invented limits.

Audit correction: this is historical field-discovery evidence, not a safe quota authority. The handoff identified null-to-zero coercion and coupled partial failures. The new rework must preserve Unknown/freshness, independent endpoint outcomes, daily and weekly units, request reservations, and explicit overage policy as specified in the quota contract. No original endpoint was fixed as part of the final in-scope work.

Evidence: `SIllyTavern Original/src/endpoints/nanogpt.js:19-33,36-100` and `SIllyTavern Original/public/scripts/secrets.js:1204-1289`.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/06 Structured output support|6. Structured output support]]
- Next: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/08 Retry behavior|8. Retry behavior]]

- Source location: `ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md:55`
