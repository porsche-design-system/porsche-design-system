import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/tests/smoke/unit/specs/**/*.smoke.ts'],
    testTimeout: 10000,
  },
});
