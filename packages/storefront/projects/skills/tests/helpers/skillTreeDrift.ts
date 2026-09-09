import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { SkillId } from '@skills/registry';
import { FRAMEWORKS, stagedSkillDir } from '@skills/shared/skillTree';
import { listSkillTreeFiles } from '@skills/shared/skillTreeFiles';
import { localPorscheDesignSystemVersion } from '@skills/shared/version';
import { describe, expect, it } from 'vitest';

/**
 * Reviewable snapshots for one skill's ignored staged artifacts. An intentional generated-content
 * change updates the affected file snapshots via `vitest -u`, exposing the exact text diff.
 *
 * Each skill calls this from its own `skill.pds-<skill>.spec.ts` so its snapshots land in that
 * spec's `__snapshots__` file, named after the skill it stages: one skill's regeneration then never
 * rewrites another's, and a skill's snapshots stay reviewable next to the rest of its tests. The
 * check itself is content-agnostic, so it lives here once — `gates/skillSpecs.spec.ts` gates that
 * every registered skill calls it.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../../..');

/**
 * The generated content pins the release it describes, so every version bump would otherwise rewrite
 * these snapshots without any reviewable content change — and fail the gate on each release commit.
 * Normalizing the version keeps the diff limited to actual drift; that the version is embedded at all
 * stays covered by `skillMd.spec.ts`.
 */
const normalizeVersion = (content: string): string => content.split(localPorscheDesignSystemVersion).join('<version>');

/**
 * Snapshot every staged file of `skillId`, one test per framework.
 *
 * The suite is named after the distributed skill rather than its id, so a snapshot key reads as the
 * `pds-<skill>-<framework>` directory it covers — the id alone (`knowledge`) names nothing shipped.
 */
export const describeSkillTreeDrift = (skillId: SkillId): void => {
  describe(`pds-${skillId} skill tree content`, () => {
    for (const framework of FRAMEWORKS) {
      it(`matches the staged ${framework} content snapshots`, () => {
        const relativeRoot = stagedSkillDir(skillId, framework);
        const root = path.join(REPO_ROOT, relativeRoot);
        expect(fs.existsSync(root), `${relativeRoot} is missing — run \`npm run build:skills\``).toBe(true);
        for (const relativePath of listSkillTreeFiles(root)) {
          expect
            .soft(normalizeVersion(fs.readFileSync(path.join(root, relativePath), 'utf-8')).split('\n'))
            .toMatchSnapshot(relativePath);
        }
      });
    }
  });
};
