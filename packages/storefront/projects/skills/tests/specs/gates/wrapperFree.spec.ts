import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { WRAPPER_REQUESTS_PREFIX } from '../../helpers/recordWrapperRequests';

/**
 * `build:skills` runs before the framework wrappers are built, so nothing it loads may request one. It reads the
 * component docs meta, the catalogue of the examples and the generators under the runtime of `build:skills`, in a
 * process of its own, and fails on any request for `@porsche-design-system/components-{js,angular,react,vue}`.
 */
const SKILLS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

/** Runs `code` under the runtime of `build:skills` and returns the wrapper requests it made. */
const getWrapperRequests = (code: string): string[] => {
  const output = execFileSync(
    process.execPath,
    [
      '--import',
      'tsx',
      '--require',
      './scripts/skill-mdx-loader.cjs',
      '--import',
      './tests/helpers/recordWrapperRequests.ts',
      '--eval',
      code,
    ],
    { cwd: SKILLS_DIR, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
  );
  const line = output.split('\n').find((entry) => entry.startsWith(WRAPPER_REQUESTS_PREFIX));
  if (!line) {
    throw new Error(`No wrapper requests were recorded:\n${output}`);
  }
  return JSON.parse(line.slice(WRAPPER_REQUESTS_PREFIX.length));
};

describe('build:skills', () => {
  it('loads the component docs meta, the examples and the generators without requesting a framework wrapper', () => {
    expect(
      getWrapperRequests(
        [
          'Promise.all([',
          "import('../../src/app/(main)/components/components.meta'),",
          "import('./src/knowledge/components/catalogue'),",
          "import('./src/generators'),",
          '])',
        ].join('')
      )
    ).toEqual([]);
  }, 120_000);

  it.each([
    [
      'import',
      '@porsche-design-system/components-react/ssr',
      "import('@porsche-design-system/components-react/ssr').catch(() => {})",
    ],
    [
      'require',
      '@porsche-design-system/components-vue',
      "try { require('@porsche-design-system/components-vue') } catch {}",
    ],
  ])(
    'would notice a wrapper requested by %s',
    (_, specifier, code) => {
      expect(getWrapperRequests(code)).toContainEqual(expect.stringMatching(new RegExp(`^${specifier} ← .*eval`)));
    },
    60_000
  );
});
