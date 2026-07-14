import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';
import { matchesAny } from './policy.ts';

export interface ImpactPlan {
  commands: string[];
  reason: string;
  broadenOrStop: boolean;
}

// A broad, sandbox-safe (vitest-based) cross-section of unit suites. Used when a
// change touches shared build/test infrastructure or is of unknown blast radius,
// where a single package's suite is not enough evidence that the bump is safe.
const BROAD_UNIT_SUITES = [
  'npm run test:unit:components',
  'npm run test:unit:components-js',
  'npm run test:unit:components-react',
  'npm run test:unit:components-vue',
  'npm run test:unit:styles',
  'npm run test:unit:storefront',
  'npm run test:unit:shared',
  'npm run test:unit:utilities',
];

// Compilers, bundlers, and test runners whose majors (or even minors) change
// semantics across the whole monorepo -> full build + the broad unit matrix.
const ROOT_BUILD_OR_TEST_INFRA = new Set([
  'typescript',
  'vite',
  'rollup',
  'vitest',
  'webpack',
  'esbuild',
  '@biomejs/biome',
  'tsx',
]);

// Per-wrapper runtime deps -> that wrapper's build + unit suite. These are
// minor/patch-only families, so they arrive as minors, but a minor can still
// break a wrapper, so validate the wrapper it belongs to.
const WRAPPER_TESTS: Record<string, { build: string; test: string }> = {
  react: { build: 'npm run build:components-react', test: 'npm run test:unit:components-react' },
  'react-dom': { build: 'npm run build:components-react', test: 'npm run test:unit:components-react' },
  next: { build: 'npm run build:components-react', test: 'npm run test:unit:components-react' },
  'react-router': { build: 'npm run build:components-react', test: 'npm run test:unit:components-react' },
  'react-router-dom': { build: 'npm run build:components-react', test: 'npm run test:unit:components-react' },
  '@testing-library/react': { build: 'npm run build:components-react', test: 'npm run test:unit:components-react' },
  '@vitejs/plugin-react': { build: 'npm run build:components-react', test: 'npm run test:unit:components-react' },
  vue: { build: 'npm run build:components-vue', test: 'npm run test:unit:components-vue' },
  'vue-router': { build: 'npm run build:components-vue', test: 'npm run test:unit:components-vue' },
  'vue-tsc': { build: 'npm run build:components-vue', test: 'npm run test:unit:components-vue' },
  '@vitejs/plugin-vue': { build: 'npm run build:components-vue', test: 'npm run test:unit:components-vue' },
};

// Styling families -> styles build + styles unit suites.
const STYLING_PATTERNS = [
  'tailwindcss',
  '@tailwindcss/**',
  'sass',
  '@emotion/**',
  '@vanilla-extract/**',
  'postcss',
  'autoprefixer',
];
const STYLING_COMMANDS = ['npm run build:styles', 'npm run test:unit:styles'];

// Storefront-only runtime/content deps -> storefront build + unit suite.
const STOREFRONT_PATTERNS = [
  'react-syntax-highlighter',
  '@types/react-syntax-highlighter',
  'react-instantsearch',
  '@mdx-js/**',
  'algoliasearch',
  'next',
];
const STOREFRONT_COMMANDS = ['npm run build:storefront', 'npm run test:unit:storefront'];

// A single dependency can belong to several categories (e.g. `next` drives both
// the React wrapper's Next.js integration and the storefront). Accumulate the
// validation from EVERY matching category rather than stopping at the first, so
// the gate exercises each surface the change can break.
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
    let matched = false;

    if (ROOT_BUILD_OR_TEST_INFRA.has(dep)) {
      commands.add('npm run build');
      for (const cmd of BROAD_UNIT_SUITES) commands.add(cmd);
      reasons.push(`${dep} is root build/test infra -> full build + broad unit matrix`);
      matched = true;
    }
    if (WRAPPER_TESTS[dep]) {
      commands.add('npm run build:core-dependencies');
      commands.add(WRAPPER_TESTS[dep].build);
      commands.add(WRAPPER_TESTS[dep].test);
      reasons.push(`${dep} is a wrapper runtime dep -> wrapper build + unit`);
      matched = true;
    }
    if (matchesAny(dep, STYLING_PATTERNS)) {
      for (const cmd of STYLING_COMMANDS) commands.add(cmd);
      reasons.push(`${dep} is a styling dep -> styles build + unit`);
      matched = true;
    }
    if (matchesAny(dep, STOREFRONT_PATTERNS)) {
      for (const cmd of STOREFRONT_COMMANDS) commands.add(cmd);
      reasons.push(`${dep} affects the storefront -> storefront build + unit`);
      matched = true;
    }
    if (!matched) {
      commands.add('npm run build');
      for (const cmd of BROAD_UNIT_SUITES) commands.add(cmd);
      broadenOrStop = true;
      reasons.push(`${dep} impact unknown -> broaden (full build + broad unit matrix)`);
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
