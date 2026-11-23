import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ['tests/**/*.spec.ts'],
      // The MDX specs render in a Node process of their own, with the hooks, which compiles every fixture first.
      testTimeout: 20000,
    },
  })
);
