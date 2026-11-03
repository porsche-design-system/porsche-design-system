/// <reference types="vitest" />

import * as path from 'node:path';
import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      root: path.resolve(__dirname, '../../../'), // replaces `rootDir`
      setupFiles: ['tests/unit/config/vitest.setup.ts'], // same purpose
      include: ['src/**/*.spec.ts', 'tests/unit/specs/**/*.spec.ts'], // replaces `testMatch`
      alias: {
        '@stencil/core': path.resolve(__dirname, '../../../tests/unit/mocks/stencil-decorator.mocks.ts'),
      },
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
    define: {
      ROLLUP_REPLACE_IS_STAGING: JSON.stringify('production'),
      ROLLUP_REPLACE_CDN_BASE_URL: JSON.stringify('https://cdn.ui.porsche.com/porsche-design-system'),
    },
  })
);
