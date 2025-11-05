import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: '../../../',
  test: {
    environment: 'jsdom',
    setupFiles: ['<rootDir>/tests/unit/config/jest.setup.ts'],
    include: ['**/tests/unit/specs/**/*.spec.{tsx,ts}'],
    coverage: {
      provider: 'v8',
      exclude: ['node_modules', 'dist'],
      include: ['projects/react-wrapper/src/!(lib)**'],
    },
    clearMocks: true,
    restoreMocks: true,
    logHeapUsage: false,
  },
  resolve: {
    alias: {
      '@': '/projects/react-wrapper/src',
    },
  },
});
