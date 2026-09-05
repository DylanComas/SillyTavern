---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md"
source_line: 35
heading_level: 2
heading_order: "04"
document_index: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 4. Request-aware On-change delivery

> [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]

Decide delivery after assembling each roleplay request. For each required current fact, track its semantic identity and revision, plus whether retained prose, a valid summary, or a compact delivery event actually represents it in that request. A sent-once flag is not evidence of representation in a stateless request.

If represented, omit the duplicate tracker line. If absent or contradicted by stale evidence, add a compact current anchor according to the tracker's policy and show the reason in the inspector. A worker `no_change` result does not cancel this independent obligation. Visual-only fields never become anchors.

Manual Time Skip and location corrections create durable delivery events. Failed or cancelled generation does not consume pending delivery. Multiple changes coalesce to the latest applicable fact for current generation, while event history preserves earlier values for historical extraction. Recheck representation after retries, model switches, branches, compaction, and prompt-budget reductions. Do not assume the model repeated an injected fact in its prose.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/03 Historical scene extraction|3. Historical scene extraction]]
- Next: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/05 Worker capabilities and cost|5. Worker capabilities and cost]]

- Source location: `ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md:35`
