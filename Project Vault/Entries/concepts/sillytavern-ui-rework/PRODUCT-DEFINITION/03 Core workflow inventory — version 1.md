---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/PRODUCT-DEFINITION.md"
source_line: 66
heading_level: 2
heading_order: "03"
document_index: "[[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 3. Core workflow inventory — version 1

> [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|SillyTavern Rework — Product Definition]]

| ID | Workflow | Priority | Platform | Intended direction | Definition status |
| --- | --- | --- | --- | --- | --- |
| `PROD-WF-001` | Find and switch chats rapidly | Must | Both | Searchable recent/pinned chat library with character and persona context visible | Needs detailed flow |
| `PROD-WF-002` | Browse and manage a large character library | Must | Both | Search, filters, collections/tags, recent use, favorites, and clear active-chat entry | Needs detailed flow |
| `PROD-WF-003` | Switch or manage personas | Must | Both | Persona library with clear active identity and associations | Needs detailed flow |
| `PROD-WF-004` | Restore an existing chat exactly | Must | Both | Each chat remembers its persona, model, preset, Lorebooks, settings, Memorybook, and tracker state | Direction established |
| `PROD-WF-005` | Start a new chat from safe defaults | Must | Both | Optional character-preferred model/preset and matching Generation Settings first; pinned Default Settings fills the rest; no memory from older chats | Direction established |
| `PROD-WF-006` | Send and receive streaming messages | Must | Both | Focused composer, streaming state, stop, retry, and recovery | Needs detailed flow |
| `PROD-WF-007` | Edit, continue, regenerate, swipe, and branch | Must | Both | Message actions remain close to the selected message without permanent clutter | Needs detailed flow |
| `PROD-WF-008` | Connect NanoGPT and choose models | Must | Both | Full model management in Preferences plus a duplicate quick switch in the Generation panel with visible model costs | Needs API/cost validation |
| `PROD-WF-009` | Save, export, and apply Generation Settings | Must | Both | Save replaces the selected writable settings; Export creates a portable file; named bundles remember model, preset, core parameters, and optional Preset Configuration; one can be pinned as Default Settings | Direction established |
| `PROD-WF-010` | Adjust common generation controls | Must | Both | Temperature, Context Size, Response Length, Top P, and Top K are exposed in a clear collapsible section | Direction established |
| `PROD-WF-026` | Save different configurations of one preset | Must | Both | Named Preset Configurations store a base preset’s rules and switches, such as Chatfill — Longform — NSFW | Direction established |
| `PROD-WF-011` | Understand current prompt/context usage | Must | Both | Clear context budget plus inspectable contributing sources | Needs technical validation |
| `PROD-WF-012` | Maintain short-term conversational memory | Must | Both | A chat-owned Memorybook contains a rolling summary that can be viewed, edited, regenerated, pinned, or disabled | Needs lifecycle specification |
| `PROD-WF-013` | Maintain long-term chat memory | Must | Both | Episodic and durable memories remain inside that chat’s Memorybook and are not inherited by new chats | Needs lifecycle specification |
| `PROD-WF-014` | Manage lore and world knowledge | Must | Both | Category-led interface with strong defaults and advanced ordering only when requested | Needs detailed flow |
| `PROD-WF-015` | Inspect why memory or lore was used | Must | Both | Each injected item shows source, reason, layer, and relevant scope | Needs technical validation |
| `PROD-WF-016` | Create and edit character cards | Must | Both | Native card editor informed by ST Card Editor; progressive fields and validation | Format audit complete; metadata placement pending |
| `PROD-WF-017` | Import and export character cards | Must | Both | Safe, compatible card exchange with preview and conflict handling | Format audit complete; compatibility corpus pending |
| `PROD-WF-018` | Distinguish speakers in multi-character roleplay | Should | Both | Native deterministic dialogue colors with accessible fallbacks and user overrides | Needs UX specification |
| `PROD-WF-019` | Discover and download characters | Should | Both | Unified character-library surface for approved external sources | Needs source/terms audit |
| `PROD-WF-020` | Track roleplay state | Should | Both | Typed qualitative Scene State derived from the Horae/Multihog audit; DnD Playing Mode deferred | Needs functional schema |
| `PROD-WF-021` | Search the internet for relevant facts | Should | Both | User-controlled search, compact evidence selection, caching, and visible sources | Needs provider/privacy design |
| `PROD-WF-022` | Back up, restore, and migrate data | Must | Both | Explicit backups, safe migration, validation, and recovery | Needs data audit |
| `PROD-WF-023` | Diagnose application problems | Must | Desktop | Preferences → Advanced → Console with redacted logs and runtime controls | Direction established |
| `PROD-WF-024` | Use image generation | Could | Both | Optional module; no permanent primary-workspace footprint | Scope deferred |
| `PROD-WF-025` | Use voice, expressions, translation, or advanced formatting | Later | TBD | Compatibility/optional-module decision rather than native v1 priority | Needs compatibility review |

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|SillyTavern Rework — Product Definition]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/02.04 Not part of the default product experience|Not part of the default product experience]]
- Next: [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/04 Settings, associations, and inheritance — decided direction|4. Settings, associations, and inheritance — decided direction]]

- Source location: `ST-UI/sillytavern-ui-rework/PRODUCT-DEFINITION.md:66`
