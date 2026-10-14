/// <reference types="vitest" />

import * as path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // replaces `testEnvironment: 'jsdom'`
    root: path.resolve(__dirname, '../../../'), // replaces `rootDir`
    setupFiles: ['tests/unit/config/vitest.setup.ts'], // same purpose
    include: ['src/**/*.spec.ts', 'tests/unit/specs/**/*.spec.ts'], // replaces `testMatch`
    exclude: ['dist'], // replaces `modulePathIgnorePatterns`
    globals: true, // enables global test APIs like describe, it, expect
    // Vitest 5 truncates interpolated values in `test.each` titles at 40 chars, which hides the
    // values that distinguish cases and collapses distinct snapshot keys into one. 0 disables it.
    taskTitleValueFormatTruncate: 0,
    clearMocks: true,
    restoreMocks: true,
    alias: {
      '@stencil/core': path.resolve(__dirname, '../../../tests/unit/mocks/stencil-decorator.mocks.ts'),
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    typecheck: {
      tsconfig: 'tsconfig.test.json',
    },
  },
  define: {
    ROLLUP_REPLACE_IS_STAGING: JSON.stringify('production'),
    ROLLUP_REPLACE_CDN_BASE_URL: JSON.stringify('https://cdn.ui.porsche.com/porsche-design-system'),
  },
});
