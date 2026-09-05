---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md"
source_line: 13
heading_level: 2
heading_order: "02"
document_index: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 2. Atomic persistence and backups

> [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]

SillyTavern uses `write-file-atomic` for chat, settings, presets, groups, World Info, secrets, cards, and several other persisted resources. Chat saving serializes the active chat and writes it through `tryWriteFileSync`; chat backups are separately throttled, timestamped, and pruned. Settings are also written atomically and periodically backed up.

The State Worker should reuse the same atomic-replacement foundation for compact snapshots and manifests. Its accepted history should be a separate append-only event log with checksums; normal chat backups alone are not a substitute for replayable tracker history.

Evidence: `SIllyTavern Original/src/util.js:1491-1497`, `SIllyTavern Original/src/endpoints/chats.js:41-77`, `SIllyTavern Original/src/endpoints/chats.js:457-467`, and `SIllyTavern Original/src/endpoints/settings.js:22-45,206-215`.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/01 Executive finding|1. Executive finding]]
- Next: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/03 Concurrent-overwrite protection|3. Concurrent-overwrite protection]]

- Source location: `ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md:13`
