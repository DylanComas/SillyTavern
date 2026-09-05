# SillyTavern Rework — Development Bible

This document is the working source of truth for the SillyTavern rework. It records agreed product direction, platform choices, experience principles, and implementation constraints. It should evolve with the project; decisions belong here before they become assumptions spread across the codebase.

Delivery phases, gates, and progress are maintained in the companion [Living Delivery Plan](./REWORK-PLAN.md). The current workflow inventory, original UI delta ledger, and extension register are maintained in [Product Definition](./PRODUCT-DEFINITION.md).

The 2026-09-05 audit corrections add [implementation safety contracts](./IMPLEMENTATION-CONTRACTS.md) and the [workflow surface map](./WORKFLOW-SURFACE-MAP.md). These define rework requirements, not completed runtime features. Work is restricted to this rework folder and the Vault; the original application and extension clones must not be audited or modified.

The code-level analysis of Summaryception and Memory Books is maintained in the [Memorybook Foundation Audit](./MEMORYBOOK-FOUNDATION-AUDIT.md). The Horae, Multihog, and MeguminSuite review is maintained in the [Scene State and Tracker Foundation Audit](./TRACKER-FOUNDATION-AUDIT.md). The SillyTavern mechanisms available for worker persistence, provider access, validation, usage reporting, and recovery are assessed in the [State Worker Reliability Foundation Audit](./STATE-WORKER-FOUNDATION-AUDIT.md). Agreed product behavior is maintained separately in the living [Memorybook Functional Specification](./MEMORYBOOK-FUNCTIONAL-SPEC.md) and [Scene State and Visual Tracker Functional Specification](./SCENE-STATE-TRACKER-SPEC.md).

## 1. Project intent

Create a cohesive rework of SillyTavern rather than a cosmetic theme. The result should preserve the capabilities that make SillyTavern useful while replacing its fragmented interface with a deliberate, responsive product experience.

The rework will:

- ship as a clean desktop application;
- provide an Android APK with a purpose-built mobile experience;
- use hosted creative models through NanoGPT while supporting a small local or API State Worker for native tracking;
- progressively integrate selected extension functionality into the core experience;
- keep advanced controls available without allowing them to dominate ordinary use;
- establish a maintainable UI foundation instead of continuing to layer changes onto the current interface.

## 2. Product principles

These principles govern every design and implementation choice in the rework. They protect the prose-first roleplay experience while keeping advanced power available through progressive disclosure rather than permanent interface density.

### Conversation first

The active conversation remains the visual and interaction priority. Supporting tools—lore, generation settings, session information, character data, and extensions—should be close at hand but contextual, collapsible, or progressively disclosed.

### Simple by default, powerful on demand

Common actions should be obvious. Advanced configuration should live in inspectors, command surfaces, bottom sheets, or Preferences rather than filling the primary workspace.

### Desktop and mobile are related, not identical

Both platforms should share the same product language, design tokens, terminology, data model, and core workflows. Their layouts should respond to the form factor instead of compressing the desktop interface onto a phone.

### Native application feel

Launching the desktop application should feel like launching a finished product: one application window, no required terminal window, controlled startup and shutdown, clear error reporting, and platform-appropriate persistence.

### Extensions should feel intentional

Selected extension capabilities will eventually be integrated natively. The rework must reserve coherent surfaces for them without recreating the current accumulation of unrelated buttons and panels.

## 3. Platform direction

The product uses a shared application foundation while respecting desktop and Android constraints. Desktop is the primary full workspace; Android is a native-feeling companion target rather than a compressed copy of the desktop shell.

### Desktop

- **Shell:** Electron.
- **Target:** a normal installable desktop application, initially focused on Windows while preserving a path to other Electron-supported desktop platforms.
- **Runtime:** the Electron main process owns the lifecycle of the SillyTavern server/runtime and the application window.
- **Startup:** launching the packaged application must not leave a Command Prompt, PowerShell, or terminal window visible.
- **Shutdown:** closing the application must cleanly stop any child runtime it started.
- **UI:** the reworked frontend is presented inside the Electron window as the product itself, not as a browser-oriented wrapper with visible development machinery.

The existing Electron-related work in the repository is a starting point to audit and harden, not an assumption that desktop packaging is already production-ready.

### Android

- **Deliverable:** an installable APK.
- **Current packaging direction:** Capacitor, allowing the responsive web UI and shared application code to be reused inside a native Android shell.
- **Experience:** a dedicated portrait-first layout with touch targets, bottom navigation, sheets, and mobile-safe handling of keyboards and system insets.
- **Architecture still to validate:** where the SillyTavern server-side responsibilities and user data live in the mobile release. This must be resolved before committing to a fully standalone APK or a thin client connected to a desktop/LAN/hosted service.

An APK is a platform deliverable, not a promise that every desktop capability can be embedded unchanged on Android.

## 4. AI provider and model strategy

NanoGPT is the primary model provider for this rework.

- The user already has a paid NanoGPT subscription, an API key, and models ready for use.
- Creative roleplay and primary generation do not require local inference.
- State Worker setup requires an explicit Local, API, or Disable choice; it never silently assumes an unavailable source.
- The managed Local path uses a hidden app-owned `llama.cpp` runtime and a verified 2B-class GGUF, normally delivered with first-run consent and an optional desktop offline package where distribution permits it.
- Preferences includes a Browse action for a compatible custom GGUF and preserves a one-step return to the verified managed model.
- Provider setup should make NanoGPT a first-class, understandable path rather than exposing users to an undifferentiated wall of backend terminology.
- Full connection and model management lives under **Preferences → AI & Models**.
- Model selection is duplicated in the contextual Generation panel for fast per-chat switching.
- Model selectors expose current input/output pricing and price units when NanoGPT provides them; missing or stale prices are labeled rather than guessed.
- Generation Settings are named saved bundles containing model, preset, preset configuration, Temperature, Top P, Top K, Context Size, and Response Length.
- Preset Configurations independently store named variants of a base preset’s complete rules and switches.
- Connection state and actionable provider errors should be visible inside the application.

API credentials must never be printed in the console, written into exported diagnostics, or exposed in ordinary renderer logs. Production builds should store secrets using platform-appropriate secure storage rather than plain configuration or browser storage.

## 5. Application console

The desktop application must not depend on a permanently visible external terminal.

Electron should start the required SillyTavern runtime without opening a console window and capture its standard output, standard error, lifecycle events, and application-level diagnostics. That information should be available through an in-app console.

### Placement

The console should live under **Preferences → Advanced → Console**. It is an advanced troubleshooting surface and should remain out of the normal conversation workflow unless attention is required.

### Initial console requirements

- live, scrollable application and server logs;
- log levels and source labels;
- pause/resume and auto-scroll controls;
- text filtering;
- copy selected output;
- clear the current view without deleting persistent diagnostic files;
- export a sanitized diagnostic bundle;
- explicit runtime status, start time, and restart action;
- clear visual treatment for warnings, failures, and reconnect attempts;
- automatic redaction of API keys, authorization headers, tokens, and other secrets.

Normal startup messages should remain silent. A non-intrusive status indicator can surface recoverable problems; blocking failures should open a useful error state with a direct route to the console.

Development builds may still expose or attach to a terminal when explicitly launched in a development workflow. That behavior must not leak into packaged production builds.

## 6. Experience architecture

The experience architecture organizes the product around chat, characters, personas, lore, memory, and a small number of contextual tools. Each child note defines one surface or workflow boundary so navigation remains predictable and beginner-friendly.

### Product focus

The primary workflow is rapid movement among many chats, characters, and personas. An existing chat restores its exact persona, Lorebooks, NanoGPT model, generation preset, settings, Memorybook, and tracker state. For a new chat, a Character may optionally specify a preferred model and preset; the preferred Generation Settings for that combination loads, while pinned Default Settings fills missing values or supplies the complete fallback. Persona defaults continue to fill Persona/Lorebook associations. New chats receive no memory from earlier chats. Active associations must remain visible and manually overrideable.

The default experience should expose fewer decisions than current SillyTavern. Advanced model parameters and optional extension capabilities remain available through progressive disclosure or modules instead of occupying the primary workspace.

### Desktop workspace

The selected desktop direction uses a continuous application workspace containing:

- a compact primary navigation rail;
- a searchable, organized conversation list;
- a central character conversation canvas;
- message swipe navigation and alternate-response position;
- branching, regeneration, and message-level actions;
- a persistent composer;
- a contextual inspector for active lore, generation controls, and session information;
- a top command and status area for navigation, context usage, connectivity, and fast command access.

Panels should be resizable or collapsible where useful. The center conversation must remain viable when supporting panels are hidden or space is constrained.

### Mobile workspace

The selected mobile direction prioritizes:

- the active character and conversation;
- readable, touch-friendly messages;
- swipe navigation for alternate responses;
- a compact persistent composer;
- generation controls in a bottom sheet;
- bottom navigation for Chats, Characters, Lore, Create, and More;
- progressive disclosure for tools that appear simultaneously on desktop.

Mobile should preserve feature meaning without reproducing the desktop panel arrangement.

### Preferences

Preferences will hold application-level and advanced operational controls, including provider credentials, appearance, accessibility, data and storage, extensions, updates, and the embedded console. Its final information architecture will be refined during the UX specification phase.

### Settings protection

Default Settings is the pinned, known-good Generation Settings file. Save atomically replaces the currently selected writable user settings and creates a recoverable pre-save snapshot; if that file is pinned, Save updates the active Default Settings. Export creates a separate portable file without changing the active selection. Revert to Default Settings reapplies the pinned file without deleting other settings or chat data; pinning a different default is a separate explicit action and leaves the previous file available.

Developer-authored **Factory Defaults** are a separate immutable layer defined in the [Settings, Defaults, and Versioning Specification](./SETTINGS-VERSIONING-SPEC.md). During development they are edited in a commented candidate source, then schema-validated, tested, changelog-checked, deterministically promoted, and compiled into a production module that normal application writes cannot modify. Packaging is not treated as secrecy: validators, constrained paths, atomic writable-state handling, and package integrity provide protection.

The Generation panel uses progressive disclosure: Quick Setup contains model, preset, Generation Settings, default pinning, and revert; Core Parameters contains Temperature, Context Size, Response Length, Top P, and Top K; Preset Configuration contains its rule list and switches; all remaining controls are collapsed under Advanced. Collapsed sections summarize their active state so power remains available without making the ordinary workspace bloated.

The Character editor includes an optional Advanced → Preferred Generation section for a preferred model and preset. It is never required. Only one Generation Settings file can be preferred for each model/preset combination; it auto-loads for a new chat using that pair. Missing preferences fall back visibly to pinned Default Settings instead of preventing chat creation.

### Memory and lore

Memorybooks and Lorebooks are separate systems. A Memorybook belongs to one chat and contains its rolling summary, episodic history, durable chat memories, and associated memory metadata. A new chat always starts with an empty Memorybook and never inherits memory from another chat automatically.

Lorebooks belong to or are explicitly associated with Personas and Characters. They provide reusable foundational context for new chats. Moving a learned fact from a Memorybook into a Lorebook is an explicit, reviewable user action.

Summaryception supplies the reference behavior for compressed, replaceable short/mid-term continuity. Memory Books supplies the reference behavior for durable entries, source lineage, review, consolidation, regeneration, rollback, branching, and queued work. The new subsystem will reimplement these ideas behind a first-class chat-owned Memorybook rather than merging either extension wholesale.

Scene tracking will likewise be native rather than a wholesale extension integration. Horae supplies useful roleplay-state vocabulary; Multihog supplies State Worker isolation, per-chat commit guards, history, and recovery patterns. Live Scene State is confined to ongoing tracking and Persistent Scene Memory. At extraction, each Long Memory entry receives a separate fixed Scene Details record containing its display-only one-sentence summary, time, date, participants, and location, with character facets still optional. Scene Summary never enters retrieval or model context; Tiny Recall remains separate. DnD rules and numerical game systems are deferred to an optional post-release Playing Mode.

Persistent Scene Memory does not decay with age. Its current-state cards persist until evidence, manual action, branch/source invalidation, or semantic replacement makes them no longer current; pinned verbatim messages persist until the user unpins them. Pinning defaults to a configurable ten-message limit, with an Advanced 2,000-token budget mode. Long Memory recall offers Light direct-only, Default two-hop, Deep three-hop, and Advanced-only Custom modes, each bounded by entry and context budgets. Extraction retains Memory Books' configurable 4,000-output-token baseline, while Tiny Recall is limited to a few short subject–verb statements. Failed extraction preserves the source and pending boundary and uses bounded classified retry plus one structured repair.

The default Lorebook UI will favor meaningful categories over raw ordering controls. The initial category model is World / General Lore, Locations / History, NPC / Established Knowledge, User Data, and RP Behavioral Rules. Numeric ordering and compatibility controls remain available under an advanced view where required.

### Character Card compatibility

The [Character Card Compatibility and Portability Specification](./CHARACTER-CARD-COMPATIBILITY-SPEC.md) records the audited SillyTavern V3-shaped reference card and existing import/export code. The rework accepts ecosystem-imperfect V1, V2, and V3 cards, preserves unknown root/data/extension fields, normalizes only for runtime use, and applies edits over the preserved source envelope. JSON and PNG are primary; existing CharX and other supported compatibility paths are retained where practical.

Exports are strict about the format they claim to produce. PNG V3 export carries canonical `ccv3` metadata plus a true V2 `chara` fallback; target downgrades disclose loss. App-private chat, memory, tracker, credential, path, usage, and favorite state never enters a shared card.

### Internet research

Internet research is a desired product capability. Retrieval and caching should happen outside model inference where practical, and only compact relevant evidence should enter the model context. Search can minimize token use, but evidence read by a model still consumes input/context tokens; the product will not describe grounded model use as literally token-free.

## 7. Selected visual baseline

The working direction combines **Soft Bento Studio** with **Command Palette Minimal** in two responsive compositions. The diagonal split in each image is a theme comparison, not a layout boundary: both halves describe the same continuous interface in light and dark modes.

- [Final desktop showcase](../Concept%20Arts/desktop-diagonal-theme.png) — Desktop workspace and continuous light/dark art direction.
- [Final Android showcase](../Concept%20Arts/android-diagonal-theme.png) — Portrait mobile workspace and matching light/dark art direction.

The older `11-unified-studio-desktop-light-dark.png` and `12-unified-studio-mobile-light-dark.png` remain historical explorations, not competing active baselines. The final showcases are art direction; later tracker, Cast, Memorybook, and Generation Settings contracts supersede their pictured controls. The [current workflow surface map](./WORKFLOW-SURFACE-MAP.md) records those functional homes.

These images define direction, hierarchy, density, and product character. They are not pixel-perfect specifications. Component behavior, responsive rules, accessibility states, and final design tokens must be defined before implementation.

## 8. Visual language

The baseline establishes two first-class appearance modes:

- **Light:** cool off-white and pale slate surfaces with cobalt, mint, and restrained coral accents.
- **Dark:** near-black navy and elevated blue-gray surfaces with high-clarity semantic accents.

Both modes should use the same semantic token system rather than maintaining unrelated color definitions. Contrast, focus visibility, reduced motion, scalable type, and keyboard navigation are product requirements rather than optional themes.

## 9. Rework boundaries

These boundaries distinguish the committed first-release rework from features that are optional, deferred, or intentionally removed. They keep the project ambitious without allowing compatibility and customization breadth to recreate the original interface bloat.

### In scope

- information architecture and navigation;
- desktop and mobile responsive compositions;
- design tokens and shared component foundations;
- conversation, character, lore, generation, session, and preferences experiences;
- Electron lifecycle and packaging;
- Android packaging and mobile adaptation;
- NanoGPT configuration and model usage;
- the embedded diagnostic console;
- a planned path for native extension integration.

### Not currently required

- bundled or managed local creative-generation models; existing local-provider compatibility remains in scope, and the explicitly agreed managed local State Worker is included;
- preserving every existing interface placement or interaction exactly;
- exposing server internals during normal use;
- implementing all extension integrations in the first UI milestone.

## 10. Phase 1 closure and later validation

The remaining work is divided between five product decisions needed to close Phase 1 and technical or release decisions that require later evidence. This prevents implementation detail from keeping product definition permanently open while preserving every unresolved risk.

### Phase 1 closure questions

Close settings versioning and ownership, Character Card metadata portability, Lorebook compatibility, internet-research behavior, and the exact desktop/Android v1 scopes. The scope decision also ranks Wave 1 native integrations, compatibility commitments, Character Library inclusion, desktop operating-system targets, and explicit deferrals.

### Later validation and release decisions

The final frontend framework, Android backend topology, State Worker model, provider field verification, OpenWeather distribution terms, external-source feasibility, exact design tokens and accessibility budgets, synchronization, signing, updates, and release channels require architecture spikes, measurements, legal review, or release planning. Phase 1 may close only if each has an assigned phase, validation method, and defined consequence of failure.

## 11. Decision record

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

## 12. Vault concept-note contract

The first heading of each authoritative concept document is represented in the Vault as a major document index under `Sources/`. Every subordinate heading is represented as an individual note under `Entries/`, with its own direct explanatory content, immediate-parent metadata, child links, neighboring navigation, and source provenance.

From this point forward, every newly locked idea that forms a standalone product, interaction, data, architecture, or delivery concept receives its own subordinate heading in the appropriate authoritative document. A decision table may summarize it, but a table row or unrelated paragraph cannot be its only home. Related atomic rules may remain together when they form one coherent concept, while independently understandable systems receive separate notes.

Organizational parent headings must contain a useful overview rather than functioning as empty folders. Synchronization rejects empty subordinate bodies, missing generated files, incorrect parent metadata, broken internal links, and any document root that is not rendered as an index.
