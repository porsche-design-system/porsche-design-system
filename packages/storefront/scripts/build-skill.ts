import { createRequire } from 'node:module';
import path from 'node:path';
import { componentMeta } from '@porsche-design-system/component-meta';
import type { ComponentType } from 'react';
import type { ComponentExamplesMetaMap } from '../src/lib/skill/componentExamples';
import type { ComponentDocsMetaMap } from '../src/lib/skill/componentsReference';
import type { MigrationSource } from '../src/lib/skill/migrationReference';
import type { PartialsSource } from '../src/lib/skill/partialsReference';
import {
  buildSkillMd,
  type ComponentRosterEntry,
  MIGRATION_GUIDES,
  SKELETON_REFERENCE_MAP,
} from '../src/lib/skill/skillMd';
import { FRAMEWORKS, type Framework, isFramework, SkillTree, WRAPPER_SKILL_DIRS } from '../src/lib/skill/skillTree';
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

/** Node error codes meaning "this module isn't resolvable under the current runtime". */
const MODULE_NOT_FOUND_CODES = new Set(['ERR_MODULE_NOT_FOUND', 'MODULE_NOT_FOUND']);
const isModuleNotFound = (error: unknown): boolean =>
  typeof error === 'object' && error !== null && MODULE_NOT_FOUND_CODES.has((error as { code?: string }).code ?? '');

/**
 * Run a generation loader that is only available under the storefront's MDX/alias-aware runtime.
 * Degrade to `null` (skeleton tree) *only* when the module genuinely cannot be resolved; any other
 * error is a real generator bug and is rethrown rather than hidden behind a "generation unavailable"
 * warning + skeleton tree (which the drift/completeness gates could then bless).
 */
const loadOptional = async <T>(label: string, loader: () => Promise<T>): Promise<T | null> => {
  try {
    return await loader();
  } catch (error) {
    if (!isModuleNotFound(error)) {
      throw error;
    }
    const reason = error instanceof Error ? error.message.split('\n')[0] : String(error);
    console.warn(`Skipping ${label} — generation module not found under this runtime (${reason}).`);
    return null;
  }
};

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

const loadComponentGeneration = (): Promise<ComponentGeneration | null> =>
  loadOptional('component references', async () => {
    const [meta, references] = await Promise.all([
      import('../src/app/(main)/components/components.meta'),
      import('../src/lib/skill/componentsReference'),
    ]);
    return {
      componentDocsMeta: meta.componentDocsMeta as unknown as ComponentDocsMetaMap & ComponentExamplesMetaMap,
      writeComponentReferences: references.writeComponentReferences,
    };
  });

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

const loadPartialsGeneration = (): Promise<PartialsGeneration | null> =>
  loadOptional('partials reference', async () => {
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
  });

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

const loadMigrationGeneration = (): Promise<MigrationGeneration | null> =>
  loadOptional('migration references', async () => {
    const { writeMigrationReferences } = await import('../src/lib/skill/migrationReference');
    return {
      writeMigrationReferences,
      sources: MIGRATION_GUIDES.map(({ slug }) => ({
        slug,
        page: requireMdxDefault(`../src/app/(main)/news/migration-guide/${slug}/page.mdx`),
      })),
    };
  });

/**
 * Degraded prose that is known and accepted (source MDX embeds an interactive component that cannot
 * render to markdown, etc.). Anything degraded and *not* listed here fails the build — the exact
 * regression the drift snapshot cannot distinguish from an intentional change. Entries use the same
 * identifiers `generateTree` reports, e.g. `react p-popover [introduction]`.
 */
const DEGRADED_ALLOWLIST = new Set<string>();

const generateTree = async (
  framework: Framework,
  generation: ComponentGeneration | null,
  partialsGeneration: PartialsGeneration | null,
  migrationGeneration: MigrationGeneration | null
): Promise<string[]> => {
  const root = path.resolve(REPO_ROOT, WRAPPER_SKILL_DIRS[framework]);
  const tree = new SkillTree(root, framework);
  tree.reset();

  // Seed the reference-map scaffold. Content generators (TASK-03+) write their
  // produced files and register their own rows here before SKILL.md is rendered.
  for (const entry of SKELETON_REFERENCE_MAP) {
    tree.registerReference(entry);
  }

  const degraded: string[] = [];

  const styleReferences = writeStyleReferences(tree, framework);
  console.log(`  ${styleReferences.length} style reference files written`);

  writeTokensReference(tree);
  console.log('  tokens reference written');

  if (partialsGeneration) {
    const result = partialsGeneration.writePartialsReference(tree, partialsGeneration.source);
    console.log('  partials reference written');
    degraded.push(...result.degraded.map((name) => `${framework} partials:${name}`));
  }

  if (migrationGeneration) {
    const { written, degraded: degradedSlugs } = migrationGeneration.writeMigrationReferences(
      tree,
      migrationGeneration.sources
    );
    console.log(`  ${written.length} migration references written`);
    degraded.push(...degradedSlugs.map((slug) => `${framework} migration:${slug}`));
  }

  let roster: ComponentRosterEntry[] = [];
  if (generation) {
    const { componentDocsMeta, writeComponentReferences } = generation;
    const report = writeComponentReferences(
      tree,
      componentDocsMeta,
      { componentMeta, framework },
      { metaMap: componentDocsMeta, framework }
    );
    roster = report.roster;
    console.log(`  ${report.tags.length} component references written`);
    degraded.push(...report.degraded.map(({ tag, sections }) => `${framework} ${tag} [${sections.join(', ')}]`));
  }

  tree.write('SKILL.md', buildSkillMd(framework, tree.referenceMap, roster));

  console.log(`Wrote ${framework} skill tree → ${path.relative(REPO_ROOT, root)}`);
  return degraded;
};

/** Split CLI args into framework positionals and flags; there are no supported flags today. */
const parseArgs = (argv: string[]): { frameworks: string[]; unknownFlags: string[] } => {
  const frameworks: string[] = [];
  const unknownFlags: string[] = [];
  for (const arg of argv) {
    (arg.startsWith('-') ? unknownFlags : frameworks).push(arg);
  }
  return { frameworks, unknownFlags };
};

const main = async (): Promise<void> => {
  const { frameworks: requested, unknownFlags } = parseArgs(process.argv.slice(2));

  if (unknownFlags.length > 0) {
    console.error(`Unknown option(s): ${unknownFlags.join(', ')}. Usage: build:skill [${FRAMEWORKS.join('|')}]...`);
    process.exit(1);
  }

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

  const degraded: string[] = [];
  for (const framework of frameworks as Framework[]) {
    degraded.push(...(await generateTree(framework, generation, partialsGeneration, migrationGeneration)));
  }

  // Fail on any degraded prose that is not explicitly allowlisted: a degraded section silently
  // committed would be blessed by the drift snapshot on the next `-u`, so gate it here at the source.
  const unexpected = degraded.filter((entry) => !DEGRADED_ALLOWLIST.has(entry));
  if (unexpected.length > 0) {
    console.error(
      `Degraded prose (review the source MDX, or add to DEGRADED_ALLOWLIST if intentional):\n  ${unexpected.join('\n  ')}`
    );
    process.exit(1);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
