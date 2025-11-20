import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@porsche-design-system/shared/testing': resolve(__dirname, '../../../../shared/src/testing'),
    },
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
