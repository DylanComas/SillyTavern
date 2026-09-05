---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/PRODUCT-DEFINITION.md"
source_line: 353
heading_level: 2
heading_order: "08"
document_index: "[[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 8. Original UI delta ledger — version 1

> [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|SillyTavern Rework — Product Definition]]

| Existing area | Disposition | Rework direction | Priority/status |
| --- | --- | --- | --- |
| Chat workspace | Rework | Conversation-first center with contextual actions and reduced permanent chrome | Must |
| Chat switching/history | Replace | Fast searchable library optimized for many chats and frequent switching | Must |
| Character management | Rework | Library-oriented browsing plus native progressive card editor | Must |
| Character generation preferences | Add | Optional Advanced section for preferred model and preset; absent values use pinned Default Settings | Must |
| Persona management | Rework | Visible active persona, fast switching, and character/profile associations | Must |
| Model/provider settings | Replace | Full NanoGPT/model management under Preferences → AI & Models; quick model switch with pricing in Generation panel | Must |
| Generation Settings | Replace | Named bundles save model, base preset, Preset Configuration, Temperature, Top P, Top K, Context Size, and Response Length | Must |
| Default Settings | Replace | Pin one protected Generation Settings file; Revert reloads it without overwriting or deleting other files | Must |
| Preset settings | Rework | Base presets support independently saved named configurations of their complete rules and switches | Must |
| Generation parameter menus | Rework | Five common controls in a collapsible Core Parameters section; everything else under Advanced | Must |
| Lorebooks/World Info | Replace | Category-led knowledge and memory workspace with inspectable activation | Must |
| Summary and memory extensions | Replace | Unified layered memory system rather than multiple disconnected panels | Must |
| Context/token display | Rework | Compact status with an inspector for prompt contributors and budget | Must |
| Message swipes/branches | Rework | Preserve power while reducing persistent controls | Must |
| Extension menus | Replace | Shared navigation, settings, permissions, and module surfaces | Must foundation |
| Dialogue Colorizer extension UI | Replace | Native chat rendering preference and per-speaker controls | Should |
| Character Library extension UI | Replace | Native/first-party discovery and import module | Should |
| ST Card Editor extension UI | Replace | Native Character editor | Must |
| Horae or Multihog UI | Replace | Native Scene State surface; no extension UI or DnD control wall in the default product | Should |
| Model/regex tracker cards | Remove | Native ambient clock/environment and collapsible Cast panel preserve prose immersion | Should |
| Image generation | Defer | Optional module; accessible when installed/enabled, absent from default workspace | Could |
| Character expressions | Defer | Compatibility or optional module; no native v1 prominence | Later |
| Voice | Defer | Compatibility or optional module; no native v1 prominence | Later |
| Advanced formatting | Defer | Preserve required rendering compatibility without a primary control surface | Later |
| Translation | Defer | Compatibility or optional module | Later |
| Idle features | Defer | Compatibility or optional module | Later |
| Vector storage UI | Replace/Defer | Hide implementation jargon; retain only if selected memory architecture needs retrieval storage | Architecture decision |
| External terminal | Remove from production UX | Hidden supervised runtime with embedded console | Must |
| Diagnostics | Add | Redacted in-app console, status, restart, and export | Must |

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|SillyTavern Rework — Product Definition]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/07.02 Token constraint|Token constraint]]
- Next: [[Entries/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION/09 Extension integration register — version 1|9. Extension integration register — version 1]]

- Source location: `ST-UI/sillytavern-ui-rework/PRODUCT-DEFINITION.md:353`
