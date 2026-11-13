import { resolve } from 'node:path';
import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../../src'), // Adjust path as necessary based on your project structure
      },
    },
    test: {
      root: resolve(__dirname, '../../../'),
      include: ['**/**/*.spec.{tsx,ts}'],
      exclude: ['projects/**'],
      testTimeout: 10000,
      setupFiles: './tests/unit/config/vitest.setup.ts',
    },
  })
);
