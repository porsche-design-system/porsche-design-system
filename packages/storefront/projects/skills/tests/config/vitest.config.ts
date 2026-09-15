import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
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
    globals: true,
    testTimeout: 10000,
    environment: 'node',
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
});
