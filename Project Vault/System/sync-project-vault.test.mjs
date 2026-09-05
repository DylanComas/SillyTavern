import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';
import { publishGeneration, recoverGeneration } from './vault-generation.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const project = path.resolve(here, '../..');
function temporary(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'st-vault-test-'));
  t.after(() => {
    assert.equal(path.dirname(root), fs.realpathSync(os.tmpdir()));
    assert.ok(path.basename(root).startsWith('st-vault-test-'));
    fs.rmSync(root, { recursive: true, force: true });
  });
  return root;
}
function write(root, name, value) {
  fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
  fs.writeFileSync(path.join(root, name), value);
}
function fixture(t) {
  const root = temporary(t);
  const vault = path.join(root, 'Project Vault');
  for (const name of ['sync-project-vault.mjs', 'vault-generation.mjs']) write(vault, `System/${name}`, fs.readFileSync(path.join(here, name)));
  for (const group of ['sillytavern-ui-rework', 'Concept Arts']) {
    for (const name of fs.readdirSync(path.join(project, 'ST-UI', group)).filter(name => name.endsWith('.md'))) write(root, `ST-UI/${group}/${name}`, '# Document\n\nOverview.\n\n## Concept\n\nPopulated concept.\n');
  }
  write(vault, '00 Project Home.md', '# Home\n');
  write(vault, 'Project/Current Context.md', '# Context\nAuthored content.\n');
  return { root, vault, run: (...args) => spawnSync(process.execPath, [path.join(vault, 'System/sync-project-vault.mjs'), ...args], { encoding: 'utf8' }) };
}
function hashes(root) {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? hashes(path.join(root, entry.name)).map(([name, text]) => [`${entry.name}/${name}`, text])
    : [[entry.name, fs.readFileSync(path.join(root, entry.name), 'utf8')]]);
}

test('valid sync preserves historical IDs, area tags, authored notes, and recovery copies', t => {
  const { vault, run } = fixture(t);
  assert.equal(run().status, 0);
  const note = 'Sources/concepts/sillytavern-unified-suite/README.md';
  const text = fs.readFileSync(path.join(vault, note), 'utf8');
  assert.match(text, /source_path: "ST-UI\/Concept Arts\/README.md"/);
  assert.match(text, /area\/unified-suite/);
  assert.match(fs.readFileSync(path.join(vault, 'Project/Current Context.md'), 'utf8'), /Authored content/);
  assert.equal(run('--check').status, 0);
  assert.equal(fs.readdirSync(path.join(vault, '.sync-recovery')).length, 1);
  assert.equal(run().status, 0);
  assert.equal(fs.readdirSync(path.join(vault, '.sync-recovery')).length, 2);
});

for (const problem of ['root', 'document', 'empty-document', 'empty-heading', 'broken-link', 'broken-anchor']) {
  test(`failed ${problem} validation leaves the last generation unchanged`, t => {
    const { root, vault, run } = fixture(t);
    assert.equal(run().status, 0);
    const before = hashes(vault);
    const source = path.join(root, 'ST-UI/sillytavern-ui-rework/README.md');
    if (problem === 'root') fs.renameSync(path.join(root, 'ST-UI/Concept Arts'), path.join(root, 'moved-art'));
    if (problem === 'document') fs.renameSync(source, `${source}.missing`);
    if (problem === 'empty-document') fs.writeFileSync(source, '');
    if (problem === 'empty-heading') fs.appendFileSync(source, '\n## Empty\n');
    if (problem === 'broken-link') fs.appendFileSync(source, '\n[[Entries/missing-note]]\n');
    if (problem === 'broken-anchor') fs.appendFileSync(source, '\n[Missing](./README.md#missing)\n');
    assert.notEqual(run().status, 0);
    assert.deepEqual(hashes(vault), before);
  });
}

const generation = new Map([
  ['Sources/doc.md', 'new source'], ['Entries/entry.md', 'new entry'],
  ['01 Document Index.md', 'new index'], ['02 Heading Index.md', 'new headings'],
  ['System/Inventory.md', 'new inventory'], ['System/Sync Report.md', 'new report'],
]);
test('publish failure restores every replaced target and releases the lock', t => {
  const root = temporary(t);
  for (const [name] of generation) write(root, name, 'old');
  assert.throws(() => publishGeneration(root, generation, { afterReplace: name => { if (name === 'System/Inventory.md') throw new Error('simulated'); } }), /simulated/);
  for (const [name] of generation) assert.equal(fs.readFileSync(path.join(root, name), 'utf8'), 'old');
  assert.ok(!fs.existsSync(path.join(root, '.sync-lock')));
});
test('concurrent publisher is refused without touching files', t => {
  const root = temporary(t);
  fs.mkdirSync(path.join(root, '.sync-lock'));
  assert.throws(() => publishGeneration(root, generation), /locked/);
  assert.ok(!fs.existsSync(path.join(root, 'Sources')));
});
test('unsafe generated paths cannot replace authored notes', t => {
  const root = temporary(t);
  for (const name of ['../outside.md', 'Project/Current Context.md', 'Sources/../../outside.md', 'Sources/../Project/Current Context.md']) assert.throws(() => publishGeneration(root, new Map([[name, 'bad']])));
});
test('interrupted publish restores journal targets from the retained backup', t => {
  const root = temporary(t);
  write(root, '.sync-recovery/run/backup/01 Document Index.md', 'old index');
  write(root, '.sync-recovery/run/journal.json', JSON.stringify({ version: 1, status: 'publishing', existed: ['01 Document Index.md'], started: ['01 Document Index.md'] }));
  write(root, '.sync-lock/recovery.txt', path.join(root, '.sync-recovery/run'));
  write(root, '01 Document Index.md', 'half-published');
  recoverGeneration(root);
  assert.equal(fs.readFileSync(path.join(root, '01 Document Index.md'), 'utf8'), 'old index');
  assert.ok(!fs.existsSync(path.join(root, '.sync-lock')));
});

test('art links resolve from generated entry location and operational instructions are not mirrored', t => {
  const { root, vault, run } = fixture(t);
  write(root, 'ST-UI/sillytavern-ui-rework/AGENTS.md', '# Operational instructions\n');
  fs.appendFileSync(path.join(root, 'ST-UI/sillytavern-ui-rework/README.md'), '\n![Art](../Concept%20Arts/desktop-diagonal-theme.png)\n');
  assert.equal(run().status, 0);
  const note = 'Entries/concepts/sillytavern-ui-rework/README/01 Concept.md';
  const text = fs.readFileSync(path.join(vault, note), 'utf8');
  assert.match(text, /!\[Art\]\(<\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/ST-UI\/Concept Arts\/desktop-diagonal-theme.png>\)/);
  assert.ok(!fs.existsSync(path.join(vault, 'Sources/concepts/sillytavern-ui-rework/AGENTS.md')));
});
