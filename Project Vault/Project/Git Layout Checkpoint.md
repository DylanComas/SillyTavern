---
tags:
  - project/maintenance
---

# Git Layout Checkpoint

Authorized 2026-09-05: record the user's existing folder layout in a local Git commit, without pushing or changing application/extension contents. This is a specific exception to the previous prohibition on staging the migration. It does not authorize moving folders, auditing the original application/extensions, enabling updater/CI workflows, or restructuring repository history.

## Baseline

The old HEAD is `8172dcd0ee672d3cd9a5e5f7af134f91a45cd2b8`. Its 988 tracked paths were staged as deletions, producing the 280,205-line deletion count. A path-existence check confirmed that every one has a corresponding file under `SIllyTavern Original/`. The checkpoint records those relocated historical files along with the current rework, artwork, audit handoff, and Vault. No source contents are reviewed or modified for that operation.

The outer repository and its parent history remain in place. The user's `SIllyTavern Original/`, `ST-UI/`, and `Project Vault/` folders remain exactly where they are. This is a local checkpoint only, not a release or a push.

## Local-only exclusions

The new root `.gitignore` excludes the five extension checkouts, additional untracked original-app files, Obsidian configuration, synchronization recovery copies, checkpoint recovery metadata, dependencies, local model files, credentials, and platform caches. The original application's historical tracked files are explicitly staged at their new paths and remain tracked despite the directory ignore rule. No ignored content is deleted.

Before staging, retain the existing Git index and HEAD identifier under this Vault's ignored `.git-checkpoint-recovery/` area. Prior commits remain recoverable through normal Git history. No Git author was configured; use the explicitly labeled automation identity `Codex <codex@localhost>` for this checkpoint only, without changing global identity settings.

## Scope after checkpoint

Future work remains confined to the rework and Vault. The local commit acknowledges the current outer repository layout; it does not make the moved original-app updater or CI operational. Those remain untouched. Phase 1 product closure has not resumed.
