import { resolve } from 'node:path';
import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      root: resolve(__dirname, '../../../'),
      include: ['**/*.spec.ts'],
      // The projects below `projects/` are workspaces of their own, with their own tests.
      exclude: ['projects/**'],
      setupFiles: './tests/unit/config/vitest.setup.ts',
    },
  })
);
