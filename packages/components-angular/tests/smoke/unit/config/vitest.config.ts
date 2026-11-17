import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ['**/tests/smoke/unit/specs/**/*.smoke.ts'],
      testTimeout: 10000,
    },
  })
);
