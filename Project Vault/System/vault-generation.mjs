import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const targets = ['Sources', 'Entries', '01 Document Index.md', '02 Heading Index.md', 'System/Inventory.md', 'System/Sync Report.md'];

function contained(root, relative) {
  if (relative.split(/[\\/]/).some(part => ['..', '.', ''].includes(part))) throw new Error(`Non-canonical generated path: ${relative}`);
  const result = path.resolve(root, relative);
  if (!relative || path.relative(root, result).startsWith('..') || path.isAbsolute(path.relative(root, result))) {
    throw new Error(`Unsafe generated path: ${relative}`);
  }
  // Never follow a junction/symlink when publishing or recovering generated data.
  let current = root;
  for (const part of path.relative(root, result).split(path.sep)) {
    current = path.join(current, part);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) throw new Error(`Linked path refused: ${current}`);
  }
  return result;
}

function saveJournal(directory, journal) {
  const temporary = path.join(directory, 'journal.next.json');
  fs.writeFileSync(temporary, JSON.stringify(journal, null, 2));
  fs.renameSync(temporary, path.join(directory, 'journal.json'));
}

function restore(vaultRoot, recovery, journal) {
  for (const relative of [...journal.started].reverse()) {
    if (!targets.includes(relative)) throw new Error(`Unexpected recovery target: ${relative}`);
    const live = contained(vaultRoot, relative);
    const backup = contained(recovery, `backup/${relative}`);
    if (journal.existed.includes(relative) && !fs.existsSync(backup)) throw new Error(`Missing recovery copy: ${relative}`);
    fs.rmSync(live, { recursive: true, force: true });
    if (journal.existed.includes(relative)) {
      fs.mkdirSync(path.dirname(live), { recursive: true });
      fs.cpSync(backup, live, { recursive: true });
    }
  }
  journal.status = 'restored';
  saveJournal(recovery, journal);
}

/** Publish an already validated generation. No authored notes or Obsidian settings are replaced. */
export function publishGeneration(vaultRoot, files, { afterReplace = () => {} } = {}) {
  vaultRoot = fs.realpathSync(vaultRoot);
  for (const relative of files.keys()) {
    if (!targets.some(target => relative === target || (['Sources', 'Entries'].includes(target) && relative.startsWith(`${target}/`)))) {
      throw new Error(`Not a generated target: ${relative}`);
    }
    contained(vaultRoot, relative);
  }
  for (const target of targets) contained(vaultRoot, target);
  const recoveryRoot = contained(vaultRoot, '.sync-recovery');
  fs.mkdirSync(recoveryRoot, { recursive: true });
  const lock = contained(vaultRoot, '.sync-lock');
  try { fs.mkdirSync(lock); } catch (error) {
    if (error.code === 'EEXIST') throw new Error('Sync is locked. Another sync may be active; after a crash inspect .sync-lock and run --recover.');
    throw error;
  }
  const recovery = contained(recoveryRoot, `${Date.now()}-${randomUUID()}`);
  fs.mkdirSync(recovery);
  const journal = { version: 1, status: 'preparing', existed: [], started: [] };
  fs.writeFileSync(path.join(lock, 'recovery.txt'), recovery);
  try {
    saveJournal(recovery, journal);
    // Stage every output and copy every old target BEFORE any replacement.
    for (const [relative, content] of files) {
      const staged = contained(recovery, `staged/${relative}`);
      fs.mkdirSync(path.dirname(staged), { recursive: true });
      fs.writeFileSync(staged, content);
      if (fs.readFileSync(staged, 'utf8') !== content) throw new Error(`Staging verification failed: ${relative}`);
    }
    for (const relative of targets) {
      const live = contained(vaultRoot, relative);
      if (!fs.existsSync(live)) continue;
      journal.existed.push(relative);
      const backup = contained(recovery, `backup/${relative}`);
      fs.mkdirSync(path.dirname(backup), { recursive: true });
      fs.cpSync(live, backup, { recursive: true, dereference: false });
    }
    journal.status = 'publishing';
    saveJournal(recovery, journal);
    for (const relative of targets) {
      const live = contained(vaultRoot, relative);
      journal.started.push(relative);
      saveJournal(recovery, journal);
      fs.rmSync(live, { recursive: true, force: true });
      fs.mkdirSync(path.dirname(live), { recursive: true });
      fs.renameSync(contained(recovery, `staged/${relative}`), live);
      afterReplace(relative);
    }
    journal.status = 'complete';
    saveJournal(recovery, journal);
  } catch (error) {
    // If recovery itself fails, leave the lock and journal for explicit recovery.
    restore(vaultRoot, recovery, journal);
    fs.rmSync(lock, { recursive: true });
    throw error;
  }
  fs.rmSync(lock, { recursive: true });
  return recovery;
}

/** Recover only the transaction named by this vault's lock; never accept arbitrary paths. */
export function recoverGeneration(vaultRoot) {
  vaultRoot = fs.realpathSync(vaultRoot);
  const lock = contained(vaultRoot, '.sync-lock');
  const recoveryRoot = contained(vaultRoot, '.sync-recovery');
  const recorded = fs.readFileSync(path.join(lock, 'recovery.txt'), 'utf8');
  if (path.dirname(recorded) !== recoveryRoot) throw new Error('Recovery journal is outside this vault.');
  const recovery = contained(recoveryRoot, path.basename(recorded));
  const journal = JSON.parse(fs.readFileSync(path.join(recovery, 'journal.json'), 'utf8'));
  if (journal.version !== 1 || !Array.isArray(journal.started) || !Array.isArray(journal.existed)) throw new Error('Invalid recovery journal.');
  if (!['complete', 'restored'].includes(journal.status)) restore(vaultRoot, recovery, journal);
  fs.rmSync(lock, { recursive: true });
  return recovery;
}
