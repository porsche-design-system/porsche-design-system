import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ['**/tests/unit/specs/**/*.spec.{tsx,ts}'],
      setupFiles: './tests/unit/config/vitest.setup.ts',
    },
  })
);
