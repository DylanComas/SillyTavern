---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_line: 45
heading_level: 2
heading_order: "04"
document_index: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 4. SillyTavern extension fields in the fixture

> [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]

`data.extensions` contains:

- `talkativeness`;
- local favorite state in `fav`;
- linked-world name in `world`;
- `depth_prompt` with `prompt`, `depth`, and `role`;
- `regex_scripts`.

The previous audit recorded third-party identifiers such as Chub paths, Pygmalion IDs, source URLs, RisuAI sources, Stable Diffusion prompts, and unknown extension keys. The rework preserves safely representable imported fields even without native UI/execution support, subject to the explicit export privacy precedence.

The fixture stores `talkativeness` as the string `"0.5"` even though code commonly treats it as numeric. Import therefore maintains both the original serialized value and a validated normalized runtime value. An untouched field exports exactly as received; a user edit exports the canonical type for the selected target specification.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/03 Core Character Card fields|3. Core Character Card fields]]
- Next: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/05 Embedded Character Book structure|5. Embedded Character Book structure]]

- Source location: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md:45`
