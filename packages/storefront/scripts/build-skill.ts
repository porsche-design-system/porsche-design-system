import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { componentMeta } from '@porsche-design-system/component-meta';
import type { ComponentExamplesMetaMap } from '../src/lib/skill/componentExamples';
import type { ComponentDocsMetaMap } from '../src/lib/skill/componentsReference';
import { buildSkillMd, type ComponentRosterEntry } from '../src/lib/skill/skillMd';
import { FRAMEWORKS, type Framework, isFramework, SKILL_STAGING_DIR, SkillTree } from '../src/lib/skill/skillTree';
import { findSkillTreeDifference } from '../src/lib/skill/skillTreeHash';
import { writeStyleReferences } from '../src/lib/skill/stylesReference';
import { writeTokensReference } from '../src/lib/skill/tokensReference';

const REPO_ROOT = path.resolve(__dirname, '../../..');
const DEFAULT_OUTPUT_ROOT = path.resolve(REPO_ROOT, SKILL_STAGING_DIR);

/**
 * The component-reference generation, loaded together as a unit because it all depends
 * on the storefront runtime: the docs meta's prose is MDX, and the examples pipeline
 * (`componentsReference` → `componentExamples` → `createFrameworkMarkup`) pulls in the
 * storefront's `@/`-aliased generators. Both require the MDX/alias-aware runtime wired
 * by `build:skill`; resolution failures are fatal because this output is packaged.
 */
type ComponentGeneration = {
  componentDocsMeta: ComponentDocsMetaMap & ComponentExamplesMetaMap;
  writeComponentReferences: typeof import('../src/lib/skill/componentsReference').writeComponentReferences;
};

const loadComponentGeneration = async (): Promise<ComponentGeneration> => {
  const [meta, references] = await Promise.all([
    import('../src/app/(main)/components/components.meta'),
    import('../src/lib/skill/componentsReference'),
  ]);
  return {
    componentDocsMeta: meta.componentDocsMeta as unknown as ComponentDocsMetaMap & ComponentExamplesMetaMap,
    writeComponentReferences: references.writeComponentReferences,
  };
};

/**
 * Degraded prose that is known and accepted (source MDX embeds an interactive component that cannot
 * render to markdown, etc.). Anything degraded and *not* listed here fails the build — the exact
 * regression the drift snapshot cannot distinguish from an intentional change. Entries use the same
 * identifiers `generateTree` reports, e.g. `react p-popover [introduction]`.
 */
const DEGRADED_ALLOWLIST = new Set<string>();

const generateTree = async (
  framework: Framework,
  generation: ComponentGeneration,
  outputRoot: string
): Promise<string[]> => {
  const root = path.join(outputRoot, framework);
  const tree = new SkillTree(root, framework);
  tree.reset();

  const degraded: string[] = [];

  const styleReferences = writeStyleReferences(tree, framework);
  console.log(`  ${styleReferences.length} style reference files written`);

  writeTokensReference(tree);
  console.log('  tokens reference written');

  const { componentDocsMeta, writeComponentReferences } = generation;
  const report = writeComponentReferences(
    tree,
    componentDocsMeta,
    { componentMeta, framework },
    { metaMap: componentDocsMeta, framework }
  );
  const roster: ComponentRosterEntry[] = report.roster;
  console.log(`  ${report.tags.length} component references written`);
  degraded.push(...report.degraded.map(({ tag, sections }) => `${framework} ${tag} [${sections.join(', ')}]`));

  tree.write('SKILL.md', buildSkillMd(framework, roster));

  console.log(`Wrote ${framework} skill tree → ${path.relative(REPO_ROOT, root)}`);
  return degraded;
};

/** Parse optional framework positionals and an isolated output root for determinism checks. */
const parseArgs = (
  argv: string[]
): { frameworks: string[]; outputRoot: string; checkDeterminism: boolean; errors: string[] } => {
  const frameworks: string[] = [];
  const errors: string[] = [];
  let outputRoot = DEFAULT_OUTPUT_ROOT;
  let checkDeterminism = false;

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--output-root') {
      const value = argv[index + 1];
      if (!value || value.startsWith('-')) {
        errors.push('Missing value for --output-root.');
      } else {
        outputRoot = path.resolve(process.cwd(), value);
        index++;
      }
    } else if (arg.startsWith('--output-root=')) {
      const value = arg.slice('--output-root='.length);
      if (!value) {
        errors.push('Missing value for --output-root.');
      } else {
        outputRoot = path.resolve(process.cwd(), value);
      }
    } else if (arg === '--check-determinism') {
      checkDeterminism = true;
    } else if (arg.startsWith('-')) {
      errors.push(`Unknown option: ${arg}.`);
    } else {
      frameworks.push(arg);
    }
  }

  return { frameworks, outputRoot, checkDeterminism, errors };
};

const main = async (): Promise<void> => {
  const { frameworks: requested, outputRoot, checkDeterminism, errors } = parseArgs(process.argv.slice(2));

  if (errors.length > 0) {
    console.error(
      `${errors.join('\n')} Usage: build:skill [--output-root <path>] [--check-determinism] ` +
        `[${FRAMEWORKS.join('|')}]...`
    );
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
    degraded.push(...(await generateTree(framework, generation, outputRoot)));
  }

  if (checkDeterminism) {
    const roots = [
      fs.mkdtempSync(path.join(os.tmpdir(), 'pds-skill-first-')),
      fs.mkdtempSync(path.join(os.tmpdir(), 'pds-skill-second-')),
    ];
    try {
      for (const root of roots) {
        for (const framework of frameworks as Framework[]) {
          await generateTree(framework, generation, root);
        }
      }

      for (const framework of frameworks as Framework[]) {
        const difference = findSkillTreeDifference(path.join(roots[0], framework), path.join(roots[1], framework));
        if (difference) {
          throw new Error(`${framework} skill generation is not deterministic: ${difference}`);
        }
      }

      console.log('Skill generation is byte-for-byte deterministic.');
    } finally {
      for (const root of roots) {
        fs.rmSync(root, { recursive: true, force: true });
      }
    }
  }

  // Fail on any degraded prose that is not explicitly allowlisted: a degraded section could otherwise
  // be blessed by the compact hash snapshot on the next `-u`, so gate it here at the source.
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
