---
generated: true
type: document-index
source_path: "ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md"
source_heading_line: 1
heading_count: 13
tags:
  - vault/index
  - area/ui-rework
---

# Settings, Defaults, and Versioning Specification

> Generated document index. The original repository Markdown file remains authoritative.

- Source: `ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md`
- Headings represented: 13
## Overview

**Status:** Agreed — Phase 1 settings question complete  
**First recorded:** 2026-09-04  
**Related:** [[Sources/concepts/sillytavern-ui-rework/README|Development Bible]] · [[Sources/concepts/sillytavern-ui-rework/PRODUCT-DEFINITION|Product Definition]] · [[Sources/concepts/sillytavern-ui-rework/REWORK-PLAN|Living Delivery Plan]]

This specification separates developer-authored product defaults from writable user configuration and from the user-pinned Generation Settings bundle already called Default Settings. It defines how configuration changes are authored, validated, promoted, versioned, documented, protected, saved, exported, and owned.

## Sections

- [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/01 Terminology boundary|1. Terminology boundary]] · H2
- [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/02 Version identities|2. Version identities]] · H2
  - [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/02.01 Application version|2.1 Application version]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/02.02 Settings schema version|2.2 Settings schema version]] · H3
  - [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/02.03 Factory Defaults revision|2.3 Factory Defaults revision]] · H3
- [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/03 Development authoring and promotion|3. Development authoring and promotion]] · H2
- [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/04 Changelog and behavioral record|4. Changelog and behavioral record]] · H2
- [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/05 Protection and validation|5. Protection and validation]] · H2
- [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/06 Logical settings ownership|6. Logical settings ownership]] · H2
- [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/07 User Save and Export contract|7. User Save and Export contract]] · H2
- [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/08 Phase 1 decision|8. Phase 1 decision]] · H2
- [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/09 Resolved values and mutable references|9. Resolved values and mutable references]] · H2
