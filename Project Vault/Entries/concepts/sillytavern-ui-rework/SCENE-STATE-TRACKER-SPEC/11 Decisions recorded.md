---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md"
source_line: 466
heading_level: 2
heading_order: "11"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 11. Decisions recorded

> [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]

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

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/10.01 Provider-aware usage protection|10.1 Provider-aware usage protection]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/12 Open decisions|12. Open decisions]]

- Source location: `ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md:466`
