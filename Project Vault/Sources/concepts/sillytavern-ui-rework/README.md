---
generated: true
type: document-index
source_path: "ST-UI/sillytavern-ui-rework/README.md"
source_heading_line: 1
heading_count: 34
tags:
  - vault/index
  - area/ui-rework
---

# SillyTavern Rework — Development Bible

> Generated document index. The original repository Markdown file remains authoritative.

- Source: `ST-UI/sillytavern-ui-rework/README.md`
- Headings represented: 34
## Overview

This document is the working source of truth for the SillyTavern rework. It records agreed product direction, platform choices, experience principles, and implementation constraints. It should evolve with the project; decisions belong here before they become assumptions spread across the codebase.

Delivery phases, gates, and progress are maintained in the companion [[Sources/concepts/sillytavern-ui-rework/REWORK-PLAN|Living Delivery Plan]]. The current workflow inventory, original UI delta ledger, and extension register are maintained in [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|Product Definition]].

The 2026-09-05 audit corrections add [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|implementation safety contracts]] and the [[Sources/concepts/sillytavern-ui-rework/WORKFLOW-SURFACE-MAP|workflow surface map]]. These define rework requirements, not completed runtime features. Work is restricted to this rework folder and the Vault; the original application and extension clones must not be audited or modified.

The code-level analysis of Summaryception and Memory Books is maintained in the [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT|Memorybook Foundation Audit]]. The Horae, Multihog, and MeguminSuite review is maintained in the [[Sources/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT|Scene State and Tracker Foundation Audit]]. The SillyTavern mechanisms available for worker persistence, provider access, validation, usage reporting, and recovery are assessed in the [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]. Agreed product behavior is maintained separately in the living [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC|Memorybook Functional Specification]] and [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]].

## Sections

- [[Entries/concepts/sillytavern-ui-rework/README/01 Project intent|1. Project intent]] · H2
- [[Entries/concepts/sillytavern-ui-rework/README/02 Product principles|2. Product principles]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/README/02.01 Conversation first|Conversation first]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/02.02 Simple by default, powerful on demand|Simple by default, powerful on demand]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/02.03 Desktop and mobile are related, not identical|Desktop and mobile are related, not identical]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/02.04 Native application feel|Native application feel]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/02.05 Extensions should feel intentional|Extensions should feel intentional]] · H3
- [[Entries/concepts/sillytavern-ui-rework/README/03 Platform direction|3. Platform direction]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/README/03.01 Desktop|Desktop]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/03.02 Android|Android]] · H3
- [[Entries/concepts/sillytavern-ui-rework/README/04 AI provider and model strategy|4. AI provider and model strategy]] · H2
- [[Entries/concepts/sillytavern-ui-rework/README/05 Application console|5. Application console]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/README/05.01 Placement|Placement]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/05.02 Initial console requirements|Initial console requirements]] · H3
- [[Entries/concepts/sillytavern-ui-rework/README/06 Experience architecture|6. Experience architecture]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/README/06.01 Product focus|Product focus]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/06.02 Desktop workspace|Desktop workspace]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/06.03 Mobile workspace|Mobile workspace]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/06.04 Preferences|Preferences]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/06.05 Settings protection|Settings protection]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/06.06 Memory and lore|Memory and lore]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/06.07 Character Card compatibility|Character Card compatibility]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/06.08 Internet research|Internet research]] · H3
- [[Entries/concepts/sillytavern-ui-rework/README/07 Selected visual baseline|7. Selected visual baseline]] · H2
- [[Entries/concepts/sillytavern-ui-rework/README/08 Visual language|8. Visual language]] · H2
- [[Entries/concepts/sillytavern-ui-rework/README/09 Rework boundaries|9. Rework boundaries]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/README/09.01 In scope|In scope]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/09.02 Not currently required|Not currently required]] · H3
- [[Entries/concepts/sillytavern-ui-rework/README/10 Phase 1 closure and later validation|10. Phase 1 closure and later validation]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/README/10.01 Phase 1 closure questions|Phase 1 closure questions]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/README/10.02 Later validation and release decisions|Later validation and release decisions]] · H3
- [[Entries/concepts/sillytavern-ui-rework/README/11 Decision record|11. Decision record]] · H2
- [[Entries/concepts/sillytavern-ui-rework/README/12 Vault concept-note contract|12. Vault concept-note contract]] · H2
