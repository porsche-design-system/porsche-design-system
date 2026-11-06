import { resolve } from 'node:path';
import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    // `figma` exists only in Code Connect's template runtime; the helpers under test import this stand-in instead
    resolve: { alias: { figma: resolve(__dirname, 'figma.ts') } },
    test: {
      root: resolve(__dirname, '../../../'),
      include: ['tests/unit/specs/**/*.spec.ts'],
      // These specs need no DOM, so they skip jsdom's setup cost.
      environment: 'node',
    },
  })
);
