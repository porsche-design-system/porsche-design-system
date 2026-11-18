import fs from 'node:fs';
import path from 'node:path';
import { FRAMEWORKS } from '@porsche-design-system/shared';
import type { StorefrontInputs } from '../src/generators';
import { resolveComponentDocs, type StorefrontComponentDocs } from '../src/knowledge/components/catalogue';
import { SKILL_IDS } from '../src/registry';
import { stagedFrameworkDir, stagedSkillDir } from '../src/shared/skillTree';
import { type CollectedPages, PAGES_FILE } from './pages-file';

/**
 * Builds every registered skill's tree for every framework into `SKILL_STAGING_DIR`, from where each
 * wrapper's build stages its own copy. The generation — MDX-backed component docs plus the
 * package-skill and tokens serializers — only resolves under the MDX/alias-aware runtime this script
 * is started with (`node --import tsx --require ./scripts/skill-mdx-loader.cjs`), so the heavy
 * modules are imported dynamically inside `main`.
 *
 * Storefront pages with Markdown are rendered beforehand by `collect-pages.ts`, in a process set up for
 * `@porsche-design-system/docs-components`, and read here from `PAGES_FILE`. Keeping the two apart means the loader
 * above keeps parsing the component docs, untouched by the renderer's MDX hook, until they are migrated too.
 */

const REPO_ROOT = path.resolve(__dirname, '../../../../..');

const main = async (): Promise<void> => {
  const [{ componentDocsMeta }, { SKILL_GENERATORS }, { createSite }, { markdownMap }] = await Promise.all([
    import('../../../src/app/(main)/components/components.meta'),
    import('../src/generators'),
    import('@porsche-design-system/docs-components/markdown'),
    import('../../../src/utils/markdownMap'),
  ]);
  const { routes, pages }: CollectedPages = JSON.parse(fs.readFileSync(PAGES_FILE, 'utf8'));
  const inputs: StorefrontInputs = {
    docsMeta: Object.fromEntries(
      Object.entries(componentDocsMeta as unknown as Record<string, StorefrontComponentDocs>).map(([tag, docs]) => [
        tag,
        resolveComponentDocs(docs),
      ])
    ),
    storefrontPages: { pages, site: createSite(routes, pages), markdownMap },
  };

  for (const framework of FRAMEWORKS) {
    fs.rmSync(path.resolve(REPO_ROOT, stagedFrameworkDir(framework)), { recursive: true, force: true });

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
