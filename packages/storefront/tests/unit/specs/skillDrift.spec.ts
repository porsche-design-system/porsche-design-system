import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FRAMEWORKS, WRAPPER_SKILL_DIRS } from '@/lib/skill/skillTree';
import { describe, expect, it } from 'vitest';

/**
 * Producer drift gate. The committed `skill/` trees are the artifact of `build:skill`
 * (the `build:generateX → test:unit:X` convention; here `build:skill` is the generator).
 * This snapshots a deterministic fingerprint of each committed tree — one
 * `<sha256>  <path>` line per file — and fails when the committed tree diverges from
 * that snapshot, i.e. when someone regenerated and re-committed without re-blessing the
 * snapshot, or hand-edited a tree. Re-bless with `vitest -u` after `build:skill`.
 *
 * A fingerprint (not the full file bodies) keeps the snapshot bounded: the four trees
 * total several MB, and their contents already live — reviewable — in the committed
 * trees themselves. The fingerprint still fails on any content or structural change.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../..');

/** Tree-relative POSIX paths of every file under `dir`, sorted for a stable fingerprint. */
const listFiles = (dir: string): string[] => {
  const walk = (current: string): string[] =>
    fs.readdirSync(current, { withFileTypes: true }).flatMap((entry) => {
      const absolute = path.join(current, entry.name);
      return entry.isDirectory() ? walk(absolute) : [absolute];
    });
  return walk(dir)
    .map((absolute) => path.relative(dir, absolute).split(path.sep).join('/'))
    .sort();
};

const fingerprint = (root: string): string =>
  listFiles(root)
    .map((relative) => {
      const hash = createHash('sha256').update(fs.readFileSync(path.join(root, relative))).digest('hex');
      return `${hash}  ${relative}`;
    })
    .join('\n');

describe('skill tree drift', () => {
  for (const framework of FRAMEWORKS) {
    it(`the committed ${framework} skill tree matches its snapshot`, () => {
      const root = path.join(REPO_ROOT, WRAPPER_SKILL_DIRS[framework]);
      expect(fs.existsSync(root), `${WRAPPER_SKILL_DIRS[framework]} is missing — run \`npm run build:skill\``).toBe(true);
      expect(fingerprint(root)).toMatchSnapshot();
    });
  }
});
