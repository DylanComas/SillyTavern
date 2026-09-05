---
generated: true
type: document-index
source_path: "ST-UI/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC.md"
source_heading_line: 1
heading_count: 40
tags:
  - vault/index
  - area/ui-rework
---

# Memorybook Functional Specification

> Generated document index. The original repository Markdown file remains authoritative.

- Source: `ST-UI/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC.md`
- Headings represented: 40
## Overview

**Status:** In definition  
**Started:** 2026-08-31  
**Foundations:** [[Sources/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT|Memorybook Foundation Audit]], [[Sources/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT|Scene State and Tracker Foundation Audit]], and [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|Scene State and Visual Tracker Functional Specification]]  
**Related:** [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|Product Definition]] · [[Sources/concepts/sillytavern-ui-rework/README|Development Bible]] · [[Sources/concepts/sillytavern-ui-rework/REWORK-PLAN|Living Delivery Plan]]

## Sections

- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/01 Purpose|1. Purpose]] · H2
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/02 Configuration principle|2. Configuration principle]] · H2
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/03 Short Memory|3. Short Memory]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/03.01 Role|3.1 Role]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/03.02 Automatic trigger modes|3.2 Automatic trigger modes]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/03.03 Canonical roleplay-turn model|3.3 Canonical roleplay-turn model]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/03.04 Counting rules|3.4 Counting rules]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/03.05 Summaryception verbatim baseline|3.5 Summaryception verbatim baseline]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/03.06 Batch safety|3.6 Batch safety]] · H3
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/04 Configuration surface established so far|4. Configuration surface established so far]] · H2
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/05 Decisions recorded|5. Decisions recorded]] · H2
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/06 Next decisions|6. Next decisions]] · H2
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07 Long Memory retrieval direction|7. Long Memory retrieval direction]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07.01 Durable entry shape|7.1 Durable entry shape]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07.02 Bounded recursive retrieval|7.2 Bounded recursive retrieval]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07.02.01 Recall depth modes|7.2.1 Recall depth modes]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07.02.02 Recursive safety ceilings|7.2.2 Recursive safety ceilings]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07.03 Long Memory extraction triggers|7.3 Long Memory extraction triggers]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07.04 Manual scene boundary|7.4 Manual scene boundary]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07.05 Direct entry creation and activation|7.5 Direct entry creation and activation]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07.05.01 Longform size baseline|7.5.1 Longform size baseline]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07.05.02 Tiny Recall format|7.5.2 Tiny Recall format]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07.05.03 Extraction retry policy|7.5.3 Extraction retry policy]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07.05.04 Scene Details base schema|Scene Details base schema]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/07.06 Automatic activation and hopping|7.6 Automatic activation and hopping]] · H3
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08 Persistent Scene Memory|8. Persistent Scene Memory]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08.01 Purpose|8.1 Purpose]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08.01.01 Persistence without time decay|8.1.1 Persistence without time decay]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08.01.02 Semantic replacement and retirement|8.1.2 Semantic replacement and retirement]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08.02 Remember This|8.2 Remember This]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08.02.01 Pinned-message budget|8.2.1 Pinned-message budget]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08.03 State Worker contract|8.3 State Worker contract]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08.04 Automatic scene-boundary detection|8.4 Automatic scene-boundary detection]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08.04.01 Boundary placement contract|8.4.1 Boundary placement contract]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08.04.02 Labeled evaluation corpus and gates|8.4.2 Labeled evaluation corpus and gates]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08.04.03 Automatic detection safeguards|8.4.3 Automatic detection safeguards]] · H4
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/08.05 Deployment direction|8.5 Deployment direction]] · H3
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/09 Long Memory decisions recorded|9. Long Memory decisions recorded]] · H2
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FUNCTIONAL-SPEC/10 Next Long Memory decisions|10. Next Long Memory decisions]] · H2
