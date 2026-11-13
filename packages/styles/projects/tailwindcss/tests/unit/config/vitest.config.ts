import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ['**/tests/unit/specs/**/*.spec.ts'],
      // These specs need no DOM, so they skip jsdom's setup cost.
      environment: 'node',
    },
  })
);
