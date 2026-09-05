---
generated: true
type: heading-entry
source_path: "ST-UI/sillytavern-ui-rework/REWORK-PLAN.md"
source_line: 703
heading_level: 2
heading_order: "22"
document_index: "[[Sources/concepts/sillytavern-ui-rework/REWORK-PLAN]]"
parent_note: "[[Sources/concepts/sillytavern-ui-rework/REWORK-PLAN]]"
direct_body: populated
tags:
  - vault/entry
  - area/ui-rework
---

# 22. Next working session

> [[Sources/concepts/sillytavern-ui-rework/REWORK-PLAN|SillyTavern Rework — Living Delivery Plan]]

Tracker technical direction is established: Local/API/Disable setup, managed `llama.cpp`, Browse, non-blocking cadence, factual configurable limits, provider-aware Warning/Protection, and atomic recovery requirements. The first model fixture is illustrative, not executable or qualified. Final model selection waits for the working interface and its schema, provenance, cancellation, commit, and performance harness.

Persistent Scene Memory does not decay by age or turn count; pins are bounded without silent eviction; recursive recall, extraction size, retries, and boundary qualification have explicit baselines. Audit A07 nevertheless found a remaining product gap: confirm the Short Memory rolling/trigger/pressure proposal before Phase 1 exit. Schemas, runtime correctness, performance, and tuning remain later measured gates, not already validated implementation.

Continue **Close Phase 1 product definition** in this order:

1. settings versioning and ownership boundaries;
2. portable versus app-local Character Card metadata;
3. SillyTavern Lorebook compatibility and explicit promotion behavior;
4. internet-research activation, provider, evidence, privacy, cache, and cost rules;
5. exact desktop v1 and Android v1 scope.

Then conduct the Phase 1 exit review against the workflow inventory, UI delta ledger, extension register, platform scope matrices, information architecture coverage, and assigned validation backlog. Do not begin Phase 2 merely because the discussion list is exhausted; record gate evidence and update the delivery dashboard first.

The first closure question is complete in [[Sources/concepts/sillytavern-ui-rework/SETTINGS-VERSIONING-SPEC|Settings, Defaults, and Versioning Specification]]. Developer configuration has an agreed candidate-to-promoted-to-compiled Factory Defaults pipeline, `0.0.1` pre-release starting point, `1.0.0` public-release reservation, per-version local changelogs, independent schema/default revision identities, layered validation, and field-aware ownership. User settings keep SillyTavern's Save/Export contract: Save replaces the selected writable settings atomically with a recovery snapshot, while Export creates a separate portable file. Character Card metadata portability is now active.

The Character Card fixture and current SillyTavern handling are now audited in [[Sources/concepts/sillytavern-ui-rework/CHARACTER-CARD-COMPATIBILITY-SPEC|Character Card Compatibility and Portability Specification]]. The baseline preserves V1/V2/V3 and unknown-extension compatibility through a preserved source envelope plus normalized runtime view, with strict target-aware JSON/PNG export and retained CharX support for assets. Confirm whether new rework-specific preferences are app-local by default and only exported through an explicit namespaced-metadata option; then advance to Lorebook compatibility.

## Subsections

- No subordinate headings.

## Navigation

- Parent: [[Sources/concepts/sillytavern-ui-rework/REWORK-PLAN|SillyTavern Rework — Living Delivery Plan]]
- Previous: [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/21 Working backlog structure|21. Working backlog structure]]
- Next: [[Entries/concepts/sillytavern-ui-rework/REWORK-PLAN/23 Astra follow-up and exit-review constraints|23. Astra follow-up and exit-review constraints]]

- Source location: `ST-UI/sillytavern-ui-rework/REWORK-PLAN.md:703`
