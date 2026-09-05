---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT.md"
source_line: 47
heading_level: 2
heading_order: "03"
document_index: "[[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 3. Side-by-side functional model

> [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT|Memorybook Foundation Audit]]

| Concern | Summaryception | Memory Books |
| --- | --- | --- |
| Primary purpose | Keep a very long chat inside a compact active context | Create durable, selectively recalled memories from chat ranges |
| Ownership | Per-chat metadata | One or more SillyTavern lorebooks bound to a chat/character/group |
| Unit | Short text snippet | Structured lorebook entry with title, content, keywords, and metadata |
| Trigger | Assistant-turn count beyond the verbatim window | Message interval/buffer, manual scene selection, or command |
| Short-term behavior | Recursive layers; lower snippets are removed after promotion | Base memories remain unless manually changed or disabled |
| Long-term behavior | Repeated re-summarization into deeper layers | Optional tiered consolidation creates new entries linked to sources |
| Source preservation | Raw chat remains, but promoted snippet lineage becomes incomplete | Source ranges/chat IDs and source-entry UIDs are recorded |
| Injection | Entire assembled summary block at a fixed extension-prompt location | Normal lorebook activation/positioning, keywords, constants, vectors, or outlets |
| User review | Snippet browser; edit/delete; Layer 0 regeneration | Optional preview, manual edit, regeneration, compaction review, rollback |
| Branching | Repairs Layer 0 ranges after detecting a shorter branch | Copies and rebinds Memory Books for native branches |
| Failure handling | Retry/backoff; failed batch remains unsummarized | Structured errors, job states, cancellation, fingerprints, write lanes, review-needed state |
| UI character | Compact extension panel but still settings-heavy | Feature-rich and extremely broad; many popups, profiles, and advanced modes |

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT|Memorybook Foundation Audit]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/02.01 Source snapshots|Source snapshots]]
- Next: [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04 Summaryception audit|4. Summaryception audit]]

- Source location: `ST-UI/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT.md:47`
