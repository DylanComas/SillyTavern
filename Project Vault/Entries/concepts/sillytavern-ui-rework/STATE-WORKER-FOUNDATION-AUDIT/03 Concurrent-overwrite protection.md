---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md"
source_line: 21
heading_level: 2
heading_order: "03"
document_index: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 3. Concurrent-overwrite protection

> [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]

SillyTavern gives each loaded chat an integrity identifier. Before saving, the server compares the identifier in memory with the first line of the file and refuses a mismatched overwrite unless the user explicitly forces it. This is a useful optimistic-concurrency pattern and protects against two open views overwriting each other.

The identifier is not a content checksum and does not prove that a worker result was computed from the active branch or current message revisions. The State Worker should extend the pattern with chat ID, branch ID, source message IDs and revisions, input-state revision, schema version, and a final pre-commit comparison.

Evidence: `SIllyTavern Original/src/endpoints/chats.js:311-334`, `SIllyTavern Original/src/endpoints/chats.js:457-465`, and `SIllyTavern Original/public/script.js:7336-7419`.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/02 Atomic persistence and backups|2. Atomic persistence and backups]]
- Next: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/04 Cancellation and stale-job handling|4. Cancellation and stale-job handling]]

- Source location: `ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md:21`
