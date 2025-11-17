import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@porsche-design-system\/shared\/testing$/,
        replacement: resolve(__dirname, '../../../../shared/dist/testing/esm/index.mjs'),
      },
    ],
    conditions: ['import', 'module', 'browser', 'default'],
  },
  test: {
    root: resolve(__dirname, '../../../'),
    include: ['tests/unit/specs/**/*.spec.ts', '!**/projects/**'],
    globals: true,
    environment: 'jsdom',
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
});
