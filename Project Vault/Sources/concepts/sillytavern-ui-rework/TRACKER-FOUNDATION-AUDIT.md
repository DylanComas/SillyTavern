---
generated: true
type: document-index
source_path: "ST-UI/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT.md"
source_heading_line: 1
heading_count: 30
tags:
  - vault/index
  - area/ui-rework
---

# Scene State and Tracker Foundation Audit

> Generated document index. The original repository Markdown file remains authoritative.

- Source: `ST-UI/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT.md`
- Headings represented: 30
## Overview

**Status:** Historical foundation audit; newer functional specifications and implementation contracts govern the rework  
**Audit date:** 2026-09-01  
**Sources:** Previously audited local snapshots, since relocated under `ST-UI/Extension-*/`. This documentation correction does not re-audit or modify them.

Historical recommendations below are superseded where later decisions specify nine-phase time, the full confirmed Cast fields, no provisional NPCs, semantic retirement, main-model transport separation, or provider-aware accounting. See [[Sources/concepts/sillytavern-ui-rework/SCENE-STATE-TRACKER-SPEC|current tracker specification]] and [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|implementation contracts]].

## Sections

- [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/01 Executive conclusion|1. Executive conclusion]] · H2
- [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/02 Audit scope and snapshots|2. Audit scope and snapshots]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/02.01 Horae|Horae]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/02.02 Multihog DnD Framework|Multihog DnD Framework]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/02.03 MeguminSuite|MeguminSuite]] · H3
- [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/03 The product boundary established by this audit|3. The product boundary established by this audit]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/03.01 First-release Scene State|First-release Scene State]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/03.02 Extracted Scene Details|Extracted Scene Details]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/03.03 Deferred Playing Mode|Deferred Playing Mode]] · H3
- [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/04 Horae audit|4. Horae audit]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/04.01 What Horae does well|4.1 What Horae does well]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/04.02 What should not be inherited|4.2 What should not be inherited]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/04.03 Horae disposition|4.3 Horae disposition]] · H3
- [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/05 Multihog audit|5. Multihog audit]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/05.01 What Multihog does well|5.1 What Multihog does well]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/05.02 What should not be inherited|5.2 What should not be inherited]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/05.03 Multihog disposition|5.3 Multihog disposition]] · H3
- [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/06 MeguminSuite audit|6. MeguminSuite audit]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/06.01 What the NPC Bank does well|6.1 What the NPC Bank does well]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/06.02 What should not be inherited|6.2 What should not be inherited]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/06.03 MeguminSuite disposition|6.3 MeguminSuite disposition]] · H3
- [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/07 Recommended native architecture|7. Recommended native architecture]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/07.01 Authoritative records|7.1 Authoritative records]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/07.02 State Worker contract|7.2 State Worker contract]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/07.03 Scene Details handoff|7.3 Scene Details handoff]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/07.04 Inheritance and ownership|7.4 Inheritance and ownership]] · H3
- [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/08 Required implementation invariants|8. Required implementation invariants]] · H2
- [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/09 Verification performed|9. Verification performed]] · H2
- [[Entries/concepts/sillytavern-ui-rework/TRACKER-FOUNDATION-AUDIT/10 Decision and next specification work|10. Decision and next specification work]] · H2
