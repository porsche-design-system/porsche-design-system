import path from 'node:path';
import { componentMeta } from '@porsche-design-system/component-meta';
import type { ComponentExamplesMetaMap } from '../src/lib/skill/componentExamples';
import type { ComponentDocsMetaMap } from '../src/lib/skill/componentsReference';
import { buildSkillMd, SKELETON_REFERENCE_MAP } from '../src/lib/skill/skillMd';
import { FRAMEWORKS, type Framework, isFramework, SkillTree } from '../src/lib/skill/skillTree';

const REPO_ROOT = path.resolve(__dirname, '../../..');

/**
 * The component-reference generation, loaded together as a unit because it all depends
 * on the storefront runtime: the docs meta's prose is MDX, and the examples pipeline
 * (`componentsReference` → `componentExamples` → `createFrameworkMarkup`) pulls in the
 * storefront's `@/`-aliased generators. Both only resolve under an MDX/alias-aware
 * runtime; under plain `tsx` the import throws. The full runtime is wired in TASK-10 —
 * until then this degrades to the skeleton tree rather than failing the build.
 */
type ComponentGeneration = {
  componentDocsMeta: ComponentDocsMetaMap & ComponentExamplesMetaMap;
  writeComponentReferences: typeof import('../src/lib/skill/componentsReference').writeComponentReferences;
};

const loadComponentGeneration = async (): Promise<ComponentGeneration | null> => {
  try {
    const [meta, references] = await Promise.all([
      import('../src/app/(main)/components/components.meta'),
      import('../src/lib/skill/componentsReference'),
    ]);
    return {
      componentDocsMeta: meta.componentDocsMeta as unknown as ComponentDocsMetaMap & ComponentExamplesMetaMap,
      writeComponentReferences: references.writeComponentReferences,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message.split('\n')[0] : String(error);
    console.warn(`Skipping component references — generation unavailable under this runtime (${reason}).`);
    return null;
  }
};

/** Wrapper source dir (relative to the repo root) whose committed `skill/` tree each framework owns. */
const WRAPPER_SKILL_DIR: Record<Framework, string> = {
  js: 'packages/components-js/projects/components-wrapper/skill',
  angular: 'packages/components-angular/projects/angular-wrapper/skill',
  react: 'packages/components-react/projects/react-wrapper/skill',
  vue: 'packages/components-vue/projects/vue-wrapper/skill',
};

const generateTree = (framework: Framework, generation: ComponentGeneration | null): void => {
  const root = path.resolve(REPO_ROOT, WRAPPER_SKILL_DIR[framework]);
  const tree = new SkillTree(root);
  tree.reset();

  // Seed the reference-map scaffold. Content generators (TASK-03+) write their
  // produced files and register their own rows here before SKILL.md is rendered.
  for (const entry of SKELETON_REFERENCE_MAP) {
    tree.registerReference(entry);
  }

  if (generation) {
    const { componentDocsMeta, writeComponentReferences } = generation;
    const { tags, degraded } = writeComponentReferences(
      tree,
      componentDocsMeta,
      { componentMeta, framework },
      { metaMap: componentDocsMeta, framework }
    );
    console.log(`  ${tags.length} component references written`);
    if (degraded.length > 0) {
      console.warn(
        `  degraded prose (review the source MDX): ${degraded
          .map(({ tag, sections }) => `${tag} [${sections.join(', ')}]`)
          .join('; ')}`
      );
    }
  }

  tree.write('SKILL.md', buildSkillMd(framework, tree.referenceMap));

  console.log(`Wrote ${framework} skill tree → ${path.relative(REPO_ROOT, root)}`);
};

const main = async (): Promise<void> => {
  const requested = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));
  const frameworks = requested.length > 0 ? requested : [...FRAMEWORKS];

  for (const framework of frameworks) {
    if (!isFramework(framework)) {
      console.error(`Unknown framework "${framework}". Expected one of: ${FRAMEWORKS.join(', ')}.`);
      process.exit(1);
    }
  }

  const generation = await loadComponentGeneration();

  for (const framework of frameworks as Framework[]) {
    generateTree(framework, generation);
  }
};

main();
