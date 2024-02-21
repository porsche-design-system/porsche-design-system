import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/tests/unit/specs/**/*.spec.{tsx,ts}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/unit/config/vitest.setup.ts',
  },
});
