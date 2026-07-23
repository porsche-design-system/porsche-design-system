import path from 'node:path';
import type { ComponentDocsMetaMap } from '../src/components/reference';
import { FRAMEWORKS, SKILL_STAGING_DIR } from '../src/support/skillTree';

/**
 * Builds the skill tree for every framework into `SKILL_STAGING_DIR`, from where each wrapper's build
 * stages its own copy. The generation — MDX-backed component docs plus the package-skill and tokens
 * serializers — only resolves under the MDX/alias-aware runtime this script is started with
 * (`node --import tsx --require ./scripts/skill-mdx-loader.cjs`), so the heavy modules are imported
 * dynamically inside `main`.
 */

const REPO_ROOT = path.resolve(__dirname, '../../../../..');
const OUTPUT_ROOT = path.resolve(REPO_ROOT, SKILL_STAGING_DIR);

const main = async (): Promise<void> => {
  const [{ componentDocsMeta }, { generateSkillTree }] = await Promise.all([
    import('../../../src/app/(main)/components/components.meta'),
    import('../src/generateSkillTree'),
  ]);
  const docsMeta = componentDocsMeta as unknown as ComponentDocsMetaMap;

  for (const framework of FRAMEWORKS) {
    const root = path.join(OUTPUT_ROOT, framework);
    generateSkillTree(root, framework, docsMeta);
    console.log(`Wrote ${framework} skill tree → ${path.relative(REPO_ROOT, root)}`);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
