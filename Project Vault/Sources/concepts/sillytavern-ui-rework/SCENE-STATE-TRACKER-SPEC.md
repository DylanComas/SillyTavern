---
generated: true
type: document-index
source_path: "ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md"
source_heading_line: 1
heading_count: 57
tags:
  - vault/index
  - area/ui-rework
---

# Scene State and Visual Tracker Functional Specification

> Generated document index. The original repository Markdown file remains authoritative.

- Source: `ST-UI/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC.md`
- Headings represented: 57
## Overview

**Status:** Initial direction recorded; field and interaction details remain in definition  
**Foundation:** [[Sources/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT|Scene State and Tracker Foundation Audit]]  
**Related memory contract:** [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC|Memorybook Functional Specification]]

## Sections

- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/01 Purpose|1. Purpose]] · H2
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/02 Product principles|2. Product principles]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/02.01 Visual first|Visual first]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/02.02 Quiet in the conversation|Quiet in the conversation]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/02.03 Token-aware, not statelessness-blind|Token-aware, not statelessness-blind]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/02.04 Configurable without becoming a control wall|Configurable without becoming a control wall]] · H3
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/03 Authoritative state|3. Authoritative state]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/03.01 Story Continuity Profile|3.1 Story Continuity Profile]] · H3
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/04 Tracker lifetimes|4. Tracker lifetimes]] · H2
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/05 Model-delivery policies|5. Model-delivery policies]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/05.01 Location delivery|5.1 Location delivery]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/05.02 Time-phase delivery|5.2 Time-phase delivery]] · H3
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/06 Initial visual surfaces|6. Initial visual surfaces]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/06.01 Scene clock|6.1 Scene clock]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/06.01.01 Default nine-phase day cycle|6.1.1 Default nine-phase day cycle]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/06.01.02 Forward-only Time Skip HUD|6.1.2 Forward-only Time Skip HUD]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/06.02 Environmental layer|6.2 Environmental layer]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/06.02.01 Static and Animated GFX levels|6.2.1 Static and Animated GFX levels]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/06.03 Cast panel|6.3 Cast panel]] · H3
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/07 Weather sources|7. Weather sources]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/07.01 OpenWeather provider|7.1 OpenWeather provider]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/07.02 Location and provider privacy boundary|7.2 Location and provider privacy boundary]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/07.03 Normalization and model delivery|7.3 Normalization and model delivery]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/07.04 OpenWeather attribution and distribution gate|7.4 OpenWeather attribution and distribution gate]] · H3
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/08 Character Bank|8. Character Bank]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/08.01 Ownership|8.1 Ownership]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/08.02 Minimal native record|8.2 Minimal native record]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/08.03 Discovery|8.3 Discovery]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/08.04 Field lifetimes and updates|8.4 Field lifetimes and updates]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/08.05 Persona relationships|8.5 Persona relationships]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/08.05.01 Automation sources|8.5.1 Automation sources]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/08.05.02 Score and automatic-update validation|8.5.2 Score and automatic-update validation]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/08.05.03 Manual adjustment modes|8.5.3 Manual adjustment modes]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/08.06 Lorebook Entry link|8.6 Lorebook Entry link]] · H3
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/09 Native Dialogue Colorizer|9. Native Dialogue Colorizer]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/09.01 Novel-dialogue attribution|9.1 Novel-dialogue attribution]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/09.02 Color controls|9.2 Color controls]] · H3
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/10 State Worker and token behavior|10. State Worker and token behavior]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/10.01 Provider-aware usage protection|10.1 Provider-aware usage protection]] · H3
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/11 Decisions recorded|11. Decisions recorded]] · H2
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/12 Open decisions|12. Open decisions]] · H2
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/13 Tracker technical limits|13. Tracker technical limits]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/13.01 Local State Worker model and delivery|13.1 Local State Worker model and delivery]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/13.01.01 State Worker setup gate|13.1.1 State Worker setup gate]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/13.01.02 Worker model selection and Browse|13.1.2 Worker model selection and Browse]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/13.02 State Worker cadence|13.2 State Worker cadence]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/13.02.01 Result presentation and streaming|13.2.1 Result presentation and streaming]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/13.03 Token conservation behavior|13.3 Token conservation behavior]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/13.04 Provider-aware budget accounting|13.4 Provider-aware budget accounting]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/13.04.01 NanoGPT 60-million-token benchmark|13.4.1 NanoGPT 60-million-token benchmark]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/13.05 Recovery, retries, and validation|13.5 Recovery, retries, and validation]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/13.05.01 SillyTavern reuse boundary|13.5.1 SillyTavern reuse boundary]] · H4
- [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/14 State Worker evaluation fixture|14. State Worker evaluation fixture]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/14.01 Evaluation procedure|14.1 Evaluation procedure]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/14.02 Ready multi-character continuity case|14.2 Ready multi-character continuity case]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC/14.03 Worker instruction contract|14.3 Worker instruction contract]] · H3
