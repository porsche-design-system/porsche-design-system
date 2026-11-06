import { resolve } from 'node:path';
import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      root: resolve(__dirname, '../../..'),
      include: ['**/src/**/*.spec.ts', '**/tests/unit/specs/**/*.spec.{ts,tsx}'],
    },
    plugins: [vanillaExtractPlugin()],
  })
);
