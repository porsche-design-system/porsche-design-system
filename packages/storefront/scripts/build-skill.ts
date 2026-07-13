import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseArgs } from 'node:util';
import type { ComponentDocsMetaMap } from '../src/lib/skill/components/reference';
import type { generateSkillTree } from '../src/lib/skill/generateSkillTree';
import { FRAMEWORKS, type Framework, isFramework, SKILL_STAGING_DIR } from '../src/lib/skill/support/skillTree';
import { findSkillTreeDifference } from '../src/lib/skill/support/skillTreeHash';

/**
 * CLI wrapper around `generateSkillTree`: argument handling, exit codes and the determinism
 * harness. The generation itself — MDX-backed component docs plus the package-skill and tokens
 * serializers — only resolves under the MDX/alias-aware runtime this script is started with
 * (`node --import tsx --require ./scripts/skill-mdx-loader.cjs`), so the heavy modules are loaded
 * after argument validation.
 */

const REPO_ROOT = path.resolve(__dirname, '../../..');
const DEFAULT_OUTPUT_ROOT = path.resolve(REPO_ROOT, SKILL_STAGING_DIR);
const USAGE = `Usage: build:skill [--output-root <path>] [--check-determinism] [${FRAMEWORKS.join('|')}]...`;

type Generation = {
  generate: typeof generateSkillTree;
  docsMeta: ComponentDocsMetaMap;
};

const generateTrees = (frameworks: readonly Framework[], outputRoot: string, generation: Generation): void => {
  for (const framework of frameworks) {
    const root = path.join(outputRoot, framework);
    generation.generate(root, framework, generation.docsMeta);
    console.log(`Wrote ${framework} skill tree → ${path.relative(REPO_ROOT, root)}`);
  }
};

/** Generate every tree twice into isolated temp roots and fail on any byte difference. */
const checkDeterminism = (frameworks: readonly Framework[], generation: Generation): void => {
  const roots = [
    fs.mkdtempSync(path.join(os.tmpdir(), 'pds-skill-first-')),
    fs.mkdtempSync(path.join(os.tmpdir(), 'pds-skill-second-')),
  ];
  try {
    for (const root of roots) {
      generateTrees(frameworks, root, generation);
    }
    for (const framework of frameworks) {
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
};

const parseCliArgs = (): { frameworks: Framework[]; outputRoot: string; checkDeterminism: boolean } => {
  try {
    const { values, positionals } = parseArgs({
      options: {
        'output-root': { type: 'string' },
        'check-determinism': { type: 'boolean' },
      },
      allowPositionals: true,
    });
    for (const framework of positionals) {
      if (!isFramework(framework)) {
        throw new Error(`Unknown framework "${framework}". Expected one of: ${FRAMEWORKS.join(', ')}.`);
      }
    }
    return {
      frameworks: positionals.length > 0 ? (positionals as Framework[]) : [...FRAMEWORKS],
      outputRoot: values['output-root'] ? path.resolve(process.cwd(), values['output-root']) : DEFAULT_OUTPUT_ROOT,
      checkDeterminism: values['check-determinism'] ?? false,
    };
  } catch (error) {
    console.error(`${error instanceof Error ? error.message : String(error)} ${USAGE}`);
    process.exit(1);
  }
};

const main = async (): Promise<void> => {
  const { frameworks, outputRoot, checkDeterminism: runDeterminismCheck } = parseCliArgs();

  // Loaded after argument validation: `components.meta` pulls the whole MDX docs surface.
  const [{ componentDocsMeta }, { generateSkillTree }] = await Promise.all([
    import('../src/app/(main)/components/components.meta'),
    import('../src/lib/skill/generateSkillTree'),
  ]);
  const generation: Generation = {
    generate: generateSkillTree,
    docsMeta: componentDocsMeta as unknown as ComponentDocsMetaMap,
  };

  generateTrees(frameworks, outputRoot, generation);

  if (runDeterminismCheck) {
    checkDeterminism(frameworks, generation);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
