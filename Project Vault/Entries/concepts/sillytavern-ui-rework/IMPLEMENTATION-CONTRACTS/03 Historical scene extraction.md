---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md"
source_line: 27
heading_level: 2
heading_order: "03"
document_index: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 3. Historical scene extraction

> [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]

Freeze extraction inputs at the selected scene cutoff on the same branch. Reconstruct supporting state from events/checkpoints applicable at or before that cutoff; include later manual corrections only when explicitly targeted to that historical range. A latest-state snapshot describing the next scene is not valid supporting evidence.

Extraction provenance includes source spans/revisions, cutoff identity, supporting-state revision or replay fingerprint, applicable correction IDs, schema/prompt versions, and job identity. If historical state cannot be reconstructed, extract from the bounded source text with unknown supporting fields; never substitute future facts. Scene Summary remains display-only, and Scene Details record the extracted scene rather than the current scene.

Required fixture: a late boundary is inserted between a Great Hall breakfast and a classroom conversation. Extraction of breakfast must not adopt the classroom location, later rain, or later-arriving cast even if those are current when the job starts.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/02 Worker scheduling and forward progress|2. Worker scheduling and forward progress]]
- Next: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/04 Request-aware On-change delivery|4. Request-aware On-change delivery]]

- Source location: `ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md:27`
