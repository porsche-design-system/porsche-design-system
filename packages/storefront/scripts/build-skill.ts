import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { componentMeta } from '@porsche-design-system/component-meta';
import type { ComponentDocsMetaMap } from '../src/lib/skill/components/reference';
import { renderComponentsSection } from '../src/lib/skill/components/section';
import type { RouteReferences } from '../src/lib/skill/links';
import {
  getPackageSkillRouteReferences,
  renderStylesheetsSection,
  renderStylingSection,
  writePackageSkillReferences,
} from '../src/lib/skill/packageSkills';
import { buildSkillMd } from '../src/lib/skill/skillMd';
import { FRAMEWORKS, type Framework, isFramework, SKILL_STAGING_DIR, SkillTree } from '../src/lib/skill/skillTree';
import { findSkillTreeDifference } from '../src/lib/skill/skillTreeHash';
import { renderTokensSection, TOKENS_REFERENCE, writeTokensReference } from '../src/lib/skill/tokensReference';

const REPO_ROOT = path.resolve(__dirname, '../../..');
const DEFAULT_OUTPUT_ROOT = path.resolve(REPO_ROOT, SKILL_STAGING_DIR);

/**
 * The component-reference generation, loaded together as a unit because it all depends
 * on the storefront runtime: the docs meta's prose is MDX, and the examples pipeline
 * (`components/reference` → `components/examples` → `createFrameworkMarkup`) pulls in the
 * storefront's `@/`-aliased generators. Both require the MDX/alias-aware runtime wired
 * by `build:skill`; resolution failures are fatal because this output is packaged.
 */
type ComponentGeneration = {
  componentDocsMeta: ComponentDocsMetaMap;
  writeComponentReferences: typeof import('../src/lib/skill/components/reference').writeComponentReferences;
};

const loadComponentGeneration = async (): Promise<ComponentGeneration> => {
  const [meta, references] = await Promise.all([
    import('../src/app/(main)/components/components.meta'),
    import('../src/lib/skill/components/reference'),
  ]);
  return {
    componentDocsMeta: meta.componentDocsMeta as unknown as ComponentDocsMetaMap,
    writeComponentReferences: references.writeComponentReferences,
  };
};

const generateTree = async (
  framework: Framework,
  generation: ComponentGeneration,
  outputRoot: string,
  routeReferences: RouteReferences
): Promise<void> => {
  const root = path.join(outputRoot, framework);
  const tree = new SkillTree(root, framework);
  tree.reset();

  const packageSkillReferences = writePackageSkillReferences(tree, routeReferences);
  console.log(`  ${packageSkillReferences.length} package skill reference files written`);

  writeTokensReference(tree);
  console.log('  tokens reference written');

  const { componentDocsMeta, writeComponentReferences } = generation;
  const report = writeComponentReferences(tree, { docsMeta: componentDocsMeta, componentMeta, routeReferences });
  console.log(`  ${report.tags.length} component references written`);

  tree.write(
    'SKILL.md',
    buildSkillMd(framework, {
      components: renderComponentsSection(framework, report.roster),
      stylesheets: renderStylesheetsSection(framework),
      tokens: renderTokensSection(),
      styling: renderStylingSection(),
    })
  );

  console.log(`Wrote ${framework} skill tree → ${path.relative(REPO_ROOT, root)}`);
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
  const routeReferences: RouteReferences = {
    ...getPackageSkillRouteReferences(),
    tokens: `references/${TOKENS_REFERENCE}`,
  };

  for (const framework of frameworks as Framework[]) {
    await generateTree(framework, generation, outputRoot, routeReferences);
  }

  if (checkDeterminism) {
    const roots = [
      fs.mkdtempSync(path.join(os.tmpdir(), 'pds-skill-first-')),
      fs.mkdtempSync(path.join(os.tmpdir(), 'pds-skill-second-')),
    ];
    try {
      for (const root of roots) {
        for (const framework of frameworks as Framework[]) {
          await generateTree(framework, generation, root, routeReferences);
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
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
