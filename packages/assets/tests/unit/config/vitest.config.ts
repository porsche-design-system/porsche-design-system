import { vitestConfig } from '@porsche-design-system/testing/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['**/src/**/*.spec.ts', '**/tests/unit/specs/**/*.spec.(ts|tsx)', '!**/projects/**'],
    },
  })
);
