# Scene State and Visual Tracker Functional Specification

**Status:** Initial direction recorded; field and interaction details remain in definition  
**Foundation:** [Scene State and Tracker Foundation Audit](./TRACKER-FOUNDATION-AUDIT.md)  
**Related memory contract:** [Memorybook Functional Specification](./MEMORYBOOK-FUNCTIONAL-SPEC.md)

## 1. Purpose

Scene State is the application's live, chat-owned representation of the current roleplay situation. Its first purpose is to maintain continuity and drive native visual presentation without placing generated tracker bars, tags, or dashboards beneath every message.

Scene State exists only in ongoing tracking and Persistent Scene Memory. Long Memory stores separately extracted Scene Details and never copies the live tracker snapshot or event ledger wholesale.

## 2. Product principles

These principles define how native tracking supports immersion without turning the conversation into a dashboard or creating uncontrolled token costs. The child notes apply the same foundation to visuals, model delivery, and configuration.

### Visual first

Application state drives clocks, environmental presentation, character panels, dialogue colors, and later visual modules. The roleplay model supplies narrative content and, where configured, structured state changes. It never draws the interface or emits HTML/CSS tracker markup.

### Quiet in the conversation

Tracker bars do not appear under every message. The conversation remains prose-first. Persistent information lives in compact ambient indicators and an expandable inspector that the user opens intentionally.

### Token-aware, not statelessness-blind

Visuals require no model tokens. Model-facing tracker data follows an explicit delivery policy. Hosted generation APIs are stateless: if a value must govern every response, some current representation must be in that request, even when the application already knows it. The product must not promise that change-only injection preserves perfect model awareness indefinitely.

### Configurable without becoming a control wall

The ordinary interface exposes understandable presets and module switches. Per-tracker lifetimes, model-delivery policies, confidence thresholds, update cadence, prompts, and budgets live under Advanced.

## 3. Authoritative state

Each chat branch owns:

- a typed current Scene State snapshot;
- a validated state-event ledger;
- periodic recovery checkpoints;
- a Character Bank with stable identities and aliases;
- tracker configuration and model-delivery policies;
- the State Worker cursor and generation version.

New chats may inherit configuration but start with no previous-chat values or automatically discovered NPC records. Existing chats restore their exact Scene State, Character Bank, colors, relationships, history, and worker cursor. Branches share history only up to the branch point.

### 3.1 Story Continuity Profile

Fandom, era, crossover, and alternate-universe identity describe the story's continuity rather than a volatile scene. They form a compact chat-owned Story Continuity Profile:

- **Fandom:** the primary canon or setting, replacing the former Universe Fandom field;
- **Crossover:** an optional checkbox that reveals a second **Fandom** field when enabled;
- **Era:** the relevant canonical or historical period, replacing Timeline;
- **AU (Alternate Universe):** an optional checkbox declaring that established roleplay continuity may intentionally diverge from canon.

When Crossover is off, the second Fandom field is hidden and omitted from model context. When AU is on, current roleplay state, explicit user direction, and established chat memory take precedence over conflicting canon chronology, outcomes, and timeline-dependent Lorebook material. AU does not disable all fandom lore; it changes the authority of canon when canon conflicts with what this chat has established.

The Story Continuity Profile is stored with the exact chat state and is editable from the relevant setup and continuity surfaces. A compact model-facing representation might be `Fandom: Harry Potter × Marvel | Era: Fourth Year | AU`. Keeping this line Always current is the recommended default because its governing meaning is persistent and its token cost is small, but that delivery choice remains configurable and awaits final confirmation.

## 4. Tracker lifetimes

Every tracker declares a lifetime independently from how it is displayed or sent to a model.

| Lifetime | Behavior | Initial candidates |
| --- | --- | --- |
| Persistent | Carries forward until explicitly changed or cleared | Fandom/Crossover/Era/AU profile, clothing, disguise, visible condition |
| Progressive | Carries forward and normally advances | Date and time |
| Scene-bound | Replaced or explicitly cleared when the scene changes | Location and characters present now |
| Volatile | Re-evaluated when evidence changes; retires only for an evidenced or manual semantic reason | Mood and current activity |
| Manual lock | Automatic workers cannot modify the value until unlocked | Any user-corrected field |

Omission always means **no change**. Set, replace, add, remove, clear, expire, and lock are explicit operations. Empty cast and unknown location are valid explicit states.

Here, expire means evidence-based semantic retirement, never age-, turn-, relevance-, or probability-based decay. Scene-bound fields are reconciled at boundaries, not erased just because a new scene began. Persistent Scene Memory retains the last supported value until replacement, invalidation, or explicit clearing.

## 5. Model-delivery policies

Every tracker independently chooses one of four policies:

| Policy | Model behavior | Intended use |
| --- | --- | --- |
| Visual-only | Never enters model context | Dialogue color, animation choice, decorative state |
| On change | Included after a validated change and again at defined re-anchor boundaries | Time phase, location, ambient weather, and non-critical visual changes |
| When relevant | Retrieved when the scene, character, action, or explicit cue requires it | Character dossiers, relationships, clothing details |
| Always current | A minimal current value appears in every relevant roleplay request | Critical continuity such as present cast or the Story Continuity Profile when enabled |

The default policy is chosen per built-in tracker and remains configurable. The context inspector shows exactly which values were included and why.

On-change delivery avoids a duplicate tracker line only while the current fact is demonstrably represented in the assembled request. Re-anchor when it is absent, even if it was sent on an earlier request. A manual Time Skip may have no prose evidence and therefore need repeated compact anchoring. Provider caching can affect billing, not this representation requirement. See [request-aware delivery](./IMPLEMENTATION-CONTRACTS.md#4-request-aware-on-change-delivery).

### 5.1 Location delivery

Location defaults to **On change**. A validated location change is included in the next eligible roleplay request, after which recent conversation prose normally carries it forward without a duplicate tracker line. When the originating evidence is about to leave the retained recent context, Short Memory or Persistent Scene Memory re-anchors the current location. A context-compaction boundary, branch restoration without the source change, or explicit user correction may therefore make the current value eligible once again without sending it on every message.

### 5.2 Time-phase delivery

The active time phase follows the same On-change and re-anchor behavior. Its hour range is never injected; the model receives only a compact label such as `Time: Late Morning` after the phase changes or requires re-anchoring.

## 6. Initial visual surfaces

The first-release tracker appears through three application-owned surfaces: the scene clock, the optional environmental layer, and the collapsible Cast panel. They render validated state without inserting generated tracker cards into the conversation.

### 6.1 Scene clock

A compact clock sits in the upper-left area of the conversation interface. It represents one semantic phase of the fictional day rather than an exact simulated time.

- The dial is divided into the configured day-cycle sectors and highlights the active one.
- A single approximate hand may point within the active sector, normally at its midpoint; it never claims a precise minute.
- The active phase label remains readable without interpreting the hand.
- Unknown time produces an intentionally ambiguous state rather than a fabricated phase.
- Clicking or tapping opens the forward-only Time Skip HUD.
- No seconds, minutes, or hidden exact timestamp advance behind the interface.
- Neither real elapsed time nor message count advances the phase.
- A conversation can remain in one phase for any number of turns.
- Narrative evidence, an explicit time skip, a validated State Worker proposal, or manual correction changes the phase.
- Date remains a separate approximate/known tracker and does not advance merely because the phase changed.
- The phase is injected On change and at context re-anchor boundaries, never with every message.

#### 6.1.1 Default nine-phase day cycle

The following cycle is the first-release default. Its ranges explain each phase and position it on the visual dial; they do not create exact story time or force the listed events to occur.

| Phase | Reference range | Illustrative context only |
| --- | --- | --- |
| Dawn | `05:00–07:00` | Early commutes and patrol shifts; characters waking, preparing gear, or reviewing plans; quiet streets and low activity |
| Morning | `07:00–10:00` | Work and school beginning; briefings or assignments; cafés, shops, and transit becoming active |
| Late Morning | `10:00–12:00` | Research, fieldwork, errands, appointments, scouting, surveillance, and increasing social activity |
| Noon | `12:00–14:00` | Lunch breaks and crowded public spaces; neutral-location meetings or confrontations; peak heat, noise, or busyness |
| Afternoon | `14:00–17:00` | Continuing work, approaching deadlines, travel, deliveries, operations, and open institutions |
| Evening | `17:00–20:00` | Homeward commutes, nightlife beginning, social gatherings, dates, and a shift from business to leisure |
| Night | `20:00–00:00` | Entertainment peaks, covert operations or stakeouts, street activity, and fewer civilians in many areas |
| Midnight | `00:00–02:00` | Quiet outside nightlife zones; secretive or high-risk action; introspection and late-night conversations |
| Deep Night | `02:00–05:00` | Almost empty streets, minimal witnesses, exhaustion, all-nighter mistakes or breakthroughs, emergency and unusual activity |

These cues are explanatory metadata for users, prompts, and testing. They are not schedules, event triggers, genre requirements, or claims about every setting. Advanced settings may rename phases, change reference ranges and descriptions, or replace the cycle for fictional worlds, while validation prevents gaps, overlaps, and invalid ordering unless a deliberately nonstandard calendar supports them.

#### 6.1.2 Forward-only Time Skip HUD

Clicking or tapping the visual clock opens a compact HUD built around the same nine-segment dial. It is an intentional story-time control, not a precise clock editor.

- The current phase is highlighted and cannot be selected as a no-op.
- Every other segment means the **next chronological occurrence** of that phase. The dial never moves backward.
- A selection may cross several phases, but the first-release HUD cannot skip more than one full cycle at once. Longer calendar jumps belong to the separate date/calendar controls.
- Before applying, the HUD previews the target phase and whether it occurs **later today** or on the **next day**.
- The application follows the configured phase order and detects the calendar boundary explicitly. In the default cycle, the date advances once whenever the forward path crosses from Night into Midnight.
- Crossing from Midnight through Deep Night into Dawn does not advance the date again; those phases already belong to the new calendar day.
- If a complete date is known, a boundary crossing increments it through the active calendar, including month and year rollover. If the date is unknown or partial, the system records a relative day advance without inventing missing calendar information.
- Applying the skip atomically updates phase and any resulting day/date state as one attributable Scene State event.
- The next eligible model request receives one compact change such as `Time skip: Morning — next day`; subsequent requests do not repeat it unless a normal context re-anchor is required.
- Cancel closes the HUD without changing state. Branch restoration and the normal state-history controls can restore an earlier state, but the clock HUD itself never offers reverse time travel.

The interface may animate the hand moving forward through the crossed sectors, but the animation is presentation only. It must respect reduced-motion settings and must not create intermediate model updates for every crossed phase.

### 6.2 Environmental layer

The conversation background may reflect current sky, lighting, weather, season, or universe-specific ambience. It is a renderer over state, not generated HTML.

Weather presentation has exactly two GFX levels when the feature is enabled. A separate Off switch disables weather presentation entirely and is not treated as a third GFX level.

#### 6.2.1 Static and Animated GFX levels

**Static** is the default low-impact presentation. A compact widget-style weather indicator sits beside or immediately near the scene clock. It uses an application-owned condition icon and short label such as Clear, Overcast, Rain, Storm, Snow, Fog, or Wind. It does not animate the conversation background.

**Animated** retains the same compact indicator and adds a weather-responsive background across approximately the upper third of the conversation surface. That region represents the current sky and atmosphere without turning the entire chat into a moving wallpaper. The visual direction may borrow the clarity and restrained motion of modern phone weather applications, but the exact art style remains open for later concept work.

The animated region is fixed to the conversation viewport rather than embedded in message content. A readability mask or gradient separates it from prose, and message contrast remains authoritative over decorative art. Weather changes transition visually without generating extra model calls. Reduced-motion, accessibility contrast, low-power, battery, performance, and mobile-thermal safeguards fall back to Static rather than creating additional user-facing GFX levels.

### 6.3 Cast panel

A collapsible video-game-like panel lists the current cast and known Character Bank records without attaching a tracker card to every message.

When the whole panel is collapsed, it occupies only its compact launcher and cast count. Expanding it reveals the character list and a clearly visible `+` action for manual character creation. Card Characters, discovered NPCs, and promoted Recurring Characters enter the same list with their type visibly distinguished.

Each character item is independently collapsible:

- **Reduced item:** name, current mood, and relationship with the active Persona, including its label and compact meter.
- **Expanded item:** all enabled tracked information, grouped so that identity, scene continuity, relationship, and advanced history do not become one long form.

The confirmed expanded fields are:

- name;
- age, including unknown or approximate values rather than invented precision;
- relationship label and `-100` to `+100` disposition meter toward the active Persona;
- general role or occupation, such as *fourth-year student*;
- current activity, such as *having breakfast*;
- current mood;
- visible clothing;
- salient inventory limited to active or relevant objects.

“Current activity” is stored separately from general occupation even if the interface visually groups them. Inventory is not an exhaustive possession list: Harry's wand may be tracked while ordinary glasses, coins, and background belongings remain omitted. A relevant item can record whether it is carried, nearby, missing, transferred, broken, or otherwise unavailable. Adding, removing, transferring, and changing an item's state are explicit events.

The confirmed additional continuity and identity fields are:

- presence: in scene, nearby, off-scene, or unknown;
- visible condition: injured, exhausted, wet, intoxicated, unconscious, transformed, disguised, or another concise observable state;
- pronouns and species/type when relevant to the setting;
- dialogue color as application-owned presentation;
- aliases and spelling variants;
- an optional portrait/avatar;
- a Lorebook Entry link for direct user navigation and editing.

Presence and visible condition ship in the first release because they prevent frequent continuity errors. Pronouns, species/type, and aliases are supported but can remain absent when irrelevant. Portrait/avatar support is optional and can be hidden globally or per user preference. Hidden motives, secrets, exhaustive biographies, private thoughts, and complete inventories belong in character or memory data rather than the default Cast panel.

The compact list never expands merely because automatic state changed. Dossier, provenance, field history, relationship history, locks, merge/split controls, and advanced editing remain progressively disclosed.

## 7. Weather sources

Weather remains a pluggable state source independent from its Static or Animated presentation. It supports three initial source modes:

1. **Off/manual:** no automatic source; the user or deterministic event changes it.
2. **In-universe:** the State Worker extracts or proposes fictional weather from narration.
3. **Real-world linked:** OpenWeather updates state from an explicitly selected real location.

Changing the source does not change the two available GFX levels. Fictional and real-world weather normalize into the same application-owned condition vocabulary.

### 7.1 OpenWeather provider

OpenWeather is the selected first-party provider for Real-world linked mode, subject to the distribution-license gate below. Its current-weather service documents coordinate-based coverage for any location on Earth, and its Geocoding API resolves a user-selected place into the latitude and longitude required by the weather request.

The integration uses a user-provided OpenWeather API key stored through the desktop operating-system credential store or Android Keystore. The key never enters chat data, exports, prompts, logs, or renderer-visible configuration. Weather requests run outside both the roleplay model and State Worker.

The application consumes only the current conditions required by the native weather state. Forecast breadth, polling cadence, caching, retry limits, and offline staleness thresholds remain configurable implementation decisions; presentation mode never increases request frequency by itself.

Official references: [OpenWeather Weather API](https://openweathermap.org/api), [Current Weather API](https://openweathermap.org/api/current), and [Geocoding API](https://openweathermap.org/api/geocoding-api).

### 7.2 Location and provider privacy boundary

Real-world linked mode is opt-in. Coordinates and location history remain local except for the minimum sent to the selected weather provider. The UI shows provider, last update, forecast age, and offline fallback. Precise forecast data is normalized into a compact visual state such as rain, overcast, clear night, snow, heat, or strong wind.

OpenWeather's published privacy policy states that it records API usage counts and products but does not collect or store API-request parameters such as locations, ZIP codes, city names, units, or formats, and does not collect or store the API request's IP address or user agent. This provider statement supports the selection but does not remove the application's own privacy obligations.

The application therefore keeps the chosen label, coordinates, cached normalized weather, and location history locally. It sends only the coordinates and authentication required for the weather request, never sends a real-world location to NanoGPT or the roleplay model, and exposes a clear Disconnect/Clear Location action. Manual place search is the recommended default; device geolocation remains a separate explicit permission decision for desktop and Android.

Official reference: [OpenWeather Privacy Policy](https://openweather.co.uk/privacy-policy).

### 7.3 Normalization and model delivery

The visual can update without involving either model. The recommended model policy is On change: when a meaningful weather category changes, a compact update enters the next eligible roleplay request once. Users may choose Visual-only, When relevant, or Always current instead.

Provider fields are normalized locally into the small tracker vocabulary used by both GFX levels. Temperature, wind, precipitation, cloud cover, and day/night data may refine the icon or animation, but the roleplay model receives only the configured compact weather meaning rather than the raw provider response.

### 7.4 OpenWeather attribution and distribution gate

OpenWeather is selected for product design, but official deployment cannot ship the integration until the chosen subscription license has passed compatibility review. OpenWeather's published license materials state that Free, Startup, and Developer access uses an open license with visible attribution and ShareAlike requirements for derivative solutions. Professional and Expert business licenses remove ShareAlike but retain attribution; Enterprise may remove attribution under its agreement.

When attribution is required, the weather detail/source surface must visibly provide “Weather data provided by OpenWeather,” a link to OpenWeather, and the required logo without bloating the collapsed clock widget. The exact placement will be resolved during visual design. The project must confirm the applicable OpenWeather plan, compatibility with the application's distribution license, branding placement, caching rights, and APK/desktop redistribution terms before the release gate passes.

Official references: [OpenWeather License Explainer](https://openweathermap.org/storage/app/media/documents/License_explainer_25_Feb_25.pdf) and [OpenWeather FAQ](https://openweathermap.org/faq).

## 8. Character Bank

The Character Bank is the chat-relative registry for card characters, discovered NPCs, and promoted recurring characters. It owns stable identity, aliases, editable continuity fields, relationships, provenance, and branch-safe history.

### 8.1 Ownership

The Character Bank is chat-relative because its automatically learned NPCs and relationships arise inside that conversation. A new chat does not inherit another chat's Bank. Explicit export, import, or promotion into Character/Persona Lorebook data may be designed later.

### 8.2 Minimal native record

Each character record requires:

- stable opaque character ID;
- display name;
- aliases and spelling variants;
- optional age, pronouns, and species/type values;
- origin: Character Card, Persona, detected NPC, or manual NPC;
- first-seen and last-seen stable message references;
- current presence state;
- user-selected or automatically assigned dialogue color;
- optional portrait/avatar;
- enabled continuity facets;
- relationship edges and change history where enabled;
- optional stable Lorebook Entry links;
- manual locks and complete provenance.

Large generated biographies, secrets, image tags, and speculative inner circles are not required by the base Bank.

### 8.3 Discovery

There is no provisional-character state. Discovery uses three explicit types:

1. **Card Character:** seed explicit individual card identity and validated structured members when available. A group-card title is an envelope identity, not an invented individual. Additional prose-defined members require an editable cast list or evidence-backed discovery; import never claims to enumerate a complete cast from prose alone.
2. **NPC:** created when a previously unknown speaker is attributed or when the State Worker identifies a named non-speaking participant supported by narrative evidence.
3. **Recurring Character:** an NPC promoted after sustained participation or an explicit user action.

The `Name:` format is parsed deterministically and resolved through stable identities and aliases. Novel-style dialogue uses the attribution path defined in the Dialogue Colorizer section. An unknown attributed speaker becomes an NPC immediately rather than entering a provisional queue.

Each NPC has a branch-aware speaking-turn counter. It increments once for each canonical roleplay turn containing at least one attributed spoken line from that NPC. Multiple lines within one turn count once. Swipes, regeneration, editing, deletion, rewind, and branching replay the count from stable source-message evidence rather than permanently incrementing a global number.

Speaking evidence identifies generation/Continue segments within messages, including revisions and active swipe lineage. Alias collisions require stable-ID disambiguation; equal display names do not justify merging two people. These safeguards do not introduce a provisional NPC state.

The promotion threshold is configurable and defaults to 25 attributed speaking turns. Reaching it promotes the NPC to Recurring Character and enables the configured fuller continuity treatment. Promotion does not create a portable Character Card, copy chat knowledge into another chat, or generate a Lorebook entry. Those remain explicit user actions. Manual Add Character, Promote, Demote, rename, merge, split, alias, ignore, and delete remain available.

### 8.4 Field lifetimes and updates

Character fields use the common lifetime model. Stable identity fields can be locked; clothing can persist until changed; activity is volatile; mood is qualitative and volatile; relationships update only when evidence establishes a change.

Automatic updates are typed, source-attributed events with before and after values. Each update can be undone. Rewinding, editing, deleting, swiping, regenerating, or branching source messages replays or invalidates dependent updates using stable IDs rather than numerical positions.

### 8.5 Persona relationships

The first release tracks one directed relationship from each Character Bank identity to the active Persona attached to the chat. The relationship has two synchronized presentations:

- a visual disposition meter from `-100` to `+100`, with `0` as the neutral center;
- a short descriptive adjective.

The meter represents overall disposition toward the Persona rather than romance, morality, obedience, or a game reward. The qualitative label makes the state understandable without requiring the user to interpret a number. The following initial defaults are locked for the current design pass while remaining configurable and alterable later:

| Score | Default label |
| --- | --- |
| `-100` to `-76` | Hostile |
| `-75` to `-51` | Antagonistic |
| `-50` to `-26` | Distrustful |
| `-25` to `-11` | Wary |
| `-10` to `+10` | Neutral |
| `+11` to `+25` | Receptive |
| `+26` to `+50` | Friendly |
| `+51` to `+75` | Trusting |
| `+76` to `+100` | Devoted |

The application derives the default label from the score so ordinary updates do not require another generation call. The settings can rename labels and change their score boundaries. Creative manual control may directly set the score and resulting label together; Realistic manual control uses only its bounded influence actions.

Relationship state is persistent for the chat and keyed to both stable Character and Persona identities. It changes only when story evidence establishes a meaningful shift. Routine pleasantries do not increment a score on every message. A configured automation source may emit a compact relationship event with direction, magnitude, and source references; the application validates and applies the resulting delta. Change sensitivity, maximum automatic delta, label thresholds, manual locks, and automation can all be configured. Every change is attributable, reversible, and branch-safe.

The meter and numeric score are Visual-only by default. When a relationship is relevant to generation, the roleplay model receives the short qualitative label for the involved present character rather than the full history or relationship panel. Numeric score injection remains an Advanced option.

Character-to-Character relationships are deferred beyond the first release. The data model may later support them as a sparse directed graph rather than generating every possible pair. Only evidence-backed edges would exist, only relationships involving the current cast or an explicit cue would be retrieved, and the existing State Worker pass would update them without a dedicated relationship-model call.

#### 8.5.1 Automation sources

Relationship automation supports three selectable sources:

1. **State Worker — default:** the dedicated worker analyzes only new story material plus compact relevant relationship state. Its relationship results are bundled with the same pass used for other trackers rather than creating a dedicated model call.
2. **Main-model extraction request — backup:** an explicit separate request uses the creative model with the worker schema and frozen evidence, independently of the prose preset. A same-response **Main Model Sidecar** is a distinct, capability-gated optional transport, not a portable fallback guarantee.
3. **Manual only:** no model may modify relationships.

The creative roleplay preset may define the desired characterization and speaker format, but tracker extraction has a separate versioned schema and instruction block. This prevents changing a prose preset from silently breaking relationship bookkeeping. If the main-model sidecar is selected, its structured tracker contract is composed alongside the creative preset rather than embedded as visible tracker markup.

The State Worker is the first-release default. The explicit main-model extraction request is the portable backup candidate if testing finds the worker inadequate; its schema support, cost, and latency must also be tested. A same-response sidecar is available only where separately demonstrated. Both share commit guards and are accounted for according to the [capability matrix](./IMPLEMENTATION-CONTRACTS.md#5-worker-capabilities-and-cost).

Runtime failover is explicit rather than silent. A failed or late State Worker result creates no relationship change and cannot be followed by a second source committing the same evaluation window unnoticed. Any automatic fallback mode must share the same job ID and commit guard so at most one source can commit. Default automatic per-job failover remains off until evaluation proves it safe and worthwhile.

#### 8.5.2 Score and automatic-update validation

The stored relationship score is always an integer between `-100` and `+100` and is quantized to multiples of five, yielding 41 stable positions including neutral. Creative mode's “any value” means any permitted position on that full scale rather than only a small delta.

Models never write the final score directly. They propose an event containing the stable Character and Persona IDs, signed delta, evidence message IDs, and a concise reason category. The application then:

- rejects malformed, unsupported, stale, or unattributed proposals;
- enforces integer and configured step-size rules;
- clamps the final score to the valid range;
- aggregates multiple proposals for the same relationship within one evaluation window;
- applies configured automatic-delta and cadence limits;
- refuses automatic updates while the relationship is locked;
- records before/after values and provenance for undo and branch replay.

The automatic scale is `±5` for a meaningful development and `±10` for a major or pivotal development, with no automatic jump larger than ten.

After any accepted non-Creative relationship change, the application protects its direction for five canonical roleplay turns. A non-pivotal proposal in the opposite direction during that window is rejected and recorded as suppressed rather than queued to apply later. A clearly evidenced pivotal event may bypass the reversal guard but remains subject to the `±10` maximum, validation, provenance, and undo. Creative direct setting intentionally bypasses the reversal guard; its optional lock can then prevent further automation.

Exact evidence classification and same-direction aggregation rules remain to be validated against actual roleplay transcripts.

#### 8.5.3 Manual adjustment modes

The user chooses one of two manual-control modes:

- **Realistic:** manual controls influence the current score only by `-10`, `-5`, `+5`, or `+10`. A five-point influence starts a five-turn cooldown; a ten-point influence starts a ten-turn cooldown. The interface shows the remaining cooldown. Realistic mode does not expose arbitrary jumps or locking.
- **Creative:** the user may directly set any permitted score from `-100` to `+100`, without a turn cooldown, and may lock or unlock the relationship. A lock prevents every automatic source from changing the value until the user unlocks it.

The Realistic cooldown counts canonical roleplay turns using the same counter as Short Memory. Manual changes enter the same attributable event history as automatic changes and can be undone. Switching modes never changes an existing score or removes its history.

### 8.6 Lorebook Entry link

A Character Bank record may expose a direct shortcut to a Lorebook Entry associated by the user with that character. This is navigation metadata, not memory or activation metadata.

- An unlinked card offers **Link Lorebook Entry** and, where appropriate, **Create Lorebook Entry**.
- A linked card offers **Open Lorebook Entry**, plus explicit relink and unlink actions.
- Opening the shortcut presents the existing Lorebook editor without losing the Cast panel's place or expansion state.
- The link stores a stable entry identifier rather than a title, position, path, activation tag, or copy of the content.
- Renaming, recategorizing, or moving the entry does not break the link.
- Deleting or making the target unavailable produces a visible repairable broken-link state; it never silently selects another entry.
- Creating, linking, unlinking, opening, or navigating through the shortcut never activates, injects, reprioritizes, enables, disables, or duplicates the entry.
- Editing the entry may naturally affect later model context only through that entry's ordinary Lorebook activation rules, exactly as if it had been opened from the Lorebook workspace.

The initial interface shows one primary Lorebook shortcut to avoid clutter. The storage contract may support additional links later, but they remain behind progressive disclosure unless a concrete workflow requires them. A chat-discovered NPC may link to an entry in a user-selected Character- or Persona-relative Lorebook through an explicit user action; automatic discovery never promotes chat memory into reusable Lorebook knowledge.

## 9. Native Dialogue Colorizer

Dialogue color is application-owned Visual-only state stored on the stable Character Bank identity.

The product supports exactly two dialogue-format modes:

1. **Name label:** spoken dialogue begins with `Name:`. The native parser resolves the name through aliases and applies the Character Bank color.
2. **Novel dialogue:** ordinary quoted prose and dialogue tags are preserved without visible speaker labels.

Speaker parsing fails safely. Ambiguous colons, headings, times, and prose are not treated as characters.

### 9.1 Novel-dialogue attribution

Model-generated HTML is not the default novel-dialogue implementation. It would otherwise mix presentation into saved prose, prevent past dialogue from following later Character Bank color changes, complicate exports and themes, and create an unnecessary untrusted-HTML sanitization surface.

By default, the application identifies quoted spans deterministically and gives each span a stable local identifier or content hash. When Colorized Dialogues and Novel Dialogue are enabled, the existing State Worker pass assigns attributable spans to stable Character Bank identities with confidence. The renderer stores these assignments as annotations separate from raw prose and applies Bank colors at display time. An explicitly configured main-model extraction request can provide the same attribution; a same-response sidecar is a separate provider-gated option. Attribution is bundled into the selected tracking pass, while rendering creates no model call.

Low-confidence or genuinely ambiguous dialogue remains in the normal theme text color rather than being colored incorrectly. Editing, regenerating, deleting, or branching a message invalidates affected annotations and recomputes them through the ordinary worker lifecycle.

If testing or personal use shows that State Worker attribution is inadequate, the user may switch Novel Dialogue Colorization to an explicit **HTML Compatibility** mode. This mode adds the required colorization instruction to the active roleplay preset. Its output is never trusted as unrestricted HTML: only the narrow dialogue-color markup contract is accepted, all other tags and attributes are stripped, scriptable content is rejected, and clean prose plus safe presentation annotations are stored wherever conversion is possible. The UI identifies compatibility-rendered messages and preserves a one-click return to State Worker attribution.

### 9.2 Color controls

Colorized Dialogues is a master checkbox and defaults off. With it off, names, narration, and dialogue all use the theme's normal foreground color—normally black or white according to the active theme.

With Colorized Dialogues on:

- each Character Bank record may define its dialogue color;
- Preferences defines fallback colors for narration/body text, unattributed dialogue, and speaker names;
- dialogue attributed to a character uses that character's Bank color;
- **Color Speaker Name** controls whether a `Name:` label shares the dialogue color;
- when Color Speaker Name is off, the name remains in the normal body-text color while only the dialogue receives the Bank color;
- Novel Dialogue has no visible name label, so only the attributed quoted text changes color;
- a user can change a Bank color once and every past and future recognized line updates consistently at render time;
- theme-aware contrast correction prevents unreadable colors in light or dark mode.

Optional accessibility treatments may include name-only color, dialogue-only color, accent bars, pattern/icon reinforcement, and colorization off. Narration remains at its configured body-text color unless a separate explicit rule applies. Unknown NPCs without a Bank color use the configured unattributed-dialogue fallback; deterministic automatic palette assignment may be offered as an option rather than forced.

## 10. State Worker and token behavior

The roleplay model never generates the visual tracker UI. When State Worker functions are enabled, the selected local or API worker receives only unprocessed messages and the relevant current subset, then returns schema-validated changes. Users may disable model-managed tracker functions during setup; deterministic and manual tracker functions remain usable.

Recommended cadence options are:

- every committed model message;
- every roleplay turn;
- every configurable number of turns;
- only after deterministic change signals;
- manual only.

Critical rules:

- jobs never block normal chat;
- late results cannot commit across chats, branches, source revisions, schemas, or state revisions;
- an unchanged result creates no delta payload, but cannot suppress an independently required context re-anchor;
- visual-only changes create no model payload;
- change-only payloads are concise and deduplicated against the actual assembled request, not merely a sent-once flag;
- field-level relevance retrieval replaces full Character Bank dossier injection;
- every model-facing contribution appears in the context inspector with its token cost.

### 10.1 Provider-aware usage protection

Usage protection is attached to the selected provider and account rather than hard-coded as a universal 60-million-token rule. The current NanoGPT subscription provides a stated allowance of 60 million tokens per week, so that benchmark activates only when NanoGPT is selected and the existing usage endpoint confirms an active subscription with a valid weekly allowance. The target user experience is several hours of roleplay per day across the full week with Short Memory, Long Memory, Scene State, and Character Continuity enabled without exhausting that allowance.

The product must therefore:

- measure reported or locally estimated input, output, cached, and auxiliary usage by provider and model;
- attribute usage to roleplay generation, Short Memory, Long Memory, State Worker, search/research, retries, and manual tools;
- use an authoritative provider-reported allowance and reset time where available;
- otherwise use a clearly labeled user-configured allowance with a local per-call ledger, never a guessed provider limit;
- show projected weekly use and warn before the allowance is at risk;
- support configurable soft-warning, conservation, and reserve thresholds;
- preserve normal roleplay generation before optional background intelligence when conservation activates;
- batch all tracker and relationship changes into the same State Worker pass;
- process only new source material plus compact relevant state rather than repeatedly scanning the full chat;
- create no model calls for clock rendering, color rendering, environmental rendering, or real-world weather retrieval; model-assisted time inference and novel-dialogue attribution remain accounted worker operations;
- benchmark representative long-running chats before claiming that the full setup stays within 60 million weekly tokens.

The agreed defaults warn at 80% of the applicable allowance, enter protection at 90%, and retain the final 10% as visible reserve. Warning and Protection are user settings with validation that keeps Warning below Protection. Providers without any authoritative or user-configured allowance show usage without claiming that protection can be enforced reliably. Local inference is tracked separately for latency and device load and consumes no cloud-token allowance.

## 11. Decisions recorded

| ID | Decision | Status |
| --- | --- | --- |
| `TRK-001` | Native visual trackers replace model-rendered bars, regex dashboards, and tracker cards beneath messages. | Agreed direction |
| `TRK-002` | The lifetime model separates Persistent, Progressive, Scene-bound, Volatile, and Manual-lock behavior. | Agreed direction |
| `TRK-003` | Every tracker declares Visual-only, On change, When relevant, or Always-current model delivery. | Agreed direction |
| `TRK-004` | A scene clock occupies the upper-left conversation area and renders the current time window with an approximate needle when possible. | Agreed direction |
| `TRK-005` | Environmental visuals may reflect state and support real-world linked weather without requiring model management. | Agreed direction |
| `TRK-006` | A collapsible Cast panel provides game-like access to characters, moods, relationships, and continuity without interrupting prose. | Agreed direction |
| `TRK-007` | The Character Bank supports automatic discovery and manual creation; learned records remain chat-relative. | Agreed direction |
| `TRK-008` | Dialogue colors belong to Character Bank identities and are applied by the renderer from speaker labels, never emitted as model HTML. | Agreed direction |
| `TRK-009` | MeguminSuite is a design reference for discovery, field lifetimes, change-only updates, and undo; direct integration/reuse is not selected. | Agreed direction |
| `TRK-010` | Each first-release Character Bank identity has a directed relationship to the active Persona, shown as both a `-100` to `+100` meter and a descriptive label. | Agreed |
| `TRK-011` | Character-to-Character relationship tracking is deferred; a later version may use sparse, relevant-only edges without dedicated model calls. | Agreed |
| `TRK-012` | The full enabled system must be benchmarked and budgeted for sustained use within the current 60-million-token weekly NanoGPT allowance. | Agreed requirement |
| `TRK-013` | The Cast panel expands into a character list with manual Add Character; each item reduces to name, mood, and Persona relationship and expands into grouped continuity fields. | Agreed |
| `TRK-014` | The initial nine relationship labels and bands are locked as editable defaults for the current design pass. | Agreed |
| `TRK-015` | Salient inventory tracks only active or relevant objects and explicit item-state changes, never an exhaustive possession list. | Agreed |
| `TRK-016` | Presence and visible condition ship as first-release Cast continuity fields. | Agreed |
| `TRK-017` | Pronouns, species/type, dialogue color, aliases, and optional portrait/avatar belong to the Character Bank and expanded Cast item. | Agreed |
| `TRK-018` | A Character Bank item may link directly to one primary Lorebook Entry as a user-only editing shortcut with no activation or injection side effects. | Agreed |
| `TRK-019` | Location defaults to On change and is re-anchored at context-loss boundaries instead of being injected with every message. | Agreed |
| `TRK-020` | Replace Universe Fandom and Timeline with a Story Continuity Profile containing primary Fandom, conditional crossover Fandom, Era, and AU. | Agreed |
| `TRK-021` | AU makes established roleplay and chat memory authoritative over conflicting canon chronology or timeline-dependent lore without disabling all fandom lore. | Agreed |
| `TRK-022` | Relationship scores are application-validated integers in the inclusive `-100` to `+100` range; models propose attributable deltas and never write final scores directly. | Agreed |
| `TRK-023` | Manual relationship controls have Realistic and Creative modes: bounded cooldown-limited influence versus direct setting and locking. | Agreed |
| `TRK-024` | Every relationship value is quantized to a multiple of five in both Realistic and Creative modes. | Agreed |
| `TRK-025` | State Worker is the default; a main-model backup is retained for evaluation. Separate-request extraction and provider-gated same-response sidecar are distinct transports, as clarified in the capability matrix. | Main-model backup agreed; transport clarification 2026-09-05 |
| `TRK-026` | Automatic relationship changes are limited to `±5` or `±10`, with an absolute automatic maximum of ten points per accepted change. | Agreed |
| `TRK-027` | Realistic `±5` influence has a five-turn cooldown and `±10` influence has a ten-turn cooldown. | Agreed |
| `TRK-028` | Accepted non-Creative changes receive five-turn reversal protection; only a pivotal evidenced event may bypass it. | Agreed |
| `TRK-029` | There are no provisional characters: cards seed Card Characters, unknown attributed speakers become NPCs immediately, and sustained NPCs may become Recurring Characters. | Agreed |
| `TRK-030` | NPC promotion counts one attributed speaking participation per canonical roleplay turn and defaults to a configurable 25-turn threshold. | Agreed |
| `TRK-031` | Only Name-label and Novel Dialogue formats are supported. | Agreed |
| `TRK-032` | Novel Dialogue colorization defaults to State Worker span annotations; explicit sanitized HTML Compatibility remains available if testing or personal use finds it inadequate. | Agreed |
| `TRK-033` | Colorized Dialogues defaults off; when enabled, Bank dialogue color and the Color Speaker Name option control whether name and dialogue share the color. | Agreed |
| `TRK-034` | Story time is an approximate semantic phase with no advancing minute-level timestamp. | Agreed |
| `TRK-035` | The default cycle is Dawn, Morning, Late Morning, Noon, Afternoon, Evening, Night, Midnight, and Deep Night using the agreed reference ranges. | Agreed |
| `TRK-036` | Time phase defaults to On change with context-boundary re-anchoring; only the phase label enters model context. | Agreed |
| `TRK-037` | Day-cycle example activities are explanatory only and never become automatic events or setting assumptions. | Agreed |
| `TRK-038` | Clicking the clock opens a forward-only Time Skip HUD where every selectable phase means its next chronological occurrence. | Agreed |
| `TRK-039` | A manual skip detects calendar rollover from the configured midnight boundary; the default cycle advances the date when the path crosses Night into Midnight. | Agreed |
| `TRK-040` | A manual skip commits phase and resulting day/date changes atomically and produces one compact On-change model update. | Agreed |
| `TRK-041` | Enabled weather presentation has exactly two GFX levels: a Static clock-adjacent indicator and an Animated upper-third conversation sky. | Agreed |
| `TRK-042` | OpenWeather is the selected provider for Real-world linked weather, subject to distribution-license validation before release. | Agreed with release gate |
| `TRK-043` | Real-world location remains opt-in and local except for the minimum coordinates and authentication sent directly to OpenWeather; it never enters NanoGPT or roleplay prompts. | Agreed direction |
| `TRK-044` | Weather visuals update without model calls; only normalized compact weather meaning follows the configured delivery policy. | Agreed direction |
| `TRK-045` | The managed local State Worker uses an app-owned hidden `llama.cpp` runtime and a tested 2B-class GGUF; final default model selection follows in-context evaluation of the three named candidates. | Agreed |
| `TRK-046` | Initial setup requires Local, API, or explicit disabling of State Worker functions; declining both inference paths never silently leaves automation half-configured. | Agreed |
| `TRK-047` | Local model selection includes Browse for a compatible user-supplied GGUF, with validation before activation and a route back to the verified managed model. | Agreed |
| `TRK-048` | The worker runs asynchronously after committed model turns, coalesces pending work, and never delays roleplay generation. | Agreed |
| `TRK-049` | Genuine provider streaming may display live arrival, but an already-complete response appears immediately in full; artificial Smooth Streaming is excluded. | Agreed |
| `TRK-050` | Worker input/output limits are configurable Advanced settings; defaults remain 8,192 input and 512 output tokens, and routine output is a factual delta rather than regenerated prose or imagined state. | Agreed baseline |
| `TRK-051` | The usage priority order is roleplay, Short Memory, due Long Memory, explicit tools, then automatic fallback/research/enrichment; Warning and Protection default to configurable 80% and 90%. | Agreed |
| `TRK-052` | The 60-million weekly benchmark activates only for a detected active NanoGPT subscription; every provider uses an accounting adapter based on authoritative reporting, local ledger, or explicitly labeled estimates. | Agreed |
| `TRK-053` | Reuse SillyTavern's atomic writes, backups, abort signals, provider profiles, structured-output transport, and NanoGPT usage endpoint, while adding a dedicated branch-safe worker transaction, validation, retry, and replay layer. | Agreed after audit |

## 12. Open decisions

1. Do present cast and the compact Story Continuity Profile default to Always current as recommended?
2. Which evidence threshold and same-direction aggregation rules prevent noisy relationship changes?
3. How long does an On-change value remain eligible if no generation occurs immediately after the change?
4. Does device geolocation ship, or does first release use manual place search only?
5. Which OpenWeather subscription/license passes distribution review, and where does required attribution appear without bloating the clock widget?
6. What refresh cadence, offline staleness threshold, animation style, asset format, and mobile performance budget apply to weather?
7. What measured usage profile passes each provider-specific acceptance benchmark after real telemetry is available?

## 13. Tracker technical limits

These limits are the agreed first implementation baseline. Numeric worker limits remain editable in Advanced settings and must be calibrated through the labeled in-context evaluation before release. The limits keep live tracking timely and recoverable while preserving roleplay generation as the product's primary workload.

### 13.1 Local State Worker model and delivery

Make a local 2B-class model a first-class State Worker path rather than a future experiment. The first evaluation candidate is **Qwen3.5-2B** in text-only, non-thinking operation: its official model card identifies an exact 2B post-trained model, Apache-2.0 licensing, and broad multilingual support. **Qwen3-1.7B** remains a simpler comparison candidate, with **SmolLM2-1.7B-Instruct** as an additional permissively licensed baseline. All three will be tested in the working interface against the same labeled roleplay fixtures. Final selection follows tracker accuracy, determinism, latency, memory footprint, and recovery behavior rather than general chat benchmarks.

Use `llama.cpp` as the managed native GGUF runtime behind the State Worker adapter. The application owns the process or native library, never opens a terminal, and sends logs to Preferences → Advanced → Console. Use one reproducible Q4-class quantization made from a pinned official checkpoint; publish its model card, license notice, source revision, quantization recipe, exact byte size, and cryptographic checksum.

Prefer a consented first-run/onboarding download on both platforms even when redistribution is allowed. This keeps the normal installer small, lets users decline local inference, and permits independent model replacement. Desktop may later offer a separate offline installer that includes the verified model. Android should use resumable on-demand delivery rather than place a roughly gigabyte-scale model in the base package. The app verifies a signed manifest and checksum before activation, stores the model in application-private data, supports pause/resume/retry/removal, and never silently downloads over a metered connection.

Qwen's Apache-2.0 license permits redistribution when its conditions and notices are preserved; `llama.cpp` is MIT-licensed. Packaging remains subject to a release-time dependency and notice audit. Current official Android documentation limits the compressed base module generated from an App Bundle to 200 MB and supports larger on-demand assets, which makes first-run or asset delivery the practical mobile path regardless of model licensing.

Official references: [Qwen3.5-2B model card](https://huggingface.co/Qwen/Qwen3.5-2B), [Qwen3-1.7B model card](https://huggingface.co/Qwen/Qwen3-1.7B), [SmolLM2-1.7B-Instruct model card](https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct), [llama.cpp](https://github.com/ggml-org/llama.cpp), and [Android App Bundle limits](https://developer.android.com/guide/app-bundle/faq).

#### 13.1.1 State Worker setup gate

Onboarding requires an explicit State Worker choice. The first offer is **Local**, which installs or selects the managed model. If Local is declined, the app opens **API** setup using the existing provider and connection-profile compatibility surface. If API is also declined or cancelled, the app returns to a final choice between Local and **Disable State Worker Functions**. It never pretends that automatic tracking is configured when no inference source exists.

Disabling State Worker Functions disables model-managed live-state inference, relationship proposals, Novel Dialogue attribution, inferred NPC discovery, and automatic scene-boundary detection. It does not disable independently configured Short Memory or Long Memory jobs, including extraction after a manual boundary or safety interval. Chat, manual Cast editing, manual scene boundaries, manual time changes, deterministic `Name:` parsing, OpenWeather updates, and saved tracker state remain available. No main-model fallback may silently reactivate a disabled capability. The user can configure a worker later from Preferences.

#### 13.1.2 Worker model selection and Browse

Preferences → AI & Models → State Worker shows the managed local model, the three evaluation candidates where installed, compatible API profiles, health, device memory estimate, and a **Browse…** action beside Local Model. Browse accepts a user-supplied `.gguf` without copying it unless the user chooses Import. Before activation, the app checks file access, GGUF metadata, supported architecture, minimum context capacity, loadability, and a short schema-output health fixture.

A browsed model is labeled Custom and keeps its path, detected metadata, and optional user-supplied license/source note. Failure leaves the last working model active. **Restore Managed Model** provides a one-step return to the verified application model. Arbitrary model files are never uploaded to an API or included in diagnostics.

### 13.2 State Worker cadence

Run one asynchronous incremental State Worker job after every committed model turn, including Continue. Start only after genuine provider streaming finishes, or immediately after a complete non-streamed response is committed, and after the chosen swipe or regeneration has become active. A short default debounce of approximately 1.5 seconds coalesces rapid commits. An application resource scheduler owns concurrency; each chat branch owns its evidence cursor and one coalesced pending range. See [worker scheduling](./IMPLEMENTATION-CONTRACTS.md#2-worker-scheduling-and-forward-progress).

Each routine job receives only:

- newly committed messages since the last accepted worker revision;
- the compact current Scene State;
- identities and fields relevant to those messages;
- the active schema and tracker instructions.

It never receives the full chat merely because another turn was added. Deterministic application events—manual time skip, OpenWeather change, `Name:` parsing, manual Cast edits, cooldowns, and counters—bypass model inference. The worker emits one structured proposal batch covering every model-managed tracker, so relationships, cast discovery, scene evidence, and continuity do not create separate calls.

The initial request ceilings are 8,192 input and 512 output tokens with near-deterministic sampling, both configurable under Advanced. Count the full serialized schema, instructions, state, evidence, and provenance; 512 is a starting measurement, not proof that every patch fits. Report only supported facts or no change. Split oversized evidence at turn boundaries where possible, otherwise at stable spans inside generation segments. Process bounded prefix jobs with atomic patch/cursor commits and a shared resource budget; never skip evidence or retry deterministic truncation unchanged. Raising limits increases device load or API usage.

Run a consistency pass at a confirmed scene boundary, after branch restoration or crash recovery, and every 25 canonical turns. The pass compares compact state with the bounded source window and event log; it does not rescan the full conversation. If a device cannot finish routine jobs before new turns arrive, adaptive backpressure may batch up to three turns while showing tracker state as catching up. Chat generation never waits for the worker.

#### 13.2.1 Result presentation and streaming

The rework distinguishes genuine streaming from display animation. If a provider returns tokens progressively and streaming is enabled, the roleplay message may grow as those tokens actually arrive. If the provider returns a completed message, it appears immediately in full. SillyTavern's optional Smooth Streaming delay is not carried into the product baseline, so the interface never slowly reveals text it already has.

State Worker results are never streamed into visible state. The complete proposal is parsed and validated off-screen, then committed in one atomic update. A worker may still use a streaming transport internally when required by a provider, but partial chunks have no authority and are discarded if the stream fails.

### 13.3 Token conservation behavior

When Local is selected, routine tracking consumes no cloud allowance; device tokens and latency are reported separately. When API is selected, every worker request, attribution pass, retry, repair, and backup is charged to that provider's ledger. The selected mode is never assumed to be local.

Use this priority order under the weekly NanoGPT budget:

1. user-requested roleplay generation;
2. Short Memory continuity required to keep the active chat coherent;
3. due Long Memory safety or scene extraction;
4. explicit user tools;
5. automatic cloud State Worker fallback, research, and optional enrichment.

At the configurable Warning threshold, default 80% of the applicable allowance, show the forecast warning and identify the largest consumers. At the configurable Protection threshold, default 90%, enter conservation mode and protect the remaining reserve: keep the local State Worker running, stop automatic cloud-worker fallback and optional research, and queue non-urgent cloud enrichment rather than discarding it. Required Memorybook jobs remain visible and queued; the application never fabricates completion or deletes source material. A user may explicitly override protection for one operation after seeing its estimated cost.

No mode silently shortens roleplay responses, changes the selected creative model, disables memory, or substitutes a cheaper cloud model. Those remain explicit user decisions. Context caching and provider discounts may be reported, but acceptance calculations use uncached token totals unless NanoGPT supplies authoritative billing semantics.

### 13.4 Provider-aware budget accounting

Use the existing SillyTavern provider and connection-profile registries as the compatibility source. Each provider receives one declared accounting capability rather than a guessed plan limit:

1. **Authoritative allowance:** fetch active allowance, usage, remaining amount, and reset from the provider. Warning and Protection can be enforced directly.
2. **Usage-reported only:** accumulate provider-reported per-request input/output usage against a user-configured period and allowance.
3. **Locally estimated:** when responses omit usage, estimate with the selected tokenizer and mark totals and forecasts as estimates. Protection requires an explicit user-configured allowance.
4. **Currency or credit budget:** track the unit the provider exposes and optionally show token-equivalent detail without conflating the two.
5. **Local inference:** show workload, latency, failures, and device use separately; there is no cloud-token limit.

Provider adapters must record source and confidence for each ledger entry and reconcile local totals to authoritative provider readings without silently rewriting historical attribution. Unknown provider limits remain Unknown. Warning and Protection stay inactive until a reliable or user-configured denominator exists.

#### 13.4.1 NanoGPT 60-million-token benchmark

Use a demanding reference week rather than a light demonstration:

| Workload | Proposed reference |
| --- | --- |
| Active use | 6 hours per day for 7 days |
| Roleplay pace | 20 committed model generations per hour; 840 per week |
| Average roleplay request | 48,000 input tokens plus 1,200 output tokens |
| Roleplay subtotal | 41.328 million tokens |
| Short Memory allowance | Up to 3 million tokens |
| Long Memory extraction allowance | Up to 3 million tokens |
| Cloud fallback and retry allowance | Up to 1 million tokens |
| Research and manual-tool allowance | Up to 2 million tokens |
| Reference total | At most 50.328 million tokens, approximately 83.9% of 60 million |

The synthetic input-plus-output workload target is below 54 million with at least 10% reserve against its illustrative 60M denominator. Actual protection must separately pass every verified provider bucket, including daily limits and its real debit units; this table does not prove billing semantics. Run single-character, multi-character, Continue-heavy, branch/edit/regeneration, long-chat, scene-boundary, and intermittent-offline samples with no lost required memory work. See [quota authority](./IMPLEMENTATION-CONTRACTS.md#7-provider-quota-authority).

Also run a stress case using the same 840 generations with a 64,000-token average input. It is expected to exceed the budget if left unchecked; the pass condition is that projection warns before 48 million, conservation engages by 54 million, optional work stops in priority order, queued work remains recoverable, and normal chat fails clearly rather than producing hidden overage. Recalibrate the synthetic distribution against at least two weeks of opt-in local usage telemetry before claiming the benchmark represents real use.

The table is a NanoGPT-subscription fixture, not a universal application limit. It appears only when NanoGPT is selected and the existing subscription-usage check reports an active plan. The authoritative weekly limit returned by NanoGPT replaces `60 million` if the plan changes.

### 13.5 Recovery, retries, and validation

Every worker proposal carries job ID, chat ID, branch ID, source message IDs and revisions, input state revision, schema version, worker model/version, and evidence references. Validation occurs in layers:

1. parse strict structured output;
2. validate the JSON schema, enums, types, sizes, and required provenance;
3. validate semantic rules such as identities, five-point relationship deltas, cooldowns, lifetimes, and permitted operations;
4. verify that cited evidence still exists on the active branch;
5. compare chat, branch, source, schema, and state revisions immediately before commit.

Only a complete valid proposal commits atomically and idempotently. Invalid or stale output never partially changes state. Malformed but current output receives at most one structured repair using the selected inference source and frozen evidence. A separate main-model extraction fallback is possible only when explicitly enabled, still current, and budget-permitted; it is not a sidecar appended to a finished response. The initial request, transport retries, repair, and backup share a four-attempt total ceiling per logical prefix job and one commit identity. Deterministic truncation requires a smaller bounded prefix or permitted larger cap, not identical retries.

Transport retries are separate from output repair. Retry at most twice for network interruption, timeout, HTTP 408/425/429, or retryable 5xx responses, using bounded exponential backoff with jitter and honoring a valid `Retry-After` value. Do not retry authentication, permission, insufficient-quota, invalid-model, invalid-request, or unsupported-schema failures. Cancel retries when their chat, branch, messages, or state revision becomes obsolete. A stale cancellation does not count toward the circuit breaker.

After three consecutive failed logical jobs, open a circuit breaker: preserve the last known-good state, stop automatic worker attempts, show a quiet actionable warning, and offer Retry, Use Main Model Once, Switch Worker Model, or Manual-only. Failures and raw validation diagnostics go to the in-app Console, with secrets and private prompt content redacted by default.

Persist accepted state as an append-only event log with checksums and periodic snapshots. Create a recovery snapshot at scene boundaries and every 25 canonical turns. On startup or crash recovery, load the newest valid snapshot and replay later valid events. If the tail is corrupt, quarantine it, restore the last valid state, and expose a repair report without blocking access to the chat. Model downloads use resumable transfer, a signed manifest, a pinned source revision, and checksum verification before replacement of the previous working model.

Before automatic commits are enabled by default, the labeled evaluation set must achieve at least 99.5% structurally valid output after the single repair attempt, at least 98% precision and 95% recall for identity, presence, location, time phase, and explicit weather changes, and fewer than one false relationship change per 100 canonical turns. Relationship recall is secondary to avoiding fabricated movement. The branch, edit, swipe, deletion, stale-job, and crash suites permit zero cross-branch or partial commits. These are initial release gates and may be tightened after the first representative corpus is labeled.

#### 13.5.1 SillyTavern reuse boundary

The [State Worker Reliability Foundation Audit](./STATE-WORKER-FOUNDATION-AUDIT.md) confirms that the fork already supplies atomic writes, throttled chat and settings backups, chat concurrent-overwrite detection, abort-signal plumbing, broad connection profiles, provider-specific JSON-schema transport, direct `llama.cpp` compatibility, and NanoGPT subscription usage reporting. Those mechanisms should be reused rather than reimplemented.

The audit also confirms that SillyTavern does not have one generalized branch-safe worker transaction, local schema-and-semantic validator, provider-aware retry classifier, or replayable tracker event store. These remain native State Worker responsibilities. In particular, the existing chat integrity identifier is an optimistic-concurrency token rather than a content checksum, and JSON parsing alone is not commit validation.

## 14. State Worker evaluation fixture

The model comparison must run inside the working interface because output quality is only one dimension. The final choice also depends on managed-runtime startup, time-to-result while roleplay continues, peak memory, queue catch-up, schema compliance, repair frequency, and branch cancellation. A portable fixture is still defined now so the three candidates receive identical evidence and expected results.

Audit correction: the example below is illustrative prose, not an executable or qualified fixture. The [executable evaluation gate](./IMPLEMENTATION-CONTRACTS.md#11-executable-evaluation-gate) assigns versioned schema, stable identities, adversarial cases, and deterministic validation to the first Phase 2 slice. No benchmark result is claimed.

### 14.1 Evaluation procedure

Run Qwen3.5-2B, Qwen3-1.7B, and SmolLM2-1.7B-Instruct through the same `llama.cpp` build, quantization class, context cap, output cap, non-thinking setting, and near-deterministic sampling. Reset model context between cases. Each case contains the prior compact state, newly committed roleplay turns, the exact worker prompt and schema, and a labeled expected change set.

Score exact schema validity, unsupported invention count, field precision and recall, relationship false positives, dialogue attribution, latency, memory, recovery, and whether a late result is correctly prevented from committing after a branch change. Do not use roleplay eloquence as a score; terse `no_change` output is preferable to plausible invention.

### 14.2 Ready multi-character continuity case

Use this compact starting state:

```json
{
  "time_phase": "Morning",
  "date": "1994-09-03",
  "location": "Hogwarts > Great Hall",
  "weather": "light rain",
  "present": ["Harry Potter", "Hermione Granger"],
  "relationships": {"Harry Potter": 10, "Hermione Granger": 20},
  "cast": {
    "Harry Potter": {"mood": "uneasy", "current_activity": "eating breakfast", "salient_inventory": []},
    "Hermione Granger": {"mood": "focused", "current_activity": "reading the Daily Prophet", "salient_inventory": ["Daily Prophet"]}
  }
}
```

Then supply these newly committed messages as one batch:

```text
Assistant — Harry: “We should talk somewhere quieter.” Harry pushes his untouched toast away and slips the folded Marauder's Map into his robe. Hermione studies his face, closes the Prophet, and follows him out of the Great Hall.

User: I catch up with them on the moving staircase. “Is this about the message from Sirius?”

Assistant — Novel dialogue: “Not here,” Hermione whispers, glancing toward the portraits. The three of you climb to the seventh floor and enter the empty classroom opposite the tapestry of Barnabas the Barmy. Outside, the rain has strengthened against the windows. Harry unfolds the Marauder's Map across a desk.
```

The expected factual changes are: location becomes `Hogwarts > Seventh Floor > Empty classroom opposite the Barnabas the Barmy tapestry`; present cast adds the active Persona but no invented NPC; Harry's activity becomes unfolding/examining the Marauder's Map; the Map becomes salient inventory; Hermione's activity is no longer reading; weather becomes heavier rain only if fictional weather tracking is enabled; time phase and date do not change; and neither relationship changes because the passage contains no clear relationship event. Novel Dialogue attribution should assign `“Not here,”` to Hermione and no other quoted span.

### 14.3 Worker instruction contract

The shared instruction begins: `Extract only changes explicitly supported by NEW_MESSAGES. Do not continue the story, infer hidden motives, advance time without evidence, invent people or objects, or repeat unchanged state. When evidence is insufficient, emit no operation. Relationship changes require a concrete interpersonal event and must be ±5 or ±10. Return only data matching STATE_PATCH_SCHEMA, with one evidence reference per operation.`

The final implementation will replace `STATE_PATCH_SCHEMA` with the versioned production schema and stable message IDs. This fixture remains useful for manual tests now, but the in-app harness is the release authority because it can measure parsing, repair, cancellation, commit guards, and performance together.
