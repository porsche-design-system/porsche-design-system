import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/src/**/*.spec.ts', '**/tests/unit/specs/**/*.spec.(ts|tsx)', '!**/projects/**'],
    globals: true,
    environment: 'jsdom',
    typecheck: {
      tsconfig: 'tsconfig.test.json',
    },
  },
});
