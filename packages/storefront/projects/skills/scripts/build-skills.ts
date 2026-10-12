import fs from 'node:fs';
import path from 'node:path';
import type { StorefrontInputs } from '../src/generators';
import { SKILL_IDS } from '../src/registry';
import { FRAMEWORKS, SKILL_STAGING_DIR, stagedSkillDir } from '../src/shared/skillTree';

/**
 * Builds every registered skill's tree for every framework into `SKILL_STAGING_DIR`, from where each
 * wrapper's build stages its own copy. The generation — MDX-backed component docs plus the
 * package-skill and tokens serializers — only resolves under the MDX/alias-aware runtime this script
 * is started with (`node --import tsx --require ./scripts/skill-mdx-loader.cjs`), so the heavy
 * modules are imported dynamically inside `main`.
 *
 * Pages migrated to `@porsche-design-system/docs-components` are rendered by its renderer instead, which the
 * `markdown` export condition and its MDX hook (`--conditions=markdown --import …/register`) set up. The loader above
 * keeps parsing the component docs until they are migrated too.
 */

const REPO_ROOT = path.resolve(__dirname, '../../../../..');

const main = async (): Promise<void> => {
  const [{ componentDocsMeta }, { SKILL_GENERATORS }, { getStorefrontPages }, { collectPages, createSite }] =
    await Promise.all([
      import('../../../src/app/(main)/components/components.meta'),
      import('../src/generators'),
      import('../../../src/utils/markdownPages'),
      import('@porsche-design-system/docs-components/markdown'),
    ]);
  const { routes, markdownPages } = getStorefrontPages();
  const pages = await collectPages(markdownPages);
  const inputs: StorefrontInputs = {
    docsMeta: componentDocsMeta as unknown as StorefrontInputs['docsMeta'],
    pages,
    site: createSite(routes, pages),
  };

  for (const framework of FRAMEWORKS) {
    fs.rmSync(path.resolve(REPO_ROOT, SKILL_STAGING_DIR, framework), { recursive: true, force: true });

    for (const skillId of SKILL_IDS) {
      const relativeRoot = stagedSkillDir(skillId, framework);
      SKILL_GENERATORS[skillId](path.resolve(REPO_ROOT, relativeRoot), framework, inputs);
      console.log(`Wrote ${skillId} skill tree → ${relativeRoot}`);
    }
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
