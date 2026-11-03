import { resolve } from 'node:path';
import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      root: resolve(__dirname, '../../../'),
      include: ['tests/unit/specs/**/*.spec.{ts,tsx}'],
      // These specs need no DOM, so they skip jsdom's setup cost.
      environment: 'node',
    },
  })
);
