#!/usr/bin/env node
/**
 * E0, the static checks of the skills (research 24/10/2026 §6), the same rules as the desktop app's skills lint
 * (g-workspace-tauri `host/test/helpers/skill-lint.ts`): change both together.
 *
 * Fails (exit 1):
 *   - a description over 1,024 characters (the app skips the skill), or one that names a tool;
 *   - a tool name no tool has: every `guroos_…`, `genation-workspace_…` and `monday_…` name (one ending in `_` names a
 *     family and needs one tool that starts with it), and every backticked `<resource>_<verb>` of the backend whose
 *     `<resource>` one of its tools acts on (`deals_find`: `deals` as in `deals_list`), checked against
 *     `scripts/tools-manifest.json` (a copy of the desktop's `host/eval/tools/tools-manifest.json`);
 *   - a `references/` file SKILL.md never says when to read: a routing table row (the file with another non-empty
 *     cell) or a line with a condition (when, if, before, after, unsure, only, until, once) counts.
 * Warns (exit 0): a description outside 300–700 characters, mentioning `tmp/`, or without "Use when" or "Not for"
 * (step P1-9's new descriptions fix these); a reference over 100 lines without a table of contents.
 *
 * Run: node scripts/check-skills.mjs
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_DESCRIPTION = 1024;
const DESCRIPTION_RANGE = { min: 300, max: 700 };
const TOC_MIN_LINES = 100;
const FULL_TOOL_NAME = /(?<![\w-])(?:guroos|genation-workspace|monday)_[a-z0-9_]*/g;
const TOOL_VERBS = new Set([
  'list', 'get', 'create', 'update', 'delete', 'record', 'file', 'find', 'search', 'mark', 'accept', 'complete', 'classify', 'rename',
  'replace', 'assign', 'link', 'revoke', 'send', 'save', 'archive', 'reject', 'start', 'verify', 'configure', 'disconnect', 'reuse', 'preview', 'existing',
]);
const CONDITION = /\b(?:when|whenever|if|before|after|unsure|only|until|once)\b/i;
const REFERENCE = /(?:^|[^\w./-])(?:\.\/)?(references\/[^\s`'"()<>[\]{}*,;]+)/g;

const root = fileURLToPath(new URL('..', import.meta.url));
const manifest = JSON.parse(readFileSync(join(root, 'scripts', 'tools-manifest.json'), 'utf8'));
const names = new Set(manifest.tools.map(t => t.name));
const short = new Set(manifest.tools.filter(t => t.source === 'backend').map(t => t.name.slice('genation-workspace_'.length)));
const resources = new Set([...short].map(n => n.slice(0, n.lastIndexOf('_'))));

/** The frontmatter `description`, read the way the app reads it (host `skill-catalog.ts` `skillFrontmatter`). */
function frontmatterDescription(markdown) {
  const lines = (/^---\n([\s\S]*?)\n---/.exec(markdown)?.[1] ?? '').split('\n');
  const at = lines.findIndex(l => l.startsWith('description:'));
  if (at < 0) return null;
  const first = lines[at].slice('description:'.length).trim();
  const parts = [/^[>|][+-]?\d*$/.test(first) ? '' : first];
  for (const next of lines.slice(at + 1)) {
    if (/^\S/.test(next)) break;
    parts.push(next.trim());
  }
  return parts.join(' ').replace(/\s+/g, ' ').trim().replace(/^(["'])(.*)\1$/, '$2').trim() || null;
}

/** The file a `references/…` mention points to (no `#fragment`, `?query`, trailing punctuation or URL encoding). */
function referencePath(raw) {
  const path = raw.replace(/[#?].*$/, '').replace(/[.:!]+$/, '');
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}
const referencesIn = markdown => [...new Set([...markdown.matchAll(REFERENCE)].map(m => referencePath(m[1])))];

function filesIn(dir, prefix = '') {
  return readdirSync(dir, { withFileTypes: true })
    .filter(e => !e.name.startsWith('.'))
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .flatMap(e => (e.isDirectory() ? filesIn(join(dir, e.name), `${prefix}${e.name}/`) : [`${prefix}${e.name}`]));
}

function descriptionReport(description) {
  if (description === null) return { errors: ['no description'], warnings: [] };
  const errors = [];
  const warnings = [];
  const length = [...description].length;
  if (length > MAX_DESCRIPTION) errors.push(`description has ${length} characters (max ${MAX_DESCRIPTION})`);
  else if (length < DESCRIPTION_RANGE.min || length > DESCRIPTION_RANGE.max) warnings.push(`description has ${length} characters (aim for ${DESCRIPTION_RANGE.min}–${DESCRIPTION_RANGE.max})`);
  const named = [...new Set([...(description.match(FULL_TOOL_NAME) ?? []), ...(description.match(/\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\b/g) ?? []).filter(w => short.has(w))])];
  if (named.length) errors.push(`description names tools: ${named.join(', ')}`);
  if (description.includes('tmp/')) warnings.push('description mentions tmp/ (say what staff say: "sent", "dropped in")');
  if (!/\buse (?:it )?(?:only )?when\b/i.test(description)) warnings.push('description has no "Use when …"');
  if (!/\bnot for\b/i.test(description)) warnings.push('description has no "Not for …" (the near-miss boundary)');
  return { errors, warnings };
}

function unknownToolNames(read, files) {
  const found = [];
  for (const file of files.filter(f => f.endsWith('.md'))) {
    const text = read(file);
    for (const match of new Set(text.match(FULL_TOOL_NAME) ?? [])) {
      const known = match.endsWith('_') ? [...names].some(n => n.startsWith(match) && n !== match) : names.has(match);
      if (!known) found.push(`${file}: ${match}`);
    }
    for (const [, word] of text.matchAll(/`([a-z][a-z0-9]*(?:_[a-z0-9]+)+)`/g)) {
      const cut = word.lastIndexOf('_');
      if (short.has(word) || !resources.has(word.slice(0, cut)) || !TOOL_VERBS.has(word.slice(cut + 1))) continue;
      found.push(`${file}: ${word}`);
    }
  }
  return [...new Set(found)];
}

function referencesWithoutReadWhen(markdown, files) {
  const lines = markdown.split('\n');
  const isRow = i => /^\s*\|/.test(lines[i] ?? '');
  return files
    .filter(f => f.startsWith('references/'))
    .filter(file => {
      const at = lines.flatMap((line, i) => (referencesIn(line).includes(file) ? [i] : []));
      return !at.some(i => {
        if (isRow(i)) {
          let start = i;
          while (start > 0 && isRow(start - 1)) start--;
          const cells = lines[i].split('|').slice(1, -1).map(c => c.trim());
          return i - start + 1 > 2 && cells.filter(c => c && !referencesIn(c).includes(file)).length > 0;
        }
        return CONDITION.test(lines[i]);
      });
    });
}

function hasTableOfContents(text) {
  const head = text.split('\n').filter(l => l.trim()).slice(0, 30);
  return head.some(l => /^(?:#{1,4}\s*|\*\*)?(?:table of )?contents\b/i.test(l.trim())) || head.filter(l => /^\s*[-*\d.]+\s*\[[^\]]+\]\(#[^)]+\)/.test(l)).length >= 3;
}

const skillsDir = join(root, 'skills');
let errors = 0;
let warnings = 0;
for (const id of readdirSync(skillsDir).filter(id => existsSync(join(skillsDir, id, 'SKILL.md'))).sort()) {
  const dir = join(skillsDir, id);
  const files = filesIn(dir);
  const read = file => readFileSync(join(dir, ...file.split('/')), 'utf8').replace(/\r\n/g, '\n');
  const markdown = read('SKILL.md');
  const description = descriptionReport(frontmatterDescription(markdown));
  const problems = [
    ...description.errors,
    ...unknownToolNames(read, files).map(t => `unknown tool ${t}`),
    ...referencesWithoutReadWhen(markdown, files).map(f => `${f}: SKILL.md never says when to read it`),
  ];
  const notes = [
    ...description.warnings,
    ...files.filter(f => f.startsWith('references/') && f.endsWith('.md') && read(f).replace(/\n$/, '').split('\n').length > TOC_MIN_LINES && !hasTableOfContents(read(f))).map(f => `${f}: over ${TOC_MIN_LINES} lines and no table of contents`),
  ];
  errors += problems.length;
  warnings += notes.length;
  console.log(`${problems.length ? 'FAIL' : 'ok  '}  ${relative(root, dir).split(sep).join('/')}`);
  for (const p of problems) console.log(`        error: ${p}`);
  for (const n of notes) console.log(`        warning: ${n}`);
}
console.log(`\n${errors} error(s), ${warnings} warning(s). Tools manifest: backend ${manifest.backend.commit.slice(0, 7)}, ${manifest.tools.length} tools.`);
process.exit(errors ? 1 : 0);
