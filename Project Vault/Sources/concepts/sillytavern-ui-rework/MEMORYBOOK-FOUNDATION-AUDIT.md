---
generated: true
type: document-index
source_path: "ST-UI/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT.md"
source_heading_line: 1
heading_count: 51
tags:
  - vault/index
  - area/ui-rework
---

# Memorybook Foundation Audit

> Generated document index. The original repository Markdown file remains authoritative.

- Source: `ST-UI/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT.md`
- Headings represented: 51
## Overview

**Status:** Complete foundation audit; detailed Memorybook design not yet started  
**Audit date:** 2026-08-31  
**Sources:** [Summaryception clone](<../../../../ST-UI/Extension-Summaryception>) · [Memory Books clone](<../../../../ST-UI/Extension-MemoryBooks>)  
**Related:** [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|Product Definition]] · [[Sources/concepts/sillytavern-ui-rework/README|Development Bible]] · [[Sources/concepts/sillytavern-ui-rework/REWORK-PLAN|Living Delivery Plan]]

## Sections

- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/01 Executive conclusion|1. Executive conclusion]] · H2
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/02 Audit scope and evidence|2. Audit scope and evidence]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/02.01 Source snapshots|Source snapshots]] · H3
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/03 Side-by-side functional model|3. Side-by-side functional model]] · H2
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04 Summaryception audit|4. Summaryception audit]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.01 Storage model|4.1 Storage model]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.02 Processing pipeline|4.2 Processing pipeline]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.03 Promotion behavior|4.3 Promotion behavior]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.04 Strong foundation elements|4.4 Strong foundation elements]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.05 Risks and defects we must not inherit|4.5 Risks and defects we must not inherit]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.05.01 Information loss is inherent|Information loss is inherent]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.05.02 Deepest-layer growth is not hard-bounded|Deepest-layer growth is not hard-bounded]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.05.03 Promoted lineage is insufficient|Promoted lineage is insufficient]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.05.04 Branch repair can preserve stale deep memory|Branch repair can preserve stale deep memory]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.05.05 Editing lower layers does not invalidate dependents|Editing lower layers does not invalidate dependents]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.05.06 Chat-switch race exposure|Chat-switch race exposure]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.05.07 Message indices are fragile identifiers|Message indices are fragile identifiers]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.05.08 Prompt-toggle mutation is too invasive|Prompt-toggle mutation is too invasive]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.05.09 Injection policy is rigid|Injection policy is rigid]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.05.10 Credential storage is unsuitable|Credential storage is unsuitable]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/04.05.11 No automated tests|No automated tests]] · H4
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05 Memory Books audit|5. Memory Books audit]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.01 Storage model|5.1 Storage model]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.02 Base-memory pipeline|5.2 Base-memory pipeline]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.03 Durable consolidation model|5.3 Durable consolidation model]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.04 Lifecycle safeguards|5.4 Lifecycle safeguards]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.05 Tracker foundation|5.5 Tracker foundation]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.06 Strong foundation elements|5.6 Strong foundation elements]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.07 Risks and costs we must not inherit|5.7 Risks and costs we must not inherit]] · H3
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.07.01 Lorebook-as-database conflates two concepts|Lorebook-as-database conflates two concepts]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.07.02 UI and configuration breadth is excessive|UI and configuration breadth is excessive]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.07.03 Monolithic integration surface|Monolithic integration surface]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.07.04 Tight dependency on SillyTavern internals|Tight dependency on SillyTavern internals]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.07.05 Message ranges still depend on indices|Message ranges still depend on indices]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.07.06 Keyword activation is not sufficient retrieval by itself|Keyword activation is not sufficient retrieval by itself]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.07.07 Connection-profile duplication|Connection/profile duplication]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.07.08 Integration tests remain incomplete|Integration tests remain incomplete]] · H4
    - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/05.07.09 Build tool availability|Build tool availability]] · H4
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/06 Automated validation result|6. Automated validation result]] · H2
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/07 Reuse, adapt, reject|7. Reuse, adapt, reject]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/07.01 Reuse as conceptual foundations|Reuse as conceptual foundations]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/07.02 Adapt substantially|Adapt substantially]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/07.03 Reject from the new foundation|Reject from the new foundation]] · H3
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/08 Required invariants for the future Memorybook|8. Required invariants for the future Memorybook]] · H2
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/09 Foundation recommendation|9. Foundation recommendation]] · H2
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/10 Questions reserved for Memorybook design|10. Questions reserved for Memorybook design]] · H2
- [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/11 Extraction retry follow-up|11. Extraction retry follow-up]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/11.01 Summaryception retry behavior|11.1 Summaryception retry behavior]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/11.02 Memory Books retry behavior|11.2 Memory Books retry behavior]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/MEMORYBOOK-FOUNDATION-AUDIT/11.03 SillyTavern retry boundary|11.3 SillyTavern retry boundary]] · H3
