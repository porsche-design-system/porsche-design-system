import { defineConfig } from 'vitest/config';

// Separate from vite.config.ts, which sets `root: 'src'` for the dev server.
// The JSX transform itself is not configured here: Vite picks up `jsx` and `jsxImportSource` from tsconfig.json,
// so tests, dev server and build all render through the same settings.
export default defineConfig({
  test: {
    include: ['tests/unit/**/*.spec.{ts,tsx}'],
  },
});
