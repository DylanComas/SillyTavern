---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md"
source_line: 67
heading_level: 2
heading_order: "07"
document_index: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 7. Provider quota authority

> [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]

Unknown is a first-class value. Missing, null, blank, malformed, non-finite, or invalid negative usage values remain unknown, never zero. An explicit numeric zero stays zero. Keep success/failure, observation time, reset time, unit, plan identity, and confidence independently for balance and each subscription bucket. A failed balance lookup must not discard a successful subscription lookup, or vice versa. Do not coerce an unknown or string-valued activity/overage flag into authorization.

Keep provider quota units distinct from workload totals. The existing 60M table sums input plus output as a synthetic workload estimate; it is not evidence that the provider debits that sum. Weekly input tokens, daily input tokens, currency, credits, images, and output workload require separate ledgers where applicable. Daily exhaustion can block a request even while the weekly bucket has room.

Before a cloud request, reserve estimated debit plus allowed retry exposure against every applicable verified or user-configured bucket under account-wide concurrency control. Reconcile with reported usage; release only unspent reservation. Cancellation/timeout with uncertain billing remains reserved or explicitly uncertain until reconciled, not refunded as if no tokens were consumed. Cached-token discounts apply only when the provider's accounting semantics are verified.

Never claim Warning/Protection is effective with a missing denominator or stale/unknown authoritative reading. Mark status Unknown/Stale, try one bounded refresh, and require explicit user acceptance of a labeled local/user-configured budget before spending under uncertainty. Do not silently permit overage. Known overage capability is distinct from user permission to use it.

Phase 2 requires recorded or synthetic response fixtures for partial endpoint success, null versus zero, daily exhaustion with weekly capacity, changed limits, stale resets, concurrent reservations, uncertain cancellation, and retries. Live provider terms/fields must be checked before enforcement; no quota authority or adapter implementation is claimed by this documentation repair.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/06 Explicit provider request boundary|6. Explicit provider request boundary]]
- Next: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/08 Shared prompt budgeting|8. Shared prompt budgeting]]

- Source location: `ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md:67`
