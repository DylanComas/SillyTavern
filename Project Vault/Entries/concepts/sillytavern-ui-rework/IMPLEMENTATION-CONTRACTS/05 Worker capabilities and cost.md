---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md"
source_line: 43
heading_level: 2
heading_order: "05"
document_index: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 5. Worker capabilities and cost

> [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]

The following names apply consistently to Memorybook, relationship automation, dialogue attribution, and setup. They separate an inference source from optional provider transport. The previously agreed explicit Local → API → Local-or-Disable onboarding remains unchanged; showing all three options together is an audit recommendation still awaiting approval.

| Mode | Execution and supported behavior | Cost and fallback boundary |
| --- | --- | --- |
| Local State Worker | Hidden managed `llama.cpp`; factual tracker patches, attribution and boundary candidates where enabled | Local compute, no cloud quota; no unapproved API fallback |
| API State Worker | Isolated request through an explicitly selected provider/model profile | Account for input/output, retries, repairs and attribution on that provider |
| Main-model extraction request | Separate factual request using the creative model's resolved connection, not a replay of its creative preset | An additional request; independent profile snapshot and explicit enablement required |
| Main Model Sidecar | Metadata in the same creative response through a separately verified provider-supported structured channel | Additional prompt/output usage still counts; not universally available and cannot retrofit a completed response |
| Disabled | Manual state, deterministic `Name:` parsing, clock actions, rendering and provider weather remain usable | No model-managed tracking/attribution/boundary detection and no silent fallback reactivation |

Short Memory and Long Memory use their own configured jobs/profiles. Disabling the State Worker leaves those jobs available, including manual-boundary and safety-interval extraction. If their own generation profiles are missing, report that capability's setup issue rather than disabling the whole Memorybook.

Dialogue colors and visual clocks are rendered locally. Novel-dialogue speaker attribution and story-time inference may consume worker tokens. Real-world weather retrieval does not consume inference tokens, but including weather in a roleplay request does. An HTML compatibility prompt also contributes prompt/output tokens. None of these distinctions permits generated tracker UI in the prose.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/04 Request-aware On-change delivery|4. Request-aware On-change delivery]]
- Next: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/06 Explicit provider request boundary|6. Explicit provider request boundary]]

- Source location: `ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md:43`
