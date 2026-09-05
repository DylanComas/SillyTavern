---
tags:
  - vault/system
---

# Vault Maintenance

## Authority

- Repository implementation files are authoritative for code and configuration.
- Vault notes are authoritative for decisions, plans, research, task state, and working context.
- The in-scope concept documents are authoritative over their generated document indexes and heading-entry notes.

## Before project work

1. Read [[../00 Project Home|Project Home]].
2. Read [[../Project/Current Context|Current Context]].
3. Use [[../01 Document Index|Document Index]] and [[../02 Heading Index|Heading Index]] to open relevant material.

## After meaningful work

1. Update [[../Project/Current Context|Current Context]] if the project state or active focus changed.
2. Record durable choices in [[../Project/Decisions|Decisions]].
3. Record completed documentation or knowledge-base work in [[../Project/Work Log|Work Log]].
4. Synchronize the vault if repository documents changed.

## Synchronization

Run from the repository root:

```powershell
node "Project Vault/System/sync-project-vault.mjs"
```

The synchronization process:

- discovers Markdown files only under `ST-UI/sillytavern-ui-rework/` and `ST-UI/Concept Arts/`, excluding operational `AGENTS.md` files;
- excludes SillyTavern repository documentation and imported extension documentation;
- requires configured roots and expected documents before rendering;
- renders a candidate generation and validates counts, populated bodies, immediate parents, and links before replacing anything;
- publishes only allowlisted generated targets, after staging and retaining complete recovery copies; ordinary publish failures roll back;
- refuses unexpected legacy `Indexes/` rather than silently deleting it;
- turns each document's first heading into a document-index note under `Sources/`;
- creates one note under `Entries/` for every remaining Markdown heading from level 1 through level 6;
- preserves direct section text, hierarchy, document order, source provenance, and internal document links;
- records and validates each entry's immediate parent note;
- rejects subordinate headings with no useful direct body text;
- refreshes the document index, heading index, inventory, and sync report;
- leaves hand-maintained notes under `Project/` untouched.

Use `--check` first for a read-only validation. Missing roots/documents, empty sections, and broken links must leave live notes and the last successful report unchanged. Existing `Sources/concepts/` and `Entries/concepts/` subpaths are deliberate stable note IDs; `source_path` metadata records the new `ST-UI/` locations. `area/unified-suite` remains unchanged for the existing graph configuration.

Recovery copies and a transaction journal are retained under `.sync-recovery/`. A `.sync-lock` prevents overlapping publication. After an interrupted publish, confirm no synchronizer is active and run the same command with `--recover`; it restores only the transaction recorded by that Vault's lock. Do not delete recovery copies without an explicitly scoped cleanup. Multi-target publication is recoverable, not a filesystem-wide atomic transaction; a crash can require recovery before the next sync.

Regression tests: `node --test "Project Vault/System/sync-project-vault.test.mjs"`. Tests use temporary synthetic workspaces; they do not inspect the original application or extension clones. Work and edits are restricted to `ST-UI/sillytavern-ui-rework/` and this Vault. The existing Concept Arts documents are only mirrored, not edited or re-audited.

## Generated areas

Do not edit `Sources/` or `Entries/` directly. Make the change in the original repository document and synchronize again.

Do not widen the source scope without an explicit user request.

Every standalone concept that becomes a durable decision must receive its own subordinate heading in the appropriate authoritative concept document. Summary tables may repeat or link the decision, but cannot be its only home. Parent headings must also contain a short useful overview so their generated notes are never empty shells around child links.

The `.obsidian/` directory belongs to Obsidian and should only be changed for an intentional vault configuration update.

## Graph View legend

- Red: home and navigation indexes.
- Amber: UI-rework document indexes and heading entries (`area/ui-rework`).
- Lime: unified-suite document indexes and heading entries (`area/unified-suite`).
- Green: living project notes under `Project/`.
- Teal: vault-maintenance and generated system notes under `System/`.

Unresolved links and orphan notes are hidden in the global Graph View to keep the curated project structure readable. Generated document indexes and heading-entry notes carry area tags, so their hierarchy forms visible area clusters.
