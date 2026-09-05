import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { publishGeneration, recoverGeneration } from './vault-generation.mjs';

const scriptPath = fileURLToPath(import.meta.url);
const systemRoot = path.dirname(scriptPath);
const vaultRoot = path.resolve(systemRoot, '..');
const repositoryRoot = path.resolve(vaultRoot, '..');
const generatedAt = new Date().toISOString();
const argumentsList = process.argv.slice(2);
if (argumentsList.length > 1 || argumentsList.some(argument => !['--check', '--recover'].includes(argument))) throw new Error('Usage: sync-project-vault.mjs [--check | --recover]');
const checkOnly = process.argv.includes('--check');
if (process.argv.includes('--recover')) {
  console.log(`Recovered: ${recoverGeneration(vaultRoot)}`);
  process.exit(0);
}
const outputFiles = new Map();
const outputKeys = new Set();

const sourceRoots = [
  path.resolve(repositoryRoot, 'ST-UI', 'sillytavern-ui-rework'),
  path.resolve(repositoryRoot, 'ST-UI', 'Concept Arts'),
];
const requiredDocuments = [
  ['README.md', 'PRODUCT-DEFINITION.md', 'REWORK-PLAN.md', 'PROMPTS.md', 'CHARACTER-CARD-COMPATIBILITY-SPEC.md', 'SETTINGS-VERSIONING-SPEC.md', 'MEMORYBOOK-FUNCTIONAL-SPEC.md', 'MEMORYBOOK-FOUNDATION-AUDIT.md', 'TRACKER-FOUNDATION-AUDIT.md', 'SCENE-STATE-TRACKER-SPEC.md', 'STATE-WORKER-FOUNDATION-AUDIT.md', 'IMPLEMENTATION-CONTRACTS.md', 'WORKFLOW-SURFACE-MAP.md'],
  ['README.md', 'PROMPTS.md'],
];
for (const [index, root] of sourceRoots.entries()) {
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) throw new Error(`Missing source root: ${root}`);
  for (const name of requiredDocuments[index]) {
    if (!fs.existsSync(path.join(root, name))) throw new Error(`Missing required source: ${path.join(root, name)}`);
  }
}

// Source provenance uses the new paths; existing Obsidian IDs deliberately stay stable.
function noteIdentity(sourcePath) {
  return sourcePath.replace(/^ST-UI\/sillytavern-ui-rework\//, 'concepts/sillytavern-ui-rework/')
    .replace(/^ST-UI\/Concept Arts\//, 'concepts/sillytavern-unified-suite/');
}

const groupNames = new Map([
  ['sillytavern-ui-rework', 'SillyTavern UI rework'],
  ['sillytavern-unified-suite', 'SillyTavern unified suite'],
]);

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function writeText(relativePath, content) {
  const destination = path.resolve(vaultRoot, relativePath);
  const relativeCheck = path.relative(vaultRoot, destination);
  if (relativeCheck.startsWith('..') || path.isAbsolute(relativeCheck)) {
    throw new Error(`Refusing to write outside the vault: ${relativePath}`);
  }
  const normalized = content.replace(/\r?\n/g, '\n').replace(/\s+$/, '');
  if (outputKeys.has(relativePath.toLowerCase())) throw new Error(`Duplicate output path: ${relativePath}`);
  outputKeys.add(relativePath.toLowerCase());
  outputFiles.set(relativePath, `${normalized}\n`);
}

function discoverDocuments(directory, results = []) {
  if (!fs.existsSync(directory)) return results;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      discoverDocuments(absolutePath, results);
      continue;
    }
    if (entry.isFile() && entry.name !== 'AGENTS.md' && path.extname(entry.name).toLowerCase() === '.md') {
      results.push(absolutePath);
    }
  }
  return results;
}

function plainHeading(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeMarkdownText(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/([*_[\]`])/g, '\\$1')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function wikiTarget(relativePath) {
  return toPosix(relativePath)
    .replace(/\.md$/i, '')
    .replace(/\|/g, '¦')
    .replace(/\]/g, ')');
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function inlineCode(value) {
  return `\`${String(value).replace(/`/g, '\\`')}\``;
}

function areaTagFor(relativePath) {
  relativePath = noteIdentity(relativePath);
  if (relativePath.includes('/sillytavern-ui-rework/')) return 'area/ui-rework';
  if (relativePath.includes('/sillytavern-unified-suite/')) return 'area/unified-suite';
  return 'area/other';
}

function groupFor(relativePath) {
  relativePath = noteIdentity(relativePath);
  const parts = relativePath.split('/');
  return parts[0] === 'concepts' && parts[1] ? parts[1] : 'other';
}

function anchorSlug(value) {
  return plainHeading(value)
    .normalize('NFKC')
    .toLocaleLowerCase('en')
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

function safeFilename(value) {
  const withoutLeadingNumber = value.replace(/^\s*\d+(?:\.\d+)*(?:[.)])?\s+/, '');
  let result = plainHeading(withoutLeadingNumber || value)
    .normalize('NFKC')
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/[. ]+$/g, '')
    .trim();
  if (!result) result = 'Untitled section';
  if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(result)) result = `_${result}`;
  if (result.length > 76) result = result.slice(0, 76).replace(/[. ]+$/g, '');
  return result;
}

function parseMarkdown(content) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const headings = [];
  let fence = null;
  let frontmatterEnd = -1;

  if (lines[0]?.trim() === '---') {
    for (let index = 1; index < lines.length; index += 1) {
      if (lines[index].trim() === '---') {
        frontmatterEnd = index;
        break;
      }
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    if (frontmatterEnd >= 0 && index <= frontmatterEnd) continue;
    const line = lines[index];
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!fence) {
        fence = { character: marker[0], length: marker.length };
      } else if (marker[0] === fence.character && marker.length >= fence.length) {
        fence = null;
      }
      continue;
    }
    if (fence) continue;

    const atxMatch = line.match(/^(#{1,6})[\t ]+(.+?)\s*$/);
    if (atxMatch) {
      const rawText = atxMatch[2].replace(/[\t ]+#+[\t ]*$/, '').trim();
      if (rawText) {
        headings.push({
          level: atxMatch[1].length,
          rawText,
          title: plainHeading(rawText),
          line: index + 1,
          lineIndex: index,
          contentStart: index + 1,
        });
      }
      continue;
    }

    const nextLine = lines[index + 1];
    if (line.trim() && nextLine && /^\s*(=+|-+)\s*$/.test(nextLine)) {
      const underline = nextLine.trim();
      headings.push({
        level: underline[0] === '=' ? 1 : 2,
        rawText: line.trim(),
        title: plainHeading(line.trim()),
        line: index + 1,
        lineIndex: index,
        contentStart: index + 2,
      });
      index += 1;
    }
  }

  for (let index = 0; index < headings.length; index += 1) {
    const end = headings[index + 1]?.lineIndex ?? lines.length;
    headings[index].body = lines.slice(headings[index].contentStart, end).join('\n').trim();
    headings[index].sourceOrder = index + 1;
    headings[index].children = [];
  }

  const contentStart = frontmatterEnd >= 0 ? frontmatterEnd + 1 : 0;
  const firstHeadingLine = headings[0]?.lineIndex ?? lines.length;
  const preamble = lines.slice(contentStart, firstHeadingLine).join('\n').trim();
  return { headings, preamble };
}

function buildHierarchy(record) {
  const { headings } = record;
  if (!headings.length) return;
  const root = headings[0];
  root.parent = null;
  root.orderPath = [];
  root.noteRelativePath = record.indexRelativePath;
  const stack = [root];

  for (const heading of headings.slice(1)) {
    while (stack.length && stack[stack.length - 1].level >= heading.level) stack.pop();
    const parent = stack[stack.length - 1] || root;
    heading.parent = parent;
    parent.children.push(heading);
    heading.orderPath = [
      ...(parent === root ? [] : parent.orderPath),
      parent.children.length,
    ];
    const order = heading.orderPath.map((part) => String(part).padStart(2, '0')).join('.');
    const filename = `${order} ${safeFilename(heading.title)}.md`;
    heading.noteRelativePath = toPosix(path.join(record.entryDirectory, filename));
    stack.push(heading);
  }

  const duplicateCounts = new Map();
  record.headingByAnchor = new Map();
  for (const heading of headings) {
    const base = anchorSlug(heading.title);
    const count = duplicateCounts.get(base) || 0;
    duplicateCounts.set(base, count + 1);
    const uniqueAnchor = count === 0 ? base : `${base}-${count}`;
    record.headingByAnchor.set(uniqueAnchor, heading);
    if (!record.headingByAnchor.has(base)) record.headingByAnchor.set(base, heading);
  }
}

function outlineLines(nodes, depth = 0) {
  const lines = [];
  for (const node of nodes) {
    const label = escapeMarkdownText(node.title || node.rawText);
    lines.push(`${'  '.repeat(depth)}- [[${wikiTarget(node.noteRelativePath)}|${label}]] · H${node.level}`);
    lines.push(...outlineLines(node.children, depth + 1));
  }
  return lines;
}

function decodeLinkPart(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function rewriteRelativeLinks(body, record, recordsBySource, outputPath = record.indexRelativePath) {
  if (!body) return '';
  return body.replace(/(!?)\[([^\]]+)\]\(([^)]+)\)/g, (full, embed, label, destinationWithTitle) => {
    const destination = destinationWithTitle.trim().split(/\s+(?=["'])/)[0].replace(/^<|>$/g, '');
    if (/^[a-z][a-z0-9+.-]*:/i.test(destination) || destination.startsWith('/')) return full;

    const hashIndex = destination.indexOf('#');
    const rawPath = hashIndex >= 0 ? destination.slice(0, hashIndex) : destination;
    const rawFragment = hashIndex >= 0 ? destination.slice(hashIndex + 1) : '';
    let targetSource = record.sourceRelativePath;

    if (rawPath) {
      const decodedPath = decodeLinkPart(rawPath).replace(/\\/g, '/');
      targetSource = path.posix.normalize(path.posix.join(path.posix.dirname(record.sourceRelativePath), decodedPath));
    }

    const targetRecord = recordsBySource.get(targetSource.toLocaleLowerCase('en'));
    if (!targetRecord) {
      const relative = path.posix.relative(path.posix.dirname(`Project Vault/${outputPath}`), targetSource);
      return `${embed}[${label}](<${relative}${rawFragment ? `#${rawFragment}` : ''}>)`;
    }

    let noteRelativePath = targetRecord.indexRelativePath;
    if (rawFragment) {
      const fragment = anchorSlug(decodeLinkPart(rawFragment));
      const targetHeading = targetRecord.headingByAnchor.get(fragment);
      if (!targetHeading) throw new Error(`Unresolved source heading: ${record.sourceRelativePath} -> ${destination}`);
      noteRelativePath = targetHeading.noteRelativePath;
    }
    return `${embed}[[${wikiTarget(noteRelativePath)}|${label}]]`;
  });
}

function breadcrumbFor(record, heading) {
  const ancestors = [];
  let current = heading.parent;
  while (current) {
    ancestors.unshift(current);
    current = current.parent;
  }
  if (!ancestors.length || ancestors[0] !== record.root) ancestors.unshift(record.root);
  return ancestors
    .map((ancestor) => `[[${wikiTarget(ancestor.noteRelativePath)}|${escapeMarkdownText(ancestor.title)}]]`)
    .join(' › ');
}

function renderDocumentIndex(record, recordsBySource) {
  const root = record.root;
  const title = root?.title || record.title;
  const rootBodyParts = [record.parsed.preamble, root?.body]
    .filter(Boolean)
    .map((part) => rewriteRelativeLinks(part, record, recordsBySource));
  const sections = root?.children.length ? outlineLines(root.children).join('\n') : '- No subordinate headings.';
  const overview = rootBodyParts.length ? `\n## Overview\n\n${rootBodyParts.join('\n\n')}` : '';

  return `---
generated: true
type: document-index
source_path: ${yamlString(record.sourceRelativePath)}
source_heading_line: ${root?.line || 0}
heading_count: ${record.headings.length}
tags:
  - vault/index
  - ${record.areaTag}
---

# ${escapeMarkdownText(title)}

> Generated document index. The original repository Markdown file remains authoritative.

- Source: ${inlineCode(record.sourceRelativePath)}
- Headings represented: ${record.headings.length}${overview}

## Sections

${sections}
`;
}

function renderHeadingEntry(record, heading, recordsBySource) {
  const body = rewriteRelativeLinks(heading.body, record, recordsBySource, heading.noteRelativePath);
  const children = heading.children.length
    ? heading.children.map((child) => `- [[${wikiTarget(child.noteRelativePath)}|${escapeMarkdownText(child.title)}]]`).join('\n')
    : '- No subordinate headings.';
  const previous = record.headings[heading.sourceOrder - 2];
  const next = record.headings[heading.sourceOrder];
  const parent = heading.parent || record.root;
  const navigation = [
    `- Parent: [[${wikiTarget(parent.noteRelativePath)}|${escapeMarkdownText(parent.title)}]]`,
    previous ? `- Previous: [[${wikiTarget(previous.noteRelativePath)}|${escapeMarkdownText(previous.title)}]]` : null,
    next ? `- Next: [[${wikiTarget(next.noteRelativePath)}|${escapeMarkdownText(next.title)}]]` : null,
  ].filter(Boolean).join('\n');
  const content = body ? `\n${body}\n` : '\n> This heading has no direct body text; its content is organized in the linked subsections.\n';

  return `---
generated: true
type: heading-entry
source_path: ${yamlString(record.sourceRelativePath)}
source_line: ${heading.line}
heading_level: ${heading.level}
heading_order: ${yamlString(heading.orderPath.map((part) => String(part).padStart(2, '0')).join('.'))}
document_index: ${yamlString(`[[${wikiTarget(record.indexRelativePath)}]]`)}
parent_note: ${yamlString(`[[${wikiTarget(parent.noteRelativePath)}]]`)}
direct_body: ${body ? 'populated' : 'empty'}
tags:
  - vault/entry
  - ${record.areaTag}
---

# ${escapeMarkdownText(heading.title)}

> ${breadcrumbFor(record, heading)}
${content}
## Subsections

${children}

## Navigation

${navigation}

- Source location: ${inlineCode(`${record.sourceRelativePath}:${heading.line}`)}
`;
}

const sourceFiles = sourceRoots.flatMap((sourceRoot) => discoverDocuments(sourceRoot)).sort((a, b) =>
  toPosix(path.relative(repositoryRoot, a)).localeCompare(
    toPosix(path.relative(repositoryRoot, b)),
    'en',
    { sensitivity: 'base' },
  ),
);

const records = sourceFiles.map((sourcePath) => {
  const sourceRelativePath = toPosix(path.relative(repositoryRoot, sourcePath));
  const content = fs.readFileSync(sourcePath, 'utf8');
  const parsed = parseMarkdown(content);
  const stablePath = noteIdentity(sourceRelativePath);
  const stem = stablePath.replace(/\.md$/i, '');
  const record = {
    sourcePath,
    sourceRelativePath,
    content,
    parsed,
    headings: parsed.headings,
    title: parsed.headings[0]?.title || path.basename(stem),
    root: parsed.headings[0] || null,
    areaTag: areaTagFor(sourceRelativePath),
    group: groupFor(sourceRelativePath),
    indexRelativePath: toPosix(path.join('Sources', stablePath)),
    entryDirectory: toPosix(path.join('Entries', stem)),
    bytes: fs.statSync(sourcePath).size,
  };
  buildHierarchy(record);
  return record;
});

const recordsBySource = new Map(
  records.map((record) => [record.sourceRelativePath.toLocaleLowerCase('en'), record]),
);

for (const record of records) {
  writeText(record.indexRelativePath, renderDocumentIndex(record, recordsBySource));
  for (const heading of record.headings.slice(1)) {
    writeText(heading.noteRelativePath, renderHeadingEntry(record, heading, recordsBySource));
  }
}

const grouped = new Map();
for (const record of records) {
  if (!grouped.has(record.group)) grouped.set(record.group, []);
  grouped.get(record.group).push(record);
}

const orderedGroups = [...grouped.keys()].sort((a, b) => {
  const order = ['sillytavern-ui-rework', 'sillytavern-unified-suite'];
  const left = order.indexOf(a);
  const right = order.indexOf(b);
  if (left !== -1 || right !== -1) return (left === -1 ? 999 : left) - (right === -1 ? 999 : right);
  return a.localeCompare(b, 'en');
});

const documentSections = orderedGroups.map((group) => {
  const label = groupNames.get(group) || group;
  const rows = grouped.get(group).map((record) =>
    `- [[${wikiTarget(record.indexRelativePath)}|${escapeMarkdownText(record.title)}]] — ${record.headings.length} heading files — ${inlineCode(record.sourceRelativePath)}`,
  );
  return `## ${label}\n\n${rows.join('\n')}`;
}).join('\n\n');

const totalHeadings = records.reduce((sum, record) => sum + record.headings.length, 0);
const totalEntries = records.reduce((sum, record) => sum + Math.max(0, record.headings.length - 1), 0);
const emptyDirectBodyHeadings = records.flatMap((record) =>
  record.headings.slice(1)
    .filter((heading) => !heading.body.trim())
    .map((heading) => ({ record, heading })),
);

writeText('01 Document Index.md', `---
generated: true
tags:
  - vault/index
---

# Document Index

Each source document is represented by a generated index note. Its first heading is the index title, and every subordinate heading links to its own file.

- Document indexes: ${records.length}
- Heading files represented: ${totalHeadings}
- Generated: ${generatedAt}

${documentSections}
`);

const headingSections = orderedGroups.map((group) => {
  const label = groupNames.get(group) || group;
  const blocks = grouped.get(group).map((record) => {
    const rootLine = `- [[${wikiTarget(record.indexRelativePath)}|${escapeMarkdownText(record.title)}]] · document index · H${record.root?.level || 0}`;
    const descendants = record.root ? outlineLines(record.root.children, 1).join('\n') : '';
    return descendants ? `${rootLine}\n${descendants}` : rootLine;
  });
  return `## ${label}\n\n${blocks.join('\n')}`;
}).join('\n\n');

writeText('02 Heading Index.md', `---
generated: true
tags:
  - vault/index
---

# Heading Index

Every source heading has a vault file. A document's first heading is represented by its document-index note; each remaining heading is represented by a note under \`Entries/\`.

- Document-index heading files: ${records.length}
- Section heading files: ${totalEntries}
- Total heading files: ${totalHeadings}
- Generated: ${generatedAt}

${headingSections}
`);

writeText('System/Inventory.md', `---
generated: true
tags:
  - vault/system
---

# Inventory

## Totals

- Source documents indexed: ${records.length}
- Document-index heading files: ${records.length}
- Section heading files: ${totalEntries}
- Populated section heading files: ${totalEntries - emptyDirectBodyHeadings.length}
- Empty section heading files: ${emptyDirectBodyHeadings.length}
- Total source headings represented: ${totalHeadings}
- Source bytes indexed: ${records.reduce((sum, record) => sum + record.bytes, 0)}
- Generated: ${generatedAt}

## Discovery rules

The synchronizer includes Markdown files only from \`ST-UI/sillytavern-ui-rework/\` and \`ST-UI/Concept Arts/\`. Historical \`Sources/concepts/\` and \`Entries/concepts/\` paths are stable note IDs, not source locations. SillyTavern repository documentation and imported extension documentation are intentionally excluded.
`);

function collectMarkdown(directory, results = []) {
  if (!fs.existsSync(directory)) return results;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectMarkdown(absolutePath, results);
    if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.md') results.push(absolutePath);
  }
  return results;
}

const validationErrors = [];

function generatedRelative(absolutePath) { return toPosix(path.relative(vaultRoot, absolutePath)); }
function stagedExists(absolutePath) {
  const relative = generatedRelative(absolutePath);
  if (outputFiles.has(relative)) return true;
  if (/^(Sources|Entries)\//.test(relative)) return false;
  return fs.existsSync(absolutePath);
}
function stagedRead(absolutePath) {
  return outputFiles.get(generatedRelative(absolutePath)) ?? fs.readFileSync(absolutePath, 'utf8');
}

for (const record of records) {
  const expected = [record.indexRelativePath, ...record.headings.slice(1).map((heading) => heading.noteRelativePath)];
  if (expected.length !== record.headings.length) {
    validationErrors.push(`Heading/file count mismatch: ${record.sourceRelativePath}`);
  }
  for (const relativePath of expected) {
    if (!stagedExists(path.resolve(vaultRoot, relativePath))) {
      validationErrors.push(`Missing generated heading file: ${relativePath}`);
    }
  }

  const indexPath = path.resolve(vaultRoot, record.indexRelativePath);
  if (stagedExists(indexPath)) {
    const indexContent = stagedRead(indexPath);
    if (!indexContent.includes('type: document-index')) {
      validationErrors.push(`Document root is not an index: ${record.indexRelativePath}`);
    }
  }

  for (const heading of record.headings.slice(1)) {
    if (!heading.body.trim()) {
      validationErrors.push(`Empty direct section body: ${record.sourceRelativePath}:${heading.line} (${heading.title})`);
    }
    const entryPath = path.resolve(vaultRoot, heading.noteRelativePath);
    if (!stagedExists(entryPath)) continue;
    const entryContent = stagedRead(entryPath);
    const expectedParent = heading.parent || record.root;
    const expectedParentField = `parent_note: ${yamlString(`[[${wikiTarget(expectedParent.noteRelativePath)}]]`)}`;
    if (!entryContent.includes('type: heading-entry')) {
      validationErrors.push(`Generated section is not a heading entry: ${heading.noteRelativePath}`);
    }
    if (!entryContent.includes(expectedParentField)) {
      validationErrors.push(`Incorrect parent metadata: ${heading.noteRelativePath}`);
    }
    if (heading.body.trim() && !entryContent.includes('direct_body: populated')) {
      validationErrors.push(`Populated source body was not marked populated: ${heading.noteRelativePath}`);
    }
  }
}

if (fs.existsSync(path.resolve(vaultRoot, 'Indexes'))) {
  validationErrors.push('Legacy generated Indexes directory still exists.');
}

const actualSourceIndexes = [...outputFiles.keys()].filter(name => name.startsWith('Sources/')).length;
const actualEntries = [...outputFiles.keys()].filter(name => name.startsWith('Entries/')).length;
if (actualSourceIndexes !== records.length) {
  validationErrors.push(`Document-index count mismatch: expected ${records.length}, found ${actualSourceIndexes}`);
}
if (actualEntries !== totalEntries) {
  validationErrors.push(`Section-entry count mismatch: expected ${totalEntries}, found ${actualEntries}`);
}

const validationNotes = [
  path.resolve(vaultRoot, '00 Project Home.md'),
  path.resolve(vaultRoot, '01 Document Index.md'),
  path.resolve(vaultRoot, '02 Heading Index.md'),
  ...collectMarkdown(path.resolve(vaultRoot, 'Project')),
  ...collectMarkdown(path.resolve(vaultRoot, 'System')),
  ...[...outputFiles.keys()].filter(name => /^(Sources|Entries)\//.test(name)).map(name => path.resolve(vaultRoot, name)),
];

for (const notePath of validationNotes) {
  const content = stagedRead(notePath);
  for (const match of content.matchAll(/!?\[\[([^\]]+)\]\]/g)) {
    const target = match[1].split('|')[0].split('#')[0].trim();
    if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
    const base = target.startsWith('.') ? path.dirname(notePath) : vaultRoot;
    const absoluteTarget = path.resolve(base, target);
    if (![absoluteTarget, `${absoluteTarget}.md`].some(stagedExists)) {
      validationErrors.push(`Broken vault link in ${toPosix(path.relative(vaultRoot, notePath))}: ${target}`);
    }
  }
}

const syncStatus = validationErrors.length === 0 ? 'Complete' : 'Completed with validation errors';
const errorDetails = validationErrors.length
  ? `\n## Validation errors\n\n${validationErrors.map((error) => `- ${error}`).join('\n')}\n`
  : '\nHeading coverage, generated file counts, and internal vault links passed validation.\n';

writeText('System/Sync Report.md', `---
generated: true
tags:
  - vault/system
---

# Sync Report

- Status: ${syncStatus}
- Generated: ${generatedAt}
- Source documents indexed: ${records.length}
- Document indexes: ${records.length}
- Section heading files: ${totalEntries}
- Populated section heading files: ${totalEntries - emptyDirectBodyHeadings.length}
- Empty section heading files: ${emptyDirectBodyHeadings.length}
- Parent relationships validated: ${totalEntries}
- Total headings represented: ${totalHeadings}
- Errors: ${validationErrors.length}
${errorDetails}
Generated document indexes and heading-entry files were refreshed. Hand-maintained notes under \`Project/\` were not changed.
`);

console.log(JSON.stringify({
  status: validationErrors.length === 0 ? 'complete' : 'validation-errors',
  generatedAt,
  sourceDocuments: records.length,
  documentIndexes: records.length,
  sectionEntries: totalEntries,
  totalHeadings,
  validationErrors,
}, null, 2));

if (validationErrors.length) {
  process.exitCode = 1;
  console.error('Validation failed; the live generation and last successful report were not changed.');
} else if (checkOnly) {
  console.log('Check only; no files changed.');
} else {
  console.log(`Previous generation retained for recovery: ${publishGeneration(vaultRoot, outputFiles)}`);
}
