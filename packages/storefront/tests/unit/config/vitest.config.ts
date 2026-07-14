import { resolve } from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

/**
 * The skill specs run in their own fast CI job (`test:unit:skill`) that skips the heavy Next build,
 * so the full storefront run excludes them to avoid a redundant second execution. Scope is selected
 * via `SKILL_TESTS`:
 *   - `only`    → run just the skill specs (`test:unit:skill`).
 *   - `exclude` → run everything except the skill specs (`test:unit`).
 *   - unset     → run everything (default, e.g. a local `vitest` invocation).
 */
const SKILL_SPECS = ['**/specs/skill/**/*.spec.{tsx,ts}', '**/specs/claudeCodeSkillDocs.spec.ts'];
const skillScope = process.env.SKILL_TESTS;

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '../../../src'), // Adjust path as necessary based on your project structure
    },
  },
  test: {
    root: resolve(__dirname, '../../../'),
    include: skillScope === 'only' ? SKILL_SPECS : ['**/**/*.spec.{tsx,ts}'],
    exclude: [...configDefaults.exclude, ...(skillScope === 'exclude' ? SKILL_SPECS : [])],
    globals: true,
    testTimeout: 10000,
    environment: 'jsdom',
    setupFiles: './tests/unit/config/vitest.setup.ts',
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
});
