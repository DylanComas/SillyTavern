# Settings, Defaults, and Versioning Specification

**Status:** Agreed — Phase 1 settings question complete  
**First recorded:** 2026-09-04  
**Related:** [Development Bible](./README.md) · [Product Definition](./PRODUCT-DEFINITION.md) · [Living Delivery Plan](./REWORK-PLAN.md)

This specification separates developer-authored product defaults from writable user configuration and from the user-pinned Generation Settings bundle already called Default Settings. It defines how configuration changes are authored, validated, promoted, versioned, documented, protected, saved, exported, and owned.

## 1. Terminology boundary

Two different concepts must not share the same name:

- **Factory Defaults** are the developer-authored, application-owned safe baseline shipped with a particular build. Normal application use cannot overwrite them.
- **Default Settings** remains the user-selected, pinned Generation Settings file used for new-chat fallback and the existing **Revert to Default Settings** action.

The recovery action that deliberately ignores the user's pinned bundle is therefore named **Restore Factory Defaults**. It is separate, explains the affected scope, and never deletes chats, characters, personas, Lorebooks, Memorybooks, or reusable settings files.

Packaging Factory Defaults inside an Electron module makes them inaccessible to ordinary settings writes, but it does not make them secret or impossible for a determined user to unpack. Correctness and safety depend on read-only application boundaries, validation, constrained paths, and package integrity rather than obscurity.

## 2. Version identities

One visible version number cannot safely perform every versioning job. The product records three related identities:

### 2.1 Application version

The application uses semantic versions beginning at `0.0.1`. Every validated development build or promoted behavioral configuration change increments the internal application version and receives a corresponding local changelog entry. Unvalidated working edits remain development work rather than pretending to be a release. Version `1.0.0` is reserved for the first public release.

Before `1.0.0`, patch increments represent small compatible validated changes and minor increments may mark larger development milestones or intentionally incompatible pre-release work. After `1.0.0`, normal semantic-versioning compatibility rules apply.

### 2.2 Settings schema version

Every persisted settings document includes a machine-readable schema version independent of the application version. It changes only when stored field shape or meaning requires a migration. The application migrates known older schemas through explicit ordered migration functions, validates the result, and preserves a recoverable pre-migration copy.

Separating schema version from application version prevents an ordinary UI, prompt, or default-value change from triggering a fake data migration.

### 2.3 Factory Defaults revision

Every promoted Factory Defaults set receives a monotonically increasing revision plus a deterministic content hash. The build records the application version, schema version, Factory Defaults revision, and hash together. This permits tests and diagnostics to identify the exact baseline without treating every default-value change as a persistence-schema change.

## 3. Development authoring and promotion

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

## 4. Changelog and behavioral record

Every validated internal application version owns a local changelog record, for example `changes/0.0.1.md`. Each record uses the headings **Added**, **Changed**, **Removed**, **Fixed**, **Migration**, and **Intended behavior**, omitting only empty categories.

The intended-behavior section explains observable results and important invariants rather than restating filenames. Settings-schema migrations also appear in a machine-oriented migration ledger containing source version, target version, transformation, validation, rollback behavior, and test references. Release notes may later be generated from these local records without replacing them.

## 5. Protection and validation

Critical configuration is protected in layers:

- Factory Defaults are immutable through ordinary application APIs and UI.
- A strict schema rejects unknown or mistyped critical fields where silent acceptance would be unsafe.
- Semantic validation enforces relations such as Warning below Protection, legal context/output limits, compatible feature combinations, and valid enum values.
- Paths are normalized, resolved, and checked against approved application or user-data roots before use; a configured string is never trusted merely because it passed parsing.
- Feature flags and dangerous toggles declare their owner, default, dependencies, supported platforms, and fallback behavior.
- Invalid writable configuration is quarantined with a diagnostic explanation; the app loads the last valid user state or Factory Defaults without overwriting the damaged source.
- Atomic writes, checksums, backups, and migration snapshots protect writable settings.
- Production package signing and integrity checks detect accidental or external bundle modification, while documentation remains honest that locally controlled software can ultimately be altered by its operator.

Comments in the development source improve maintenance but are not enforcement. The schema, validators, tests, and use-site guards are authoritative.

## 6. Logical settings ownership

Ownership here means which data layer is authoritative for a value and which user action may change it. It does not assert ownership of upstream or third-party code; licensing and attribution remain separate concerns.

| Layer | Owns | Must not own or mutate |
| --- | --- | --- |
| Factory Defaults | Safe built-in values, hard safety bounds, schema/default revisions, platform path policy, initial feature availability | User preferences, selected credentials, chat state, or the pinned Default Settings file |
| Application Preferences | Device/app presentation, accessibility, enabled modules, provider profiles, credential references, general tracker/worker/research preferences | Exact state of an existing chat or reusable Character/Persona content |
| Default Settings | One explicitly pinned Generation Settings file used as the user's known-good generation fallback | Factory safety bounds, Character/Persona identity, or existing chat history |
| Generation Settings | Model, base preset, selected Preset Configuration, Temperature, Top P, Top K, Context Size, Response Length, and supported advanced generation values | The preset's internal rule definitions or global application preferences |
| Preset Configuration | One named version of a base preset's complete rules and switches | Model credentials, chat memory, or global application behavior |
| Character Defaults | Character Lorebook associations, optional preferred Persona, model, and preset, plus character-scoped preferences approved by the metadata contract | Memory learned in another chat or silent changes to global/user defaults |
| Persona Defaults | Persona Lorebook associations and persona-scoped behavior/presentation approved by the metadata contract | A Character's preferred model/preset or memory learned in another chat |
| Chat State | The exact resolved Persona, model, preset, selected settings, Lorebooks, Memorybook, trackers, and overrides for that chat | Any reusable default unless the user invokes an explicit save or export action |

Resolution is field-aware rather than a blind merge of complete objects. An existing chat restores its Chat State exactly. A new chat is assembled from Factory Defaults and Application Preferences, then the pinned Default Settings, relevant Persona associations, and optional Character preferences according to the previously agreed new-chat rules; the resolved result becomes that chat's own snapshot.

## 7. User Save and Export contract

The rework keeps SillyTavern's direct Save/Export mental model rather than introducing Save As or user-facing immutable revisions:

- **Save** atomically rewrites the currently selected writable user settings file or managed settings object.
- **Export** writes a new portable file chosen by the user and does not silently change which settings are active.
- **Import** validates and previews a portable file before copying or applying it to managed user settings; it never writes into Factory Defaults.
- Factory Defaults are never a writable Save target. A user settings document is seeded from them when no writable document exists.
- If the selected Generation Settings file is pinned as Default Settings, Save updates that same pinned file. The UI identifies it as the active default so the consequence is visible without adding a confirmation to every save.
- Before replacement, Save creates an automatic recoverable snapshot and uses a temporary file plus atomic rename. Recovery history is an implementation safeguard, not a separate user-facing version system.
- Export includes its schema version, stable object identity where applicable, compatibility metadata, and no secrets unless a separate explicit encrypted-secret export is designed later.
- Revert to Default Settings loads the current contents of the pinned file into the active chat without modifying Character Defaults, Persona Defaults, other saved configurations, or chat history.
- Import, export, backup, and migration preserve names, pins, associations, and stable references; collisions require an explicit replace, merge, or imported-copy result.

Save and Export are distinct actions in the UI. Export is the route for creating another file; Save is deliberately simple and replaces the selected writable settings.

## 8. Phase 1 decision

Settings versioning and ownership are complete for Phase 1. The accepted contract uses **Factory Defaults** for the compiled developer baseline and **Default Settings** for the user's pinned Generation Settings file; records independent application, settings-schema, and Factory Defaults revisions; validates and promotes developer configuration before compilation; applies the field-aware ownership table; and uses Save to replace current user settings while Export creates a separate file.

Exact filenames, serialization library, schema technology, backup retention count, and promotion command are architecture and implementation decisions. They must preserve this contract but do not keep product definition open.

## 9. Resolved values and mutable references

Exact chat restoration requires the saved resolved generation values and complete effective preset rules/switches, not just IDs pointing at editable files. Store referenced IDs, revisions/content hashes, and the resolved values needed to rebuild that chat's generation request. Saving a reusable preset or Generation Settings file must not silently change another existing chat's resolved snapshot. Explicitly loading it into a chat adopts the new values. This is internal reproducibility, not the rejected user-facing immutable settings system.

Reusable Character/Persona prose and Lorebook content are a separate policy question. The current Lorebook shortcut permits normal edits to affect later context; do not claim that this is a historical content snapshot. Before Phase 1 closes, confirm whether those linked resources follow current edits with a changed-content notice or use retained revisions with explicit adoption. Keep reference identities and revision evidence in either case, and retain deleted-reference repair behavior.
