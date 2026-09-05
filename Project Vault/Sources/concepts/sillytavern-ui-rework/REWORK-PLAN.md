---
generated: true
type: document-index
source_path: "ST-UI/sillytavern-ui-rework/REWORK-PLAN.md"
source_heading_line: 1
heading_count: 76
tags:
  - vault/index
  - area/ui-rework
---

# SillyTavern Rework — Living Delivery Plan

> Generated document index. The original repository Markdown file remains authoritative.

- Source: `ST-UI/sillytavern-ui-rework/REWORK-PLAN.md`
- Headings represented: 76
## Overview

**Status:** Active  
**Current stage:** Product definition — closure questions  
**Last updated:** 2026-09-04  
**Companion document:** [[Sources/concepts/sillytavern-ui-rework/README|Development Bible]]

This is the operational plan from the current concept baseline through official deployment. The Development Bible records what the product is and why; this plan records what happens next, in what order, and how completion is judged.

## Sections

- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/01 How this plan is maintained|1. How this plan is maintained]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/01.01 Status vocabulary|Status vocabulary]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/02 Current position|2. Current position]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/02.01 Completed foundations|Completed foundations]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/02.02 Immediate objective|Immediate objective]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/03 Delivery dashboard|3. Delivery dashboard]] · H2
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/04 Phase 1 — Product definition|4. Phase 1 — Product definition]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/04.01 Core workflow inventory|4.1 Core workflow inventory]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/04.02 Original UI delta ledger|4.2 Original UI delta ledger]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/04.03 Extension integration register|4.3 Extension integration register]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/04.04 Release scope|4.4 Release scope]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/04.05 Phase 1 closure sequence|4.5 Phase 1 closure sequence]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/04.06 Assigned later validation|4.6 Assigned later validation]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/04.07 Phase 1 exit gate|Phase 1 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/05 Phase 2 — Architecture validation|5. Phase 2 — Architecture validation]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/05.01 Required decisions and spikes|Required decisions and spikes]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/05.01.01 Frontend migration|Frontend migration]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/05.01.02 Electron runtime|Electron runtime]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/05.01.03 Embedded console|Embedded console]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/05.01.04 NanoGPT|NanoGPT]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/05.01.05 State Worker runtime and transaction|State Worker runtime and transaction]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/05.01.06 Android topology|Android topology]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/05.01.07 Extension boundary|Extension boundary]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/05.02 Architecture records|Architecture records]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/05.03 Phase 2 exit gate|Phase 2 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/06 Phase 3 — UX and interaction specification|6. Phase 3 — UX and interaction specification]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/06.01 Deliverables|Deliverables]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/06.02 Phase 3 exit gate|Phase 3 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/07 Phase 4 — Design system foundation|7. Phase 4 — Design system foundation]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/07.01 Deliverables|Deliverables]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/07.02 Phase 4 exit gate|Phase 4 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/08 Phase 5 — Application platform foundation|8. Phase 5 — Application platform foundation]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/08.01 Workstreams|Workstreams]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/08.02 Phase 5 exit gate|Phase 5 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/09 Phase 6 — Core desktop experience|9. Phase 6 — Core desktop experience]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/09.01 Suggested implementation order|Suggested implementation order]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/09.02 Phase 6 exit gate|Phase 6 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/10 Phase 7 — NanoGPT and generation experience|10. Phase 7 — NanoGPT and generation experience]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/10.01 Deliverables|Deliverables]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/10.02 Phase 7 exit gate|Phase 7 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/11 Phase 8 — Data, settings, and compatibility|11. Phase 8 — Data, settings, and compatibility]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/11.01 Deliverables|Deliverables]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/11.02 Phase 8 exit gate|Phase 8 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/12 Phase 9 — Native extension integration|12. Phase 9 — Native extension integration]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/12.01 Delivery approach|Delivery approach]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/12.02 Per-extension completion criteria|Per-extension completion criteria]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/12.03 Phase 9 exit gate|Phase 9 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/13 Phase 10 — Android application|13. Phase 10 — Android application]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/13.01 Deliverables|Deliverables]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/13.02 Phase 10 exit gate|Phase 10 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/14 Phase 11 — Hardening and release readiness|14. Phase 11 — Hardening and release readiness]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/14.01 Quality tracks|Quality tracks]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/14.01.01 Functional|Functional]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/14.01.02 Accessibility|Accessibility]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/14.01.03 Performance|Performance]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/14.01.04 Security and privacy|Security and privacy]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/14.02 Phase 11 exit gate|Phase 11 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/15 Phase 12 — Preview, alpha, and beta|15. Phase 12 — Preview, alpha, and beta]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/15.01 Developer preview|Developer preview]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/15.02 Alpha|Alpha]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/15.03 Beta|Beta]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/15.04 Release candidate|Release candidate]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/15.05 Phase 12 exit gate|Phase 12 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/16 Phase 13 — Official deployment|16. Phase 13 — Official deployment]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/16.01 Release requirements|Release requirements]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/16.02 Deployment sequence|Deployment sequence]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/16.03 Phase 13 exit gate|Phase 13 exit gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/17 Phase 14 — Post-launch operations|17. Phase 14 — Post-launch operations]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/17.01 Activities|Activities]] · H3
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/18 Cross-cutting tracks|18. Cross-cutting tracks]] · H2
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/19 Definition of done|19. Definition of done]] · H2
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/20 Release-blocking criteria|20. Release-blocking criteria]] · H2
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/21 Working backlog structure|21. Working backlog structure]] · H2
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/22 Next working session|22. Next working session]] · H2
- [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/23 Astra follow-up and exit-review constraints|23. Astra follow-up and exit-review constraints]] · H2
