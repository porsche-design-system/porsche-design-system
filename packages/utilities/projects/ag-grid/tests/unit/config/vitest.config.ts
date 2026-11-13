import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    define: {
      ROLLUP_REPLACE_CDN_BASE_URL: JSON.stringify('https://cdn.ui.porsche.com/porsche-design-system'),
    },
    test: {
      include: ['**/src/**/*.spec.ts', '**/tests/unit/specs/**/*.spec.(ts|tsx)'],
      // These specs need no DOM, so they skip jsdom's setup cost.
      environment: 'node',
    },
  })
);
