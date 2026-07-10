import path from 'node:path';
import { componentMeta } from '@porsche-design-system/component-meta';
import type { ComponentExamplesMetaMap } from '../src/lib/skill/componentExamples';
import type { ComponentDocsMetaMap } from '../src/lib/skill/componentsReference';
import { buildSkillMd, type ComponentRosterEntry } from '../src/lib/skill/skillMd';
import { FRAMEWORKS, type Framework, isFramework, SkillTree, WRAPPER_SKILL_DIRS } from '../src/lib/skill/skillTree';
import { writeStyleReferences } from '../src/lib/skill/stylesReference';
import { writeTokensReference } from '../src/lib/skill/tokensReference';

const REPO_ROOT = path.resolve(__dirname, '../../..');

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
 * Degraded prose that is known and accepted (source MDX embeds an interactive component that cannot
 * render to markdown, etc.). Anything degraded and *not* listed here fails the build — the exact
 * regression the drift snapshot cannot distinguish from an intentional change. Entries use the same
 * identifiers `generateTree` reports, e.g. `react p-popover [introduction]`.
 */
const DEGRADED_ALLOWLIST = new Set<string>();

const generateTree = async (
  framework: Framework,
  generation: ComponentGeneration | null
): Promise<string[]> => {
  const root = path.resolve(REPO_ROOT, WRAPPER_SKILL_DIRS[framework]);
  const tree = new SkillTree(root, framework);
  tree.reset();

  const degraded: string[] = [];

  const styleReferences = writeStyleReferences(tree, framework);
  console.log(`  ${styleReferences.length} style reference files written`);

  writeTokensReference(tree);
  console.log('  tokens reference written');

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

  tree.write('SKILL.md', buildSkillMd(framework, roster));

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

  const generation = await loadComponentGeneration();

  const degraded: string[] = [];
  for (const framework of frameworks as Framework[]) {
    degraded.push(...(await generateTree(framework, generation)));
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
