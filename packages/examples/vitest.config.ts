import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

// Separate from vite.config.ts, which sets `root: 'src'` for the dev server.
// The JSX transform itself is not configured here: Vite picks up `jsx` and `jsxImportSource` from tsconfig.json,
// so tests, dev server and build all render through the same settings.
export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ['tests/unit/**/*.spec.{ts,tsx}'],
      // These specs need no DOM, so they skip jsdom's setup cost.
      environment: 'node',
    },
  })
);
