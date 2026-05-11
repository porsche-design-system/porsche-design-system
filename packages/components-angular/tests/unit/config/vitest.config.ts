import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
  test: {
    globals: false,
    environment: 'jsdom',
    setupFiles: ['tests/unit/config/vitest.setup.ts'],
    include: ['tests/unit/specs/**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    coverage: {
      provider: 'v8',
      include: ['projects/angular-wrapper/src/**'],
      exclude: ['**/node_modules/**', 'projects/angular-wrapper/src/lib/**'],
    },
    clearMocks: true,
    restoreMocks: true,
  },
});
