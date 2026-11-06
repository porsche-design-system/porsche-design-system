import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

// Run by vitestConsoleGuard.spec.ts in a nested Vitest process. Imports the base the way package configs do.
export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      root: __dirname,
      include: ['*.fixture.ts'],
    },
  })
);
