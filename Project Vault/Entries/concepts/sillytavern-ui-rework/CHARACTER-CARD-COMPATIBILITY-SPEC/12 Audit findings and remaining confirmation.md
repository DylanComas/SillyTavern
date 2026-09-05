---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md"
source_line: 144
heading_level: 2
heading_order: "12"
document_index: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 12. Audit findings and remaining confirmation

> [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]

The reference card validates as V1 in the current fork because the validator tests the six legacy root fields before checking its explicit V3 discriminator. Its declared V3 data also omits `group_only_greetings`, and its embedded book omits top-level `extensions`; SillyTavern still accepts it through permissive handling. These are useful compatibility findings, not reasons to reject the working card.

The agreed product direction is to preserve SillyTavern's broad import/export support, use JSON and PNG as primary card formats, retain embedded Character Books and all known/unknown fields, and avoid reducing cards to only what the new UI understands. Phase 1 still needs confirmation of the proposed default: new rework-specific Character preferences remain in an app-local companion record, while standard exports contain no proprietary metadata unless the user explicitly enables **Include App Metadata**.

Primary specification references: [Character Card V2](https://github.com/malfoyslastname/character-card-spec-v2/blob/main/spec_v2.md) and [Character Card V3](https://github.com/kwaroran/character-card-spec-v3/blob/main/SPEC_V3.md).

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/11 Security and privacy boundary|11. Security and privacy boundary]]
- Next: [[Entries/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC/13 Export privacy precedence|13. Export privacy precedence]]

- Source location: `ST-UI/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC.md:144`
