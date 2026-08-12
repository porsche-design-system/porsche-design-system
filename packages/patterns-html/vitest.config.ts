import { defineConfig } from 'vitest/config';

// Separate from vite.config.ts, which sets `root: 'src'` for the dev server.
export default defineConfig({
  test: {
    include: ['tests/unit/**/*.spec.ts'],
  },
});
