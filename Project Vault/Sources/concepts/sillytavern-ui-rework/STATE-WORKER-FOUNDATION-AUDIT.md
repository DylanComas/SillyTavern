---
generated: true
type: document-index
source_path: "ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md"
source_heading_line: 1
heading_count: 12
tags:
  - vault/index
  - area/ui-rework
---

# State Worker Reliability Foundation Audit

> Generated document index. The original repository Markdown file remains authoritative.

- Source: `ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md`
- Headings represented: 12
## Overview

This audit identifies the SillyTavern mechanisms that can support the native State Worker and the parts that still require a dedicated implementation. It covers persistence, concurrency protection, cancellation, provider abstraction, structured output, usage reporting, retry behavior, and streaming presentation. The conclusion is to reuse several proven foundations without treating the existing generation path as a complete worker transaction system.

Historical evidence only: the 2026-09-05 correction updates this rework document, not the original application. The original and extension folders must not be inspected, tested, audited, or fixed. The [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|new implementation contracts]] supersede assumptions about transport isolation, quota authority, and complete runtime readiness.

## Sections

- [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/01 Executive finding|1. Executive finding]] · H2
- [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/02 Atomic persistence and backups|2. Atomic persistence and backups]] · H2
- [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/03 Concurrent-overwrite protection|3. Concurrent-overwrite protection]] · H2
- [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/04 Cancellation and stale-job handling|4. Cancellation and stale-job handling]] · H2
- [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/05 Provider and local-runtime adapters|5. Provider and local-runtime adapters]] · H2
- [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/06 Structured output support|6. Structured output support]] · H2
- [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/07 Usage and subscription reporting|7. Usage and subscription reporting]] · H2
- [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/08 Retry behavior|8. Retry behavior]] · H2
- [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/09 Streaming presentation|9. Streaming presentation]] · H2
- [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/10 Reuse and replacement map|10. Reuse and replacement map]] · H2
- [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/11 Audit conclusion for the technical limits|11. Audit conclusion for the technical limits]] · H2
