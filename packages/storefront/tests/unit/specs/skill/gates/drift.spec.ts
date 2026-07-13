import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { FRAMEWORKS, STAGED_SKILL_DIRS } from '@/lib/skill/support/skillTree';
import { hashSkillTree } from '@/lib/skill/support/skillTreeHash';

/**
 * Compact review signal for the ignored staged artifacts. An intentional generated-content
 * change updates exactly these four hashes via `vitest -u`; completeness and link gates inspect
 * the actual trees.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../../../..');

describe('skill tree hashes', () => {
  it('matches the staged generated content snapshot', () => {
    const hashes: Record<string, string> = {};
    for (const framework of FRAMEWORKS) {
      const root = path.join(REPO_ROOT, STAGED_SKILL_DIRS[framework]);
      expect(fs.existsSync(root), `${STAGED_SKILL_DIRS[framework]} is missing — run \`npm run build:skill\``).toBe(
        true
      );
      hashes[framework] = hashSkillTree(root);
    }
    expect(hashes).toMatchSnapshot();
  });
});
