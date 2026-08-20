import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FRAMEWORKS, STAGED_SKILL_DIRS } from '@skill/support/skillTree';
import { listSkillTreeFiles } from '@skill/support/skillTreeFiles';
import { localPorscheDesignSystemVersion } from '@skill/support/version';
import { describe, expect, it } from 'vitest';

/**
 * Reviewable snapshots for the ignored staged artifacts. An intentional generated-content
 * change updates the affected file snapshots via `vitest -u`, exposing the exact text diff.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../../../../..');

/**
 * The generated content pins the release it describes, so every version bump would otherwise rewrite
 * these snapshots without any reviewable content change — and fail the gate on each release commit.
 * Normalizing the version keeps the diff limited to actual drift; that the version is embedded at all
 * stays covered by `skillMd.spec.ts`.
 */
const normalizeVersion = (content: string): string => content.split(localPorscheDesignSystemVersion).join('<version>');

describe('skill tree content', () => {
  for (const framework of FRAMEWORKS) {
    it(`matches the staged ${framework} content snapshots`, () => {
      const root = path.join(REPO_ROOT, STAGED_SKILL_DIRS[framework]);
      expect(fs.existsSync(root), `${STAGED_SKILL_DIRS[framework]} is missing — run \`npm run build:skill\``).toBe(
        true
      );
      for (const relativePath of listSkillTreeFiles(root)) {
        expect
          .soft(normalizeVersion(fs.readFileSync(path.join(root, relativePath), 'utf-8')).split('\n'))
          .toMatchSnapshot(relativePath);
      }
    });
  }
});
