# Current Workflow Surface Map

Recorded 2026-09-05. This is the current information-architecture candidate over the final desktop/Android art direction, not pixel-perfect UX or approved platform feature parity. “Both” in the inventory is an intended workflow target; exact Must/Should/Deferred delivery and Android runtime fallbacks remain Phase 1 closure decisions.

## Conversation and identity

Keep the conversation dominant on both platforms. The following destinations give each core workflow a visible home without adding permanent toolbars.

| Workflow | Desktop surface | Android route or sheet |
| --- | --- | --- |
| Find/switch/resume/branch chats | Chats rail and searchable chat list; message actions for branching | Chats tab → conversation; header switcher and message action sheet |
| Select/create/edit Personas | Personas destination in the library/navigation; active Persona in conversation header | More → Personas; active Persona header opens quick switch sheet |
| Browse/edit/import/export Character Cards | Characters library and progressive editor | Characters tab → detail/editor; import/export in actions |
| Select active Character and associations | Conversation header and Character inspector | Character header → association sheet |
| Character Library sources | Characters → Import/Browse Sources, when included in release scope | Characters → Browse Sources, subject to v1 scope and source feasibility |

## Generation and settings

Basic generation controls stay contextual; connection credentials and technical diagnostics stay in Preferences. Names and actions follow Save/Export and the distinction between Factory Defaults and the pinned Default Settings.

| Workflow | Desktop surface | Android route or sheet |
| --- | --- | --- |
| Quick model/preset switch and displayed model cost | Collapsible Generation inspector | Conversation → Generation bottom sheet |
| Generation Settings selection and pinned default | Generation quick setup with pin and Revert to Default | Same controls in Generation sheet |
| Temperature/context/response length/Top P/Top K | Core generation section | Core generation section in sheet |
| Preset Configuration, rules and switches | Collapsible preset section; advanced controls below | Preset sub-sheet with collapsible rules |
| Provider/API credentials and full model configuration | Preferences → AI & Models | More → Preferences → AI & Models |
| Worker Local/API/Disable and model Browse | Preferences → AI & Models → State Worker | Same settings destination; local option remains platform-capability-gated |
| Save, Export, import and recovery | Relevant settings editor and Preferences → Data | Editor actions and More → Preferences → Data |

## Memory and scene tools

Lorebooks and chat-owned Memorybooks are separate destinations. Scene tools are visual or contextual and do not inject generated tracker bars into the prose.

| Workflow | Desktop surface | Android route or sheet |
| --- | --- | --- |
| Reusable Character/Persona Lorebooks | Lore library and editor | Lore tab → Lorebooks |
| Current chat's Short/Long/Persistent memory | Conversation → Memorybook inspector; inspect sources and budget | Conversation header → Memorybook sheet; Lore tab offers distinct Memorybooks view scoped by chat |
| Remember This, inspect/unpin messages | Per-message actions; Persistent memory pin list | Long-press/message actions; Memorybook → Pins |
| End Scene Here and extraction status | Inter-message hover/focus control and quiet scene divider | Message actions → End Scene After This Message |
| Clock and forward-only time skip | Upper-left visual clock → Time Skip HUD | Compact conversation clock → Time Skip sheet |
| Weather | Clock-adjacent widget; optional animated sky | Same compact widget; animated sky only if device/accessibility policy permits |
| Cast, mood and Persona relationships | Nested collapsible Cast inspector with Add Character | Conversation → Cast sheet; nested expandable character rows |
| Character Bank detail and Lorebook shortcut | Expanded Cast row/Bank editor | Expanded Cast row → full detail sheet; direct Lorebook-entry shortcut |

## Research and diagnostics

Research is a candidate explicit tool, not an automatic always-on feature. Its activation, evidence handling, cache/privacy policy, and exact v1 inclusion remain pending; its proposed home does not settle those choices.

| Workflow | Desktop surface | Android route or sheet |
| --- | --- | --- |
| Optional internet research and evidence selection | Conversation tools → Research; inspect before including evidence | Composer tools → Research sheet |
| Inspect assembled context, memory cost and delivery reasons | Context inspector beside Generation/Memorybook | Conversation tools → Context inspector sheet |
| Console, worker health, redacted diagnostic export | Preferences → Advanced → Console | More → Preferences → Advanced → Diagnostics |
| Appearance, accessibility and notification preferences | Preferences | More → Preferences |

## Art direction boundary

The active references are [desktop](../Concept%20Arts/desktop-diagonal-theme.png) and [Android](../Concept%20Arts/android-diagonal-theme.png). Their diagonal split compares themes and is not a layout divider. Older boards remain historical assets. Clock, Cast, Memorybook, model quick-switch, Save/Export, and diagnostic behavior follow the current specifications rather than any outdated pictured control. Detailed responsive layouts, keyboard focus, screen-reader announcements, and sheet navigation are Phase 3 work.
