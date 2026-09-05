# Vault maintenance boundary

- Work only in `ST-UI/sillytavern-ui-rework/` and this Vault. Never audit, inspect, test, or fix `SIllyTavern Original/` or the extension clones. The existing Concept Arts documents may be mirrored by the Vault synchronizer, but are not an editing/audit target.
- Start with `00 Project Home.md`, `Project/Current Context.md`, and the relevant indexes. Authored source specifications govern generated notes; hand-maintained Project notes govern task and decision state.
- Mirror Markdown only from `ST-UI/sillytavern-ui-rework/` and `ST-UI/Concept Arts/`. Never widen this to original-application or extension documentation.
- Every standalone durable concept needs a populated subordinate source heading and correct immediate parent; document roots remain indexes.
- Never edit generated `Sources/` and `Entries/` directly. Historical `concepts/` subpaths are stable Obsidian IDs, not source locations.
- Validate with `node "Project Vault/System/sync-project-vault.mjs" --check`, then publish without the flag. Failed validation must leave live notes and the last successful report unchanged.
- Recovery copies remain in `.sync-recovery/`. After an interrupted publish, confirm no synchronizer is running before invoking `--recover`. Do not remove backups without explicit cleanup scope.
- Do not change `.obsidian/` without an intentional user-requested configuration change.
- Update Current Context, Tasks, Decisions, and Work Log after meaningful work. Finish the audit follow-up before resuming Phase 1 closure.
