/// <reference types="vitest" />

import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // replaces `testEnvironment: 'jsdom'`
    root: path.resolve(__dirname, '../../../'), // replaces `rootDir`
    setupFiles: ['tests/unit/config/jest.setup.ts'], // same purpose
    include: ['src/**/*.spec.ts', 'tests/unit/specs/**/*.spec.ts'], // replaces `testMatch`
    exclude: ['dist'], // replaces `modulePathIgnorePatterns`
    globals: true, // enables global test APIs like describe, it, expect
    clearMocks: true,
    restoreMocks: true,
    alias: {
      '@stencil/core': path.resolve(__dirname, '../../../tests/unit/mocks/stencil-decorator.mocks.ts'),
    }, // replaces `moduleNameMapper`
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  define: {
    ROLLUP_REPLACE_IS_STAGING: JSON.stringify('production'),
    ROLLUP_REPLACE_CDN_BASE_URL: JSON.stringify('https://cdn.ui.porsche.com/porsche-design-system'),
  },
});
