---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_line: 119
heading_level: 2
heading_order: "10"
document_index: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 10. Portable versus app-local metadata proposal

> [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]

To maximize compatibility, the standard export is conservative:

| Data | Default placement |
| --- | --- |
| Standard V1/V2/V3 fields and embedded Character Book | Portable card data |
| Existing imported `extensions`, source IDs, and provenance | Preserved portable data, subject to explicit private-field rules |
| Preferred model, preset, Generation Settings, or Persona association | App-local companion record by default |
| Links to separate local Lorebooks | App-local companion record; an actually embedded Character Book remains portable |
| Dialogue color, aliases, Character Bank classification, portrait choice | App-local by default unless already represented by an imported extension |
| Chats, Memorybooks, scene state, trackers, relationships, usage, credentials, and local paths | App-local only; never standard card export |

An optional future **Include App Metadata** export can copy approved character preferences into one versioned namespaced extension object. It is off by default, previews its contents, contains no secrets or device paths, and never becomes necessary to use the character in another application.

The app-local companion record uses the application's stable character ID and retains source fingerprints/URLs as matching evidence. A changed fingerprint never causes silent attachment to a different downloaded card; ambiguous matches require user choice.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/09 Unknown-field and forward-compatibility rule|9. Unknown-field and forward-compatibility rule]]
- Next: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/11 Security and privacy boundary|11. Security and privacy boundary]]

- Source location: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md:119`
