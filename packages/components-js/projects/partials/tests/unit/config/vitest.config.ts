import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/tests/unit/specs/**/*.+(ts|tsx|js)'],
    globals: true,
  },
});
