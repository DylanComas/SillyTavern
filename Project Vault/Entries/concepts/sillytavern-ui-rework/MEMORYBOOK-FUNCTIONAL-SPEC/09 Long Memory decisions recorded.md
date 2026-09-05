---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC.md"
source_line: 462
heading_level: 2
heading_order: "09"
document_index: "[[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 9. Long Memory decisions recorded

> [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC|Memorybook Functional Specification]]

| ID | Decision | Status |
| --- | --- | --- |
| `MEM-009` | Durable entries include a longform body, tiny recall card, direct activation tags, emitted tags, typed links, entity metadata, and stable provenance. | Agreed direction |
| `MEM-010` | Recursive discovery operates locally over tags, cards, and links; only the bounded final payload consumes roleplay-model context. | Agreed direction |
| `MEM-011` | Persistent Scene Memory runs parallel to Short Memory and keeps Story Continuity Profile, location, present-character, and pinned-scene recall cards active. | Agreed direction |
| `MEM-012` | A model-assisted State Worker communicates with the roleplay model only through validated application state and prompt injection. | Recommended; validation required |
| `MEM-013` | First implementation supports managed local `llama.cpp`, any compatible API worker profile, and explicit Disable behind one worker interface; final local model selection requires in-context evaluation. | Agreed; model validation required |
| `MEM-014` | Long Memory extraction is triggered by explicit scene boundaries and configurable safety intervals; a safety checkpoint does not end the scene. | Agreed |
| `MEM-015` | Remember This pins exactly one message into Persistent Scene Memory and never creates a Long Memory entry. | Agreed |
| `MEM-016` | End Scene Here is an inter-message divider that closes a source range and triggers background Long Memory extraction. | Agreed direction |
| `MEM-017` | State Worker scene detection supports Off, Suggest, and Automatic modes; Suggest is the initial model-assisted default and Automatic requires evaluation evidence. | Agreed direction |
| `MEM-018` | A valid extraction atomically creates and immediately activates a complete durable entry; there is no draft, approval, or pre-activation review stage. | Agreed |
| `MEM-019` | Each extracted entry includes Scene Details, a detailed longform summary, Tiny Recall card, activation and emitted tags, typed relationships, and provenance. | Agreed |
| `MEM-020` | Tag activation and bounded hopping run automatically after setup; manual interaction is exceptional correction or tuning. | Agreed |
| `MEM-021` | Scene State uses a clean typed native implementation: Horae-inspired qualitative domains, Multihog-inspired State Worker safety/history, and no main-response tags or rolling text memo as the source of truth. | Agreed direction |
| `MEM-022` | Scene State is confined to ongoing tracking and Persistent Scene Memory; Long Memory stores only independently extracted, fixed Scene Details. | Agreed |
| `MEM-023` | DnD-specific trackers and simulation are deferred to an optional Playing Mode after the first final release. | Agreed |
| `MEM-024` | Scene Details require a one-sentence summary, time of day, date/month/year where known, all scene participants, and a simple or hierarchical location. | Agreed |
| `MEM-025` | Scene Summary is display-only user metadata. It never participates in retrieval, activation, embeddings, scoring, prompt injection, or model context; Tiny Recall remains separate. | Agreed |
| `MEM-026` | Persistent Scene Memory has no time- or turn-based decay; current values persist until evidence, manual action, source invalidation, or semantic lifecycle replacement/retirement changes them. | Agreed |
| `MEM-027` | Remember This defaults to a configurable 10-message limit; Advanced Token Budget defaults to 2,000 tokens and counts the actual serialized pin representation where the active tokenizer is available. | Agreed baseline |
| `MEM-028` | Pins are never silently evicted, compressed, or omitted; an over-budget pin is refused and an existing over-budget state must be resolved explicitly before generation. | Agreed |
| `MEM-029` | Recall modes are Light direct-only, Default two hops, Deep three hops, and Advanced-only Custom with bounded depth, candidate, entry, card, and token controls. | Agreed |
| `MEM-030` | Long Memory extraction keeps Memory Books' configurable 4,000-output-token default and detailed beat-by-beat prompt behavior; the ceiling never requires padding. | Agreed |
| `MEM-031` | Tiny Recall uses one concise subject–verb statement for the Persona and each principal non-user character, normally two to four sentences with a 128-token ceiling. | Agreed |
| `MEM-032` | Extraction combines at most two classified transport retries with one structured repair inside a four-call cap, preserves the frozen source and pending boundary, and never saves a partial entry. | Agreed |
| `MEM-033` | Automatic scene boundaries require exact gap placement, a labeled 400-window evaluation, precision-first release gates, version-specific qualification, ambiguous two-pass confirmation, and immediate Undo. | Agreed baseline |

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC|Memorybook Functional Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08.05 Deployment direction|8.5 Deployment direction]]
- Next: [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/10 Next Long Memory decisions|10. Next Long Memory decisions]]

- Source location: `ST-UI/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC.md:462`
