#!/usr/bin/env node
/**
 * Size guard for the skills of this store (`skills/<id>/`).
 *
 * The agent engine (OpenCode 2.0.14) cuts every tool output at 50 KiB (51,200 bytes, UTF-8) or 2,000 lines and keeps
 * only the head; the rest goes to a file in the engine's data folder, which the app does not let the assistant read
 * (every try is an "external folder" consent card). Loading a skill and reading one of its files are tool outputs:
 *   - SKILL.md <= 35 KiB: the engine appends the skill's base directory and file list after it, and they must survive;
 *   - every other file of a skill (references/...) <= 45 KiB;
 *   - at most 2,000 lines per file, and at most 2,000 characters per line (the engine's `read` cuts longer lines).
 * And the app's own rule (host `skill-service.ts`, Agent Skills): a SKILL.md frontmatter `description` of at most 1,024
 * characters, or the app skips the whole skill ("description is longer than 1024 characters").
 * Sizes are UTF-8 bytes with LF line ends (what GitHub serves and the app downloads), whatever the checkout uses.
 * Hidden files are skipped, as the app skips them.
 *
 * Run: node scripts/check-skill-size.mjs    Exit 1 when a file is over a limit.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const KIB = 1024;
const SKILL_MD_MAX = 35 * KIB;
const FILE_MAX = 45 * KIB;
const MAX_LINES = 2000;
const MAX_LINE_CHARS = 2000;
const MAX_DESCRIPTION = 1024;

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

const skillsDir = join(fileURLToPath(new URL('..', import.meta.url)), 'skills');

/** Every file under `dir`, hidden ones left out, in path order. */
function filesIn(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter(entry => !entry.name.startsWith('.'))
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .flatMap(entry => (entry.isDirectory() ? filesIn(join(dir, entry.name)) : entry.isFile() ? [join(dir, entry.name)] : []));
}

/** A SKILL.md the app would skip for its description. */
const descriptionProblems = description =>
  !description
    ? ['no frontmatter description']
    : [...description].length > MAX_DESCRIPTION
      ? [`description ${[...description].length} characters > ${MAX_DESCRIPTION} (the app skips the skill)`]
      : [];

const kib = bytes => `${(bytes / KIB).toFixed(1)} KiB`;
const rows = [];
let failures = 0;

for (const path of filesIn(skillsDir)) {
  const file = relative(skillsDir, path).split(sep).join('/');
  const raw = readFileSync(path);
  const binary = raw.includes(0);
  const text = binary ? '' : raw.toString('utf8').replace(/\r\n/g, '\n');
  const bytes = binary ? raw.byteLength : Buffer.byteLength(text, 'utf8');
  const isSkillMd = /^[^/]+\/SKILL\.md$/.test(file);
  const max = isSkillMd ? SKILL_MD_MAX : FILE_MAX;
  const lines = binary ? [] : text.replace(/\n$/, '').split('\n');
  const longLines = lines.flatMap((line, i) => ([...line].length > MAX_LINE_CHARS ? [i + 1] : []));
  const problems = [
    ...(bytes > max ? [`${bytes} bytes > ${max} (${isSkillMd ? 'SKILL.md' : 'file'} limit)`] : []),
    ...(lines.length > MAX_LINES ? [`${lines.length} lines > ${MAX_LINES}`] : []),
    ...(longLines.length ? [`line ${longLines.join(', ')} over ${MAX_LINE_CHARS} characters`] : []),
    ...(isSkillMd ? descriptionProblems(frontmatterDescription(text)) : []),
  ];
  if (problems.length) failures++;
  rows.push(`${problems.length ? 'FAIL' : 'ok  '}  ${String(bytes).padStart(6)}  ${kib(bytes).padStart(9)} / ${kib(max)}  ${file}${problems.length ? `  <- ${problems.join('; ')}` : ''}`);
}

console.log(rows.join('\n'));
console.log(
  failures
    ? `\n${failures} file(s) over a limit. SKILL.md <= 35 KiB, each other skill file <= 45 KiB (the engine truncates tool output at 50 KiB). Move situational sections to references/ and point to them; keep each SKILL.md description at most 1,024 characters.`
    : `\nAll skill files within limits (SKILL.md <= 35 KiB, other files <= 45 KiB; engine truncates tool output at 50 KiB).`,
);
process.exit(failures ? 1 : 0);
