---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md"
source_line: 111
heading_level: 2
heading_order: "11"
document_index: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 11. Executable evaluation gate

> [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]

The prose fixture in the tracker specification is illustrative, not executable or measured. Before UI polishing in Phase 2, create a versioned schema, stable-ID/segment transcript, expected patches, and deterministic local validator in the rework. There must be no unresolved `STATE_PATCH_SCHEMA` placeholder in an executable test input.

Required cases are no-change, alias collision, Continue in one visual message, swipe replacement, oversized evidence, deterministic output truncation, late historical boundary, manual correction, stale result, repeated pending commits, and branch restoration. Each case asserts accepted/rejected operations, exact cursor progress, source provenance, and no partial/cross-branch commit. Schema validity alone cannot prove factual correctness.

The three-model comparison still occurs in the working interface, using identical frozen inputs and measuring latency, memory, cancellation, repair frequency, and factual error. Expand to the existing held-out corpus and pass its gates before enabling automatic commits/boundaries. No model benchmark was run or certified by the audit repair.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/10 Progressive configuration delivery|10. Progressive configuration delivery]]

- Source location: `ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md:111`
