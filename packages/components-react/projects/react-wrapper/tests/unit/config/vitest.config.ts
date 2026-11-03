import * as path from 'node:path';
import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      root: path.resolve(__dirname, '../../../'),
      setupFiles: ['tests/unit/config/vitest.setup.ts'],
      include: ['**/tests/unit/specs/**/*.spec.{tsx,ts}'],
      coverage: {
        provider: 'v8',
        exclude: ['node_modules', 'dist'],
        include: ['projects/react-wrapper/src/!(lib)**'],
      },
      logHeapUsage: false,
    },
    resolve: {
      alias: {
        '@': '/projects/react-wrapper/src',
        // The wrapper's source package.json now has an `exports` field, which enables Node.js self-referencing.
        // Since these test files live inside the package, `@porsche-design-system/components-react` would otherwise
        // resolve against the source dir (missing built `cjs`/`esm`/`testing`/`jsdom-polyfill` outputs). Map it to the
        // built `dist` instead, matching how external consumers resolve the package via node_modules.
        '@porsche-design-system/components-react': path.resolve(__dirname, '../../../../../dist/react-wrapper'),
      },
    },
  })
);
