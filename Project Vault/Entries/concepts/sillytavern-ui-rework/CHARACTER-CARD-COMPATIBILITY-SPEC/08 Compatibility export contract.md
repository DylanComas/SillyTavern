---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_line: 97
heading_level: 2
heading_order: "08"
document_index: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 8. Compatibility export contract

> [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]

Export is target-aware. Strict V2/V3 targets conform to the format they claim; Preserve Source may intentionally retain ecosystem imperfections:

- **Preserve Source** retains the imported container/specification and overlays deliberate edits while preserving unknown data, subject to the privacy and safety precedence below. It is not a claim of strict V2/V3 validation.
- **JSON V3** emits a valid Character Card V3 object with required defaults and a compatibility report for repaired or omitted features.
- **PNG V3 + V2 fallback** stores canonical V3 JSON in the `ccv3` chunk and a real downgraded V2 projection in `chara`; both chunks are base64 UTF-8 JSON, and readers prefer `ccv3`.
- **JSON/PNG V2 compatibility** deliberately removes or projects unsupported V3 features and previews any unavoidable loss before writing.
- **CharX** is retained for V3 cards with embedded assets even though JSON and PNG remain the primary user-facing formats.

Metadata-only PNG saves preserve image pixels and unrelated safe chunks rather than recompressing the portrait unnecessarily. An unsupported asset or extension remains represented for export whenever safe storage is possible; if preservation is impossible, export names the omitted element instead of silently losing it.

App-owned private runtime data—active chat, Memorybook, tracker state, relationships, credentials, filesystem paths, usage ledgers, and favorite status—and recognized sensitive fields are excluded from shared cards, including Preserve Source. Arbitrary opaque third-party metadata cannot be guaranteed free of private information; the preview must say so and permit its removal.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/07 Compatibility import contract|7. Compatibility import contract]]
- Next: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/09 Unknown-field and forward-compatibility rule|9. Unknown-field and forward-compatibility rule]]

- Source location: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md:97`
