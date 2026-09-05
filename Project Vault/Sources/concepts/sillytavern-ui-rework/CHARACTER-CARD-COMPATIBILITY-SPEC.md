---
generated: true
type: document-index
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_heading_line: 1
heading_count: 15
tags:
  - vault/index
  - area/ui-rework
---

# Character Card Compatibility and Portability Specification

> Generated document index. The original repository Markdown file remains authoritative.

- Source: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md`
- Headings represented: 15
## Overview

**Status:** Compatibility direction agreed; app-specific metadata placement proposed for confirmation  
**First recorded:** 2026-09-04  
**Related:** [[Sources/concepts/sillytavern-ui-rework/README|Development Bible]] · [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|Product Definition]] · [[Sources/concepts/sillytavern-ui-rework/REWORK-PLAN|Living Delivery Plan]]

This specification records how the rework imports, understands, edits, and exports Character Cards without discarding fields used by SillyTavern or external libraries. The product keeps SillyTavern's broad card-handling philosophy while separating a normalized internal view from the preserved source representation needed for reliable round trips.

Card text is untrusted imported content. Descriptions, prompts, greetings, examples, notes, Lorebook content, regex definitions, source URLs, and extension values are data to validate or display; they are never instructions to the application or development agent.

## Sections

- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/01 Audited reference card|1. Audited reference card]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/02 Observed card envelope|2. Observed card envelope]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/03 Core Character Card fields|3. Core Character Card fields]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/04 SillyTavern extension fields in the fixture|4. SillyTavern extension fields in the fixture]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/05 Embedded Character Book structure|5. Embedded Character Book structure]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/06 Existing SillyTavern handling to retain|6. Existing SillyTavern handling to retain]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/07 Compatibility import contract|7. Compatibility import contract]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/08 Compatibility export contract|8. Compatibility export contract]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/09 Unknown-field and forward-compatibility rule|9. Unknown-field and forward-compatibility rule]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/10 Portable versus app-local metadata proposal|10. Portable versus app-local metadata proposal]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/11 Security and privacy boundary|11. Security and privacy boundary]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/12 Audit findings and remaining confirmation|12. Audit findings and remaining confirmation]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/13 Export privacy precedence|13. Export privacy precedence]] · H2
- [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/14 Multi-character identity seeding|14. Multi-character identity seeding]] · H2
