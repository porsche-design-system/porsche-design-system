import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

export interface ImpactPlan {
  commands: string[];
  reason: string;
  broadenOrStop: boolean;
}

const ROOT_BUILD_TOOLS = new Set([
  'typescript',
  'vite',
  'rollup',
  'vitest',
  'webpack',
  'esbuild',
  '@biomejs/biome',
]);

const WRAPPER_TESTS: Record<string, string> = {
  react: 'npm run test:unit:components-react',
  'react-dom': 'npm run test:unit:components-react',
  next: 'npm run test:unit:components-react',
  'react-router': 'npm run test:unit:components-react',
  'react-router-dom': 'npm run test:unit:components-react',
  vue: 'npm run test:unit:components-vue',
};

export function selectImpactTests(changedDeps: string[]): ImpactPlan {
  if (changedDeps.length === 0) {
    return {
      commands: ['npm run build:core-dependencies', 'npm run test:unit:components'],
      reason: 'No third-party changes classified; running a conservative core build and components unit tests.',
      broadenOrStop: false,
    };
  }

  const commands = new Set<string>();
  const reasons: string[] = [];
  let broadenOrStop = false;

  for (const dep of changedDeps) {
    if (ROOT_BUILD_TOOLS.has(dep)) {
      commands.add('npm run build');
      commands.add('npm run test:unit:components');
      reasons.push(`${dep} is a root build tool -> full build + broad unit`);
    } else if (WRAPPER_TESTS[dep]) {
      commands.add('npm run build:core-dependencies');
      commands.add(WRAPPER_TESTS[dep]);
      reasons.push(`${dep} is a wrapper runtime dep -> core build + wrapper unit`);
    } else {
      commands.add('npm run build');
      commands.add('npm run test:unit:components');
      broadenOrStop = true;
      reasons.push(`${dep} impact unknown -> broaden (full build + components unit)`);
    }
  }

  return { commands: [...commands], reason: reasons.join('; '), broadenOrStop };
}

interface BumpVerdict {
  changes?: { name: string }[];
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let changed: string[] = [];
  try {
    const bump = JSON.parse(readFileSync(resolve(OUT_DIR, 'bump.json'), 'utf8')) as BumpVerdict;
    changed = (bump.changes ?? []).map((change) => change.name);
  } catch {
    changed = [];
  }
  const plan = selectImpactTests(changed);
  writeVerdict('impact.json', { schemaVersion: 1, ...plan });
  process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
}
