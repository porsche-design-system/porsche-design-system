import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: resolve(__dirname, '../../../'),
    include: ['**/tests/unit/specs/**/*.spec.ts'],
    globalSetup: [resolve(__dirname, 'globalSetup.ts')],
    globals: true,
    environment: 'jsdom',
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
});
