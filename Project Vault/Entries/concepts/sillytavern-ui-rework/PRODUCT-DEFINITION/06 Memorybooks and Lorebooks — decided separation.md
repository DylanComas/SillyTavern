---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/PRODUCT-DEFINITION.md"
source_line: 242
heading_level: 2
heading_order: "06"
document_index: "[[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 6. Memorybooks and Lorebooks — decided separation

> [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|SillyTavern Rework — Product Definition]]

The code-level foundation audit is recorded in [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT|Memorybook Foundation Audit]]. Agreed behavior is defined in the living [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC|Memorybook Functional Specification]]. Summaryception is the behavioral reference for replaceable short/mid-term compression; Memory Books is the structural reference for durable memory, provenance, review, branching, rollback, and background jobs. Neither extension will be integrated wholesale.

Memory should be layered, inspectable, and user-correctable. Memorybooks and Lorebooks have different ownership and must not be treated as interchangeable names for the same storage.

- **Memorybooks are relative to chats.** They record what developed inside one conversation.
- **Lorebooks are relative to Personas and Characters.** They provide reusable foundational knowledge for any new chat that intentionally links them.
- Starting a new chat never imports another chat’s Memorybook automatically.
- Moving knowledge from a Memorybook into a Lorebook is explicit and user-controlled.
- Short-term Memorybook summaries are compressed, injected directly as recent continuity, and replaceable as the chat advances.
- Long-term Memorybook entries are durable and fixed after creation unless the user explicitly edits, compacts, replaces, or deletes them.
- Durable entries remain separate records; consolidation may change which records are active for retrieval but does not silently destroy the sources.
- Raw chat messages are never deleted by memory processing.

## Subsections

- [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/06.01 Proposed memory layers|Proposed memory layers]]
- [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/06.02 Memory requirements|Memory requirements]]
- [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/06.03 Short Memory trigger and turn definition|Short Memory trigger and turn definition]]
- [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/06.04 Long Memory and persistent scene direction|Long Memory and persistent scene direction]]
- [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/06.05 Simplified Lorebook categories|Simplified Lorebook categories]]

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|SillyTavern Rework — Product Definition]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/05.05 Automatic loading precedence|Automatic loading precedence]]
- Next: [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/06.01 Proposed memory layers|Proposed memory layers]]

- Source location: `ST-UI/sillytavern-ui-rework/PRODUCT-DEFINITION.md:242`
