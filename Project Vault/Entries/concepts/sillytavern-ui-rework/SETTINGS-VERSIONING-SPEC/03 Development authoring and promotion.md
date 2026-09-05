---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md"
source_line: 40
heading_level: 2
heading_order: "03"
document_index: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 3. Development authoring and promotion

> [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]

During development, Factory Defaults exist in a human-readable commented source such as `factory-defaults.dev.yaml`. Critical flags, limits, thresholds, and path policies include descriptions and constraints in that file and in the authoritative validation schema.

A validated promotion process performs the following steps:

1. validate types, ranges, cross-field invariants, platform restrictions, and path policies;
2. run configuration unit, migration, startup, and representative feature tests;
3. generate the candidate production source deterministically rather than maintaining a second hand-edited copy;
4. compare the generated result with the intended change and require its changelog entry;
5. increment the appropriate application/defaults identities;
6. generate the typed production module and build manifest;
7. refuse the promotion if validation, tests, deterministic regeneration, or documentation fails.

The promoted human-readable snapshot remains in the repository for review and reproducible builds. Packaged production code reads the generated module, never the development candidate. The application never writes either source at runtime.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/02.03 Factory Defaults revision|2.3 Factory Defaults revision]]
- Next: [[Entries/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC/04 Changelog and behavioral record|4. Changelog and behavioral record]]

- Source location: `ST-UI/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC.md:40`
