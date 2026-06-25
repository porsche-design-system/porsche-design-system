import { createRequire } from 'node:module';
import path from 'node:path';
import { componentMeta } from '@porsche-design-system/component-meta';
import type { ComponentType } from 'react';
import type { ComponentExamplesMetaMap } from '../src/lib/skill/componentExamples';
import type { ComponentDocsMetaMap } from '../src/lib/skill/componentsReference';
import type { MigrationSource } from '../src/lib/skill/migrationReference';
import type { PartialsSource } from '../src/lib/skill/partialsReference';
import { buildSkillMd, SKELETON_REFERENCE_MAP } from '../src/lib/skill/skillMd';
import { FRAMEWORKS, type Framework, isFramework, SkillTree } from '../src/lib/skill/skillTree';
import { writeStyleReferences } from '../src/lib/skill/stylesReference';
import { writeTokensReference } from '../src/lib/skill/tokensReference';

const REPO_ROOT = path.resolve(__dirname, '../../..');

/**
 * The MDX runtime (`./skill-mdx-loader.cjs`) registers `.mdx` as a CommonJS
 * `require` extension. Partials/migration prose is pulled through `require` (not
 * dynamic `import()`) so it shares that path with the component meta: keeping the
 * whole graph in CJS lets the MDX's own imports — notably the components-wrapper's
 * `COMPONENT_CHUNK_NAMES` — resolve through tsx, which ESM named-export detection
 * over the package's CJS build cannot.
 */
const requireFromHere = createRequire(__filename);
const requireMdxDefault = (relativePath: string): ComponentType =>
  (requireFromHere(relativePath) as { default: ComponentType }).default;

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

/**
 * The partials reference, like the component references, depends on the storefront
 * runtime: each partial's `page.mdx` is an `@/`-aliased MDX module that only resolves
 * under the MDX/alias-aware runtime wired in TASK-10. Under plain `tsx` the import
 * throws, so this degrades to omitting the partials reference rather than failing.
 * There is no partials meta object — the MDX render is the source.
 */
type PartialsGeneration = {
  source: PartialsSource;
  writePartialsReference: typeof import('../src/lib/skill/partialsReference').writePartialsReference;
};

/** Partial directory → its exported function name, in documentation order (matches the design). */
const PARTIAL_DIRECTORIES: { functionName: string; dir: string }[] = [
  { functionName: 'getFontLinks', dir: 'font-links' },
  { functionName: 'getComponentChunkLinks', dir: 'component-chunk-links' },
  { functionName: 'getMetaTagsAndIconLinks', dir: 'meta-tags-and-icon-links' },
  { functionName: 'getIconLinks', dir: 'icon-links' },
  { functionName: 'getLoaderScript', dir: 'loader-script' },
];

const loadPartialsGeneration = async (): Promise<PartialsGeneration | null> => {
  try {
    const { writePartialsReference } = await import('../src/lib/skill/partialsReference');
    return {
      writePartialsReference,
      source: {
        introduction: requireMdxDefault('../src/app/(main)/partials/introduction/page.mdx'),
        partials: PARTIAL_DIRECTORIES.map(({ functionName, dir }) => ({
          functionName,
          page: requireMdxDefault(`../src/app/(main)/partials/${dir}/page.mdx`),
        })),
      },
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message.split('\n')[0] : String(error);
    console.warn(`Skipping partials reference — generation unavailable under this runtime (${reason}).`);
    return null;
  }
};

/**
 * The migration references, like the partials reference, depend on the storefront
 * runtime: each guide's `page.mdx` is an `@/`-aliased MDX module that only resolves
 * under the MDX/alias-aware runtime wired in TASK-10. Under plain `tsx` the import
 * throws, so this degrades to omitting the migration references rather than failing.
 * There is no migration meta object — the MDX render is the source. Styling behaves
 * identically across frameworks, so every wrapper ships the same guide set.
 */
type MigrationGeneration = {
  sources: MigrationSource[];
  writeMigrationReferences: typeof import('../src/lib/skill/migrationReference').writeMigrationReferences;
};

/** Migration guide slugs — source dir and output filename stem — in documentation order (matches the design). */
const MIGRATION_GUIDES = ['porsche-design-system', 'scss', 'tailwindcss', 'vanilla-extract', 'emotion'] as const;

const loadMigrationGeneration = async (): Promise<MigrationGeneration | null> => {
  try {
    const { writeMigrationReferences } = await import('../src/lib/skill/migrationReference');
    return {
      writeMigrationReferences,
      sources: MIGRATION_GUIDES.map((slug) => ({
        slug,
        page: requireMdxDefault(`../src/app/(main)/news/migration-guide/${slug}/page.mdx`),
      })),
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message.split('\n')[0] : String(error);
    console.warn(`Skipping migration references — generation unavailable under this runtime (${reason}).`);
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

const generateTree = async (
  framework: Framework,
  generation: ComponentGeneration | null,
  partialsGeneration: PartialsGeneration | null,
  migrationGeneration: MigrationGeneration | null
): Promise<void> => {
  const root = path.resolve(REPO_ROOT, WRAPPER_SKILL_DIR[framework]);
  const tree = new SkillTree(root);
  tree.reset();

  // Seed the reference-map scaffold. Content generators (TASK-03+) write their
  // produced files and register their own rows here before SKILL.md is rendered.
  for (const entry of SKELETON_REFERENCE_MAP) {
    tree.registerReference(entry);
  }

  const styleReferences = await writeStyleReferences(tree);
  console.log(`  ${styleReferences.length} style reference files written`);

  writeTokensReference(tree);
  console.log('  tokens reference written');

  if (partialsGeneration) {
    const { degraded } = partialsGeneration.writePartialsReference(tree, partialsGeneration.source);
    console.log('  partials reference written');
    if (degraded.length > 0) {
      console.warn(`  degraded partials prose (review the source MDX): ${degraded.join(', ')}`);
    }
  }

  if (migrationGeneration) {
    const { written, degraded } = migrationGeneration.writeMigrationReferences(tree, migrationGeneration.sources);
    console.log(`  ${written.length} migration references written`);
    if (degraded.length > 0) {
      console.warn(`  degraded migration prose (review the source MDX): ${degraded.join(', ')}`);
    }
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

  const [generation, partialsGeneration, migrationGeneration] = await Promise.all([
    loadComponentGeneration(),
    loadPartialsGeneration(),
    loadMigrationGeneration(),
  ]);

  for (const framework of frameworks as Framework[]) {
    await generateTree(framework, generation, partialsGeneration, migrationGeneration);
  }
};

main();
