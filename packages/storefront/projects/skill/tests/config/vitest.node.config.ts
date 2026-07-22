import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: resolve(__dirname, '../../'),
    include: ['tests/specs/bin/**/*.spec.ts'],
    globals: true,
    testTimeout: 10000,
    environment: 'node',
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
});
