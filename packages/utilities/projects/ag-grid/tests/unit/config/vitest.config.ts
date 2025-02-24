import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    ROLLUP_REPLACE_CDN_BASE_URL: JSON.stringify('https://cdn.ui.porsche.com/porsche-design-system'),
  },
  test: {
    include: ['**/src/**/*.spec.ts', '**/tests/unit/specs/**/*.spec.(ts|tsx)'],
    globals: true,
  },
});
