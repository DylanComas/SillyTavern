---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md"
source_line: 59
heading_level: 2
heading_order: "06"
document_index: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 6. Explicit provider request boundary

> [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]

The new runtime needs an isolated request interface, not implicit access to mutable browser globals. Its inputs are an immutable resolved connection/profile snapshot, credential reference, role (`roleplay`, `state_worker`, `short_memory`, `long_memory`, or `research`), model, messages/evidence, schema/version, input/output limits, request/job IDs, and abort signal. Credentials are resolved only behind the platform transport boundary and never serialized into jobs, cards, logs, or exports.

Outputs distinguish complete versus truncated results, structured provider errors, usage with units/source/confidence, and actual transport streaming. Provider capability checks are explicit; unsupported structured output fails before spending where possible. Concurrent creative and worker requests must not mutate each other's selected model, preset, parameters, connection, or secret selection.

Phase 2 proves the interface with stub transports and isolated runtime adapters in the rework. Historical audits describe possible plumbing, not an already independent backend. Android transport remains conditional on its topology spike. Electron must separately prove hidden supervised child-runtime startup, failure reporting, clean shutdown, and Console redaction; the presence of older Electron work is not proof of completion.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS|Rework Implementation Safety Contracts]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/05 Worker capabilities and cost|5. Worker capabilities and cost]]
- Next: [[Entries/concepts/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS/07 Provider quota authority|7. Provider quota authority]]

- Source location: `ST-UI/sillytavern-ui-rework/IMPLEMENTATION-CONTRACTS.md:59`
