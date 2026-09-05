# Rework-only working boundary

- Work only in `ST-UI/sillytavern-ui-rework/` and `Project Vault/`. Never audit, inspect, test, or fix `SIllyTavern Original/` or the extension clones. Historical audit evidence is context, not authorization to revisit them.
- Read `../../Project Vault/00 Project Home.md`, Current Context, and relevant document indexes. Keep Project context, tasks, decisions, and work log current.
- This folder holds authoritative rework specifications, not a finished runtime. Distinguish accepted behavior, proposals, implementation contracts, prototypes, and measured results.
- Every standalone durable concept needs its own populated subordinate heading with the correct immediate parent. Document roots stay indexes.
- Edit authored sources, never generated Vault entries. Operational `AGENTS.md` files are excluded from document mirroring.
- Run `node "Project Vault/System/sync-project-vault.mjs" --check` from the workspace root, then without `--check`; inspect the report. Historical Vault `concepts/` subpaths remain stable note IDs despite relocated source files.
- The user explicitly authorized a local Git checkpoint of the existing folder layout on 2026-09-05. Preserve that structure and history; no pushing, further repository restructuring, original-app updater/CI changes, extension edits, or `.obsidian/` changes without explicit authorization. Recording relocated files in Git does not authorize reviewing or editing their contents.
- Finish the Astra audit follow-up and its Added/Modified/Removed changelog before resuming Phase 1 closure. Open product choices must not be marked accepted merely to complete an audit.
