import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: resolve(__dirname, '../../..'),
    include: ['**/src/**/*.spec.ts', '**/tests/unit/specs/**/*.spec.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
});
