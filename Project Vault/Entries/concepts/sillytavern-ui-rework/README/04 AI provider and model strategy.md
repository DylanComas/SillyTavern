---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/README.md"
source_line: 72
heading_level: 2
heading_order: "04"
document_index: "[[Sources/concepts/sillytavern-ui-rework/README]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/README]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 4. AI provider and model strategy

> [[Sources/concepts/sillytavern-ui-rework/README|SillyTavern Rework — Development Bible]]

NanoGPT is the primary model provider for this rework.

- The user already has a paid NanoGPT subscription, an API key, and models ready for use.
- Creative roleplay and primary generation do not require local inference.
- State Worker setup requires an explicit Local, API, or Disable choice; it never silently assumes an unavailable source.
- The managed Local path uses a hidden app-owned `llama.cpp` runtime and a verified 2B-class GGUF, normally delivered with first-run consent and an optional desktop offline package where distribution permits it.
- Preferences includes a Browse action for a compatible custom GGUF and preserves a one-step return to the verified managed model.
- Provider setup should make NanoGPT a first-class, understandable path rather than exposing users to an undifferentiated wall of backend terminology.
- Full connection and model management lives under **Preferences → AI & Models**.
- Model selection is duplicated in the contextual Generation panel for fast per-chat switching.
- Model selectors expose current input/output pricing and price units when NanoGPT provides them; missing or stale prices are labeled rather than guessed.
- Generation Settings are named saved bundles containing model, preset, preset configuration, Temperature, Top P, Top K, Context Size, and Response Length.
- Preset Configurations independently store named variants of a base preset’s complete rules and switches.
- Connection state and actionable provider errors should be visible inside the application.

API credentials must never be printed in the console, written into exported diagnostics, or exposed in ordinary renderer logs. Production builds should store secrets using platform-appropriate secure storage rather than plain configuration or browser storage.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/README|SillyTavern Rework — Development Bible]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/README/03.02 Android|Android]]
- Next: [[Entries/concepts/sillytavern-ui-rework/README/05 Application console|5. Application console]]

- Source location: `ST-UI/sillytavern-ui-rework/README.md:72`
