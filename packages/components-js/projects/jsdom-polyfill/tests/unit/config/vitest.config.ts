import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/tests/unit/specs/**/*.spec.ts'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/unit/config/vitest.setup.ts',
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
});
