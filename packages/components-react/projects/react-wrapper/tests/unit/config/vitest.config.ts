import * as path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: path.resolve(__dirname, '../../../'),
    environment: 'jsdom',
    setupFiles: ['tests/unit/config/vitest.setup.ts'],
    include: ['**/tests/unit/specs/**/*.spec.{tsx,ts}'],
    coverage: {
      provider: 'v8',
      exclude: ['node_modules', 'dist'],
      include: ['projects/react-wrapper/src/!(lib)**'],
    },
    clearMocks: true,
    restoreMocks: true,
    logHeapUsage: false,
  },
  resolve: {
    alias: {
      '@': '/projects/react-wrapper/src',
    },
  },
});
