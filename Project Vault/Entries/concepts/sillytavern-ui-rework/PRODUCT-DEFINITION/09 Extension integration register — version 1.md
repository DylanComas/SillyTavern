---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/PRODUCT-DEFINITION.md"
source_line: 387
heading_level: 2
heading_order: "09"
document_index: "[[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 9. Extension integration register — version 1

> [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|SillyTavern Rework — Product Definition]]

| Extension/capability | Desired value | Initial classification | Target | Required review |
| --- | --- | --- | --- | --- |
| Dialogue Colorizer | Distinguish speakers during multi-character roleplay | Native core candidate | Wave 1 | Parsing reliability, themes, accessibility, overrides, group-chat behavior |
| Summaryception / Memory Books | Short- and long-term continuity | Retire/replace with native memory system | Wave 1 | Existing data formats, summary prompts, migration, editing, failure behavior |
| Character Library | Discover/download cards from ChubAI, JannyAI, CharacterTavern, Pygmalion, and Wyvern | First-party module candidate | Wave 1 or 2 | Source APIs, terms, authentication, attribution, moderation, duplicates, outages |
| ST Card Editor | Create and edit compatible character cards | Native core candidate | Wave 1 | Card specifications, embedded assets, validation, round-trip compatibility |
| Horae | Qualitative roleplay-state vocabulary and replayable changes | Design reference only; clean native reimplementation | Wave 1 Scene State | No declared license in audited snapshot prevents direct code reuse without clarification |
| Multihog DnD Framework | State Worker isolation, per-chat safety, history, recovery, and module catalog patterns | Narrow engineering reference for native Scene State | Wave 1 Scene State | GPL obligations; tagged memo and DnD systems are not adopted as the core data model |
| MeguminSuite NPC Bank | Character discovery, configurable field lifetimes, change-only updates, undo, and injection limits | Narrow design reference for native Character Bank | Wave 1 Scene State | Conflicting non-commercial Creative Commons declarations; no direct reuse selected |
| DnD Playing Mode | Optional numerical mechanics and rules-driven play | Deferred modular native mode | After first final release | Scope, rules engine, dice, mobile UX, compatibility, and maintenance cost |

## Subsections

- [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/09.01 Horae and Multihog tracker decision|Horae and Multihog tracker decision]]

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|SillyTavern Rework — Product Definition]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/08 Original UI delta ledger — version 1|8. Original UI delta ledger — version 1]]
- Next: [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/09.01 Horae and Multihog tracker decision|Horae and Multihog tracker decision]]

- Source location: `ST-UI/sillytavern-ui-rework/PRODUCT-DEFINITION.md:387`
