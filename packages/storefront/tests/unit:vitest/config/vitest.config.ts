import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/tests/unit:vitest/specs/**/*.spec.ts'],
    testTimeout: 10000,
  },
});
