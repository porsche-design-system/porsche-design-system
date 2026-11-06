import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      setupFiles: ['tests/unit/config/vitest.setup.ts'],
      include: ['tests/unit/specs/**/*.spec.ts'],
      coverage: {
        provider: 'v8',
        include: ['projects/angular-wrapper/src/**'],
        exclude: ['**/node_modules/**', 'projects/angular-wrapper/src/lib/**'],
      },
    },
  })
);
