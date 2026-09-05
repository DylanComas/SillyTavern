---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md"
source_line: 81
heading_level: 2
heading_order: "10"
document_index: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 10. Reuse and replacement map

> [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]

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

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/09 Streaming presentation|9. Streaming presentation]]
- Next: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/11 Audit conclusion for the technical limits|11. Audit conclusion for the technical limits]]

- Source location: `ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md:81`
