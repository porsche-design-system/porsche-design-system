import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './',
    environment: 'jsdom',
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    globals: false,
    typecheck: {
      tsconfig: 'tsconfig.test.json',
    },
  },
});
