import * as path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/tests/unit/specs/**/*.spec.ts'],
    testTimeout: 10000,
    environment: 'jsdom',
  },
  plugins: [vue()],
  resolve: {
    alias: {
      // These test files sit inside the `@porsche-design-system/components-vue` package. When a file imports the very
      // package it lives in, Node resolves that import to the package's own source folder rather than to its build
      // output. That behaviour is called self-referencing. The source folder has no `testing` sub-folder because only
      // the build creates one, so importing `@porsche-design-system/components-vue/testing` would fail here.
      // Pointing the package name at `dist` makes it resolve the same way it does for a real consumer installing from
      // node_modules. The react-wrapper unit config does this for the same reason.
      '@porsche-design-system/components-vue': path.resolve(__dirname, '../../../../../dist/vue-wrapper'),
    },
  },
});
