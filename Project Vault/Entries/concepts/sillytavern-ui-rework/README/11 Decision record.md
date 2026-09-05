---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/README.md"
source_line: 250
heading_level: 2
heading_order: "11"
document_index: "[[Sources/concepts/sillytavern-ui-rework/README]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/README]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 11. Decision record

> [[Sources/concepts/sillytavern-ui-rework/README|SillyTavern Rework — Development Bible]]

| Decision | Status | Notes |
| --- | --- | --- |
| Full product UI rework | Agreed | More than a theme or isolated reskin. |
| Selected visual direction | Agreed | Soft Bento Studio plus Command Palette Minimal. |
| Light and dark modes | Agreed | Both represented by the selected concept artwork. |
| Electron desktop application | Agreed | Clean packaged launch with no visible terminal. |
| Android APK | Agreed | Capacitor is the current packaging direction. |
| NanoGPT as primary AI provider | Agreed | Paid account, API key, and hosted models already available. |
| Local creative-model runtime | Not required | Creative roleplay remains API-first; local generation is not imposed. |
| Local State Worker runtime | Agreed | Hidden app-owned `llama.cpp`; verified 2B-class GGUF delivered with consent, plus Browse for a compatible custom model. |
| In-app diagnostic console | Agreed | Preferences → Advanced → Console. |
| Native extension integration | Planned | Scope and sequencing will be decided later. |
| Android backend topology | Open | Must be validated before implementation is locked. |
| Existing chat restoration | Agreed | Each chat restores its exact persona, Lorebooks, model, preset, settings, Memorybook, and tracker state. |
| New chat inheritance | Agreed | Optional Character-preferred model/preset and matching Generation Settings → pinned Default Settings; Persona defaults fill Persona/Lorebook associations; no previous-chat memory. |
| Settings protection | Agreed | Save atomically replaces selected writable settings with recovery; Export creates a separate file; Revert restores the pinned default. |
| Model management placement | Agreed | Full management in Preferences → AI & Models; duplicate quick selector in Generation panel. |
| Model cost visibility | Agreed | Show provider-supplied costs with units and freshness; never invent missing pricing. |
| Generation Settings | Agreed | Named bundle of model, preset, preset configuration, and five common generation parameters. |
| Preset Configurations | Agreed | Multiple named rule/switch variants can belong to the same base preset. |
| Core generation controls | Agreed | Temperature, Context Size, Response Length, Top P, and Top K; remainder under Advanced. |
| Progressive disclosure | Agreed | Clear collapsible sections serve beginners and advanced users without bloating the workspace. |
| Character-preferred generation | Agreed | Optional preferred model/preset in the advanced Character editor; pinned Default Settings is the fallback. |
| Combination auto-load | Agreed | One preferred Generation Settings file per model/preset pair; other variants remain manually selectable. |
| Simplified model controls | Agreed | Strong defaults in the main workflow; uncommon settings under Advanced. |
| Memorybook scope | Agreed | Memorybooks are chat-relative and never inherited automatically by new chats. |
| Lorebook scope | Agreed | Lorebooks are Character/Persona-relative reusable context. |
| Layered memory | Agreed direction | Recent context plus Memorybook summaries, episodes, durable chat memory, and structured trackers. |
| Memorybook foundations | Audited | Summaryception for replaceable compression; Memory Books for durable lifecycle and provenance. |
| Memorybook configurability | Agreed | User-facing thresholds, buffers, automation, prompts, generation, injection, retrieval, and retention behavior are configurable with concise defaults and Advanced disclosure. |
| Short Memory trigger | Agreed | Automatic summarization supports a configurable token interval or roleplay-turn interval, plus manual-only operation. |
| Roleplay turn counting | Agreed | Each committed model message starts a turn; following user replies remain in it; Continue starts another turn; regeneration/swipes retain the same turn. |
| Verbatim memory baseline | Agreed | Default to Summaryception's 10-turn verbatim ceiling and 3-turn compression batch, producing an approximately 8–10-turn rolling raw window. |
| Long Memory recall graph | Agreed direction | Durable entries use tiny recall cards, activation and emitted tags, typed links, and bounded metadata-first recursive retrieval. |
| Persistent Scene Memory | Agreed direction | A parallel active set keeps the Story Continuity Profile, location, present-character, and pinned-scene cards loaded within its own budget. |
| Persistent Scene Memory lifetime | Agreed | Current cards do not decay by time or turns; semantic evidence replaces or retires them, while user pins persist until unpinned. |
| Pinned-message budget | Agreed baseline | Default to 10 configurable messages; Advanced Token Budget defaults to 2,000 tokens and never silently evicts or omits pins. |
| Long Memory recall modes | Agreed | Light is direct-only, Default uses two hops, Deep uses three, and Advanced-only Custom exposes bounded traversal and payload limits. |
| Longform and Tiny Recall sizes | Agreed | Longform keeps Memory Books' configurable 4,000-token maximum; Tiny Recall is normally 2–4 concise subject–verb sentences with a 128-token ceiling. |
| Long Memory extraction retries | Agreed | Preserve the frozen source and pending boundary; allow two classified transport retries and one structured repair within a four-call cap, with no partial entry. |
| Automatic scene-boundary gate | Agreed baseline | Suggest remains default; Automatic requires a versioned 400-window precision-first evaluation, exact placement, branch safety, and immediate Undo. |
| State Worker setup | Agreed | Require an explicit Local, API, or Disable choice; declining Local leads to API setup, then a final Local-or-Disable decision. |
| State Worker model evaluation | Agreed | Compare Qwen3.5-2B, Qwen3-1.7B, and SmolLM2-1.7B in the working interface before selecting the managed default. |
| Remember This | Agreed | Pins one exact user or model message into Persistent Scene Memory until unpinned; never creates Long Memory. |
| Manual scene boundary | Agreed direction | End Scene Here appears between messages and triggers Long Memory extraction for the closed source range. |
| Long Memory safety interval | Agreed | Configurable turn/token checkpoints extract long-running scenes without declaring a scene boundary. |
| Automatic scene detection | Agreed direction | State Worker supports Off, Suggest, and evaluated Automatic modes; Suggest is the initial assisted default. |
| Long Memory creation | Agreed | Valid extraction atomically creates and activates the complete entry with no draft or approval stage. |
| Long Memory payload | Agreed | Scene Details, detailed longform summary, Tiny Recall, activation/emitted tags, typed relationships, entities, importance, and provenance. |
| Automatic Long Memory operation | Agreed | Tag activation and bounded hopping run without routine manual work; entries remain inspectable and editable for corrections. |
| Short-term memory mutability | Agreed | Derived compressed summaries may be overwritten as the chat advances. |
| Long-term memory mutability | Agreed | Durable entries are fixed unless explicitly edited, compacted, replaced, or deleted. |
| Raw chat preservation | Agreed | Memory processing never deletes source messages. |
| Simplified Lorebooks | Agreed direction | Category-first UI; raw order controls become advanced. |
| Internet research | Planned | Token-efficient and source-visible; provider and activation policy remain open. |
| Dialogue coloring | Native candidate | Intended for multi-character roleplay. |
| Character-card editor | Native candidate | Informed by ST Card Editor with compatibility validation. |
| Character discovery | First-party module candidate | External sources require API, terms, and reliability review. |
| Scene State foundation | Audited direction | Build a typed native engine: Horae-inspired qualitative domains plus Multihog-inspired State Worker reliability and isolation. |
| Visual tracker presentation | Agreed direction | Native clock, environmental layer, and collapsible Cast panel replace message-attached model/regex tracker bars. |
| Tracker model delivery | Agreed direction | Each field selects Visual-only, On change, When relevant, or Always current; visuals themselves cost no model tokens. |
| Character Bank | Agreed direction | Chat-relative automatic/manual character discovery with stable identities, aliases, lifetimes, provenance, and undo. |
| Dialogue colors | Agreed direction | Stored on Character Bank identities and applied by the renderer to recognized speaker labels; never model-generated HTML. |
| Persona relationship display | Agreed | Each tracked character has a directed relationship toward the active Persona, shown as a `-100` to `+100` meter plus a descriptive label. |
| Relationship label defaults | Agreed | Hostile, Antagonistic, Distrustful, Wary, Neutral, Receptive, Friendly, Trusting, and Devoted use the currently locked score bands; labels and bands remain configurable. |
| Relationship score authority | Agreed | Models propose evidence-backed `±5`/`±10` deltas; the application validates the five-point scale, range, cadence, locks, provenance, and undo before changing the score. |
| Relationship manual modes | Agreed | Realistic `±5` has a five-turn cooldown and `±10` a ten-turn cooldown; Creative permits direct five-point-grid setting and locking. |
| Relationship reversal guard | Agreed | Non-Creative changes resist opposite movement for five turns unless a pivotal evidenced event overrides the guard. |
| Relationship automation source | Agreed | State Worker is the default; main-model structured sidecar remains the tested backup and may replace it if worker evaluation fails. |
| Character discovery tiers | Agreed | Card Characters come from cards; unknown attributed speakers become NPCs immediately; sustained NPCs may promote to Recurring Characters without a provisional state. |
| NPC promotion counter | Agreed | Count one speaking participation per canonical roleplay turn; promotion threshold is configurable and defaults to 25 turns. |
| Dialogue formats | Agreed | Support only `Name:` labels and Novel Dialogue. |
| Novel Dialogue color attribution | Agreed | Default to State Worker/Main Model span annotations stored outside raw prose; allow explicit sanitized HTML Compatibility if testing or personal use finds attribution inadequate. |
| Dialogue color defaults | Agreed | Colorization defaults off to theme foreground; when enabled, Bank colors apply to dialogue and Color Speaker Name optionally gives the label the same color. |
| Cast panel disclosure | Agreed | Expanded panel lists characters and manual Add Character; reduced items show name, mood, and Persona relationship, while expanded items show grouped tracked information. |
| Salient inventory | Agreed | Track only active or relevant items and their explicit state changes, not exhaustive possessions. |
| Cast identity and continuity fields | Agreed | Presence, visible condition, pronouns, species/type, dialogue color, and aliases are supported; portrait/avatar is optional and hideable. |
| Character Lorebook shortcut | Agreed | A Cast item may open one primary linked Lorebook Entry for user editing; linking and navigation never alter activation or model injection. |
| Location delivery | Agreed | Location defaults to On change and is re-anchored when its source evidence leaves retained context rather than being repeated every message. |
| Story Continuity Profile | Agreed | Primary Fandom, optional Crossover with a second Fandom, Era, and AU replace Universe Fandom and Timeline. AU gives established RP precedence over conflicting canon chronology. |
| Approximate story time | Agreed | Use the nine-phase Dawn-to-Deep-Night cycle with a semantic visual dial; store no advancing exact timestamp. |
| Time delivery | Agreed | Inject only the phase label On change and at context re-anchor boundaries, never every message. |
| Time Skip HUD | Agreed | Clicking the visual clock opens a forward-only phase dial. Every target is its next chronological occurrence; crossing the configured midnight boundary advances the known date or relative day state. |
| Weather GFX levels | Agreed | Static shows a compact indicator near the clock; Animated adds a weather-responsive sky across roughly the upper third of the conversation. Safeguards fall back to Static. |
| Real-world weather provider | Agreed with release gate | Use OpenWeather for opt-in real-world weather, pending distribution-license and attribution validation. Provider data is normalized locally and weather visuals require no model call. |
| Character-to-Character relationships | Deferred | Preserve a sparse-edge path for later; do not spend first-release tokens or UI complexity on pairwise tracking. |
| Provider-aware usage protection | Agreed | Use authoritative provider limits where available, otherwise a user-configured ledger or labeled estimates; Warning and Protection default to configurable 80% and 90%. |
| NanoGPT weekly benchmark | Agreed requirement | Activate the 60-million-token scenario only when NanoGPT is selected and an active subscription with a weekly allowance is detected. |
| Streaming presentation | Agreed | Genuine arrival may stream; complete responses appear immediately in full and artificial Smooth Streaming is excluded. |
| DnD Playing Mode | Deferred | Bars, attributes, skills, equipment rules, reputation meters, XP/levels, dice, combat, and related simulation are post-first-final-release modules. |
| Memorybook and tracker product-definition pass | Complete | Remaining schema, tuning, recovery, and detailed presentation work belongs to later architecture and UX phases unless it changes promised behavior. |
| Phase 1 closure sequence | Agreed | Settings versioning → Character Card metadata → Lorebook compatibility → internet research → exact desktop/Android v1 scope → exit review. |
| Factory Defaults pipeline | Agreed direction | Begin validated builds at 0.0.1, reserve 1.0.0 for first public release, document every promoted version, and compile tested developer defaults into an immutable runtime module. |
| Settings-layer ownership | Agreed | Distinguish Factory Defaults from user-pinned Default Settings and use field-aware ownership across app, Generation Settings, presets, Character, Persona, and chat state. |
| User settings persistence | Agreed | Save atomically replaces selected writable settings with a recovery snapshot; Export creates a separate portable file; no Save As or user-facing immutable revision system. |
| Character Card compatibility | Agreed direction | Tolerant V1/V2/V3 import, lossless unknown-field preservation, normalized runtime view, strict JSON/PNG export, embedded Character Book round trip, and retained existing compatibility formats. |
| Rework-specific card metadata | Proposed | Keep new preferences app-local by default; add them to one versioned namespaced extension only through explicit Include App Metadata export. |

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/README|SillyTavern Rework — Development Bible]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/README/10.02 Later validation and release decisions|Later validation and release decisions]]
- Next: [[Entries/concepts/sillytavern-ui-rework/README/12 Vault concept-note contract|12. Vault concept-note contract]]

- Source location: `ST-UI/sillytavern-ui-rework/README.md:250`
