---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md"
source_line: 47
heading_level: 2
heading_order: "06"
document_index: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 6. Structured output support

> [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]

The current chat-completion backend translates a shared JSON-schema request into provider-specific structured-output formats for many services, usually requesting strict mode where the provider supports it. The text-generation path can pass JSON schema to Tabby and `llama.cpp`, and other backends expose guided JSON where supported. The custom request service parses returned JSON when a schema was requested.

This is a strong transport feature, but parsing JSON is not sufficient validation. The State Worker still needs a local authoritative validator for schema constraints, enums, sizes, provenance, tracker lifetimes, relationship quantization and cooldowns, identity references, and permitted operations. Provider-side strict output is an optimization and first defense, never the commit authority.

Evidence: `SIllyTavern Original/src/endpoints/backends/chat-completions.js:874-883,2542-2550`, `SIllyTavern Original/public/scripts/custom-request.js:489-493`, and `SIllyTavern Original/public/scripts/textgen-settings.js:1594-1692`.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT|State Worker Reliability Foundation Audit]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/05 Provider and local-runtime adapters|5. Provider and local-runtime adapters]]
- Next: [[Entries/concepts/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT/07 Usage and subscription reporting|7. Usage and subscription reporting]]

- Source location: `ST-UI/sillytavern-ui-rework/STATE-WORKER-FOUNDATION-AUDIT.md:47`
