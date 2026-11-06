import { resolve } from 'node:path';
import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    resolve: {
      alias: {
        '@skills': resolve(__dirname, '../../src'),
        '@': resolve(__dirname, '../../../../src'),
      },
    },
    test: {
      root: resolve(__dirname, '../../'),
      include: ['tests/specs/**/*.spec.{tsx,ts}'],
      exclude: ['tests/specs/bin/**/*.spec.ts'],
      testTimeout: 10000,
      // These specs need no DOM, so they skip jsdom's setup cost.
      environment: 'node',
    },
  })
);
