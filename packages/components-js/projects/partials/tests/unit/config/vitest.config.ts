import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ['**/tests/unit/specs/**/*.+(ts|tsx|js)'],
      // Partials throw when they detect a browser, and jsdom looks like one.
      environment: 'node',
    },
  })
);
