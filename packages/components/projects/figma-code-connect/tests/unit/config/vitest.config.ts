import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // `figma` exists only in Code Connect's template runtime; the helpers under test import this stand-in instead
  resolve: { alias: { figma: resolve(__dirname, 'figma.ts') } },
  test: {
    root: resolve(__dirname, '../../../'),
    include: ['tests/unit/specs/**/*.spec.ts'],
    environment: 'node',
  },
});
