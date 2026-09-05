---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md"
source_line: 77
heading_level: 2
heading_order: "06"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 6. Logical settings ownership

> [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]

Ownership here means which data layer is authoritative for a value and which user action may change it. It does not assert ownership of upstream or third-party code; licensing and attribution remain separate concerns.

| Layer | Owns | Must not own or mutate |
| --- | --- | --- |
| Factory Defaults | Safe built-in values, hard safety bounds, schema/default revisions, platform path policy, initial feature availability | User preferences, selected credentials, chat state, or the pinned Default Settings file |
| Application Preferences | Device/app presentation, accessibility, enabled modules, provider profiles, credential references, general tracker/worker/research preferences | Exact state of an existing chat or reusable Character/Persona content |
| Default Settings | One explicitly pinned Generation Settings file used as the user's known-good generation fallback | Factory safety bounds, Character/Persona identity, or existing chat history |
| Generation Settings | Model, base preset, selected Preset Configuration, Temperature, Top P, Top K, Context Size, Response Length, and supported advanced generation values | The preset's internal rule definitions or global application preferences |
| Preset Configuration | One named version of a base preset's complete rules and switches | Model credentials, chat memory, or global application behavior |
| Character Defaults | Character Lorebook associations, optional preferred Persona, model, and preset, plus character-scoped preferences approved by the metadata contract | Memory learned in another chat or silent changes to global/user defaults |
| Persona Defaults | Persona Lorebook associations and persona-scoped behavior/presentation approved by the metadata contract | A Character's preferred model/preset or memory learned in another chat |
| Chat State | The exact resolved Persona, model, preset, selected settings, Lorebooks, Memorybook, trackers, and overrides for that chat | Any reusable default unless the user invokes an explicit save or export action |

Resolution is field-aware rather than a blind merge of complete objects. An existing chat restores its Chat State exactly. A new chat is assembled from Factory Defaults and Application Preferences, then the pinned Default Settings, relevant Persona associations, and optional Character preferences according to the previously agreed new-chat rules; the resolved result becomes that chat's own snapshot.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/05 Protection and validation|5. Protection and validation]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/07 User Save and Export contract|7. User Save and Export contract]]

- Source location: `ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md:77`
