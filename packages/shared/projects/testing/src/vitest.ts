import { configDefaults, type ViteUserConfig } from 'vitest/config';

// Node loads this file directly, because Vite's config bundler externalizes this package. So it has no relative
// imports, and the guard is a separate export that Vitest loads.
export const vitestConfig: ViteUserConfig = {
  test: {
    globals: true,
    environment: 'jsdom',
    // Vitest 5 truncates interpolated values in `test.each` titles at 40 chars, which hides the
    // values that distinguish cases and collapses distinct snapshot keys into one. 0 disables it.
    taskTitleValueFormatTruncate: 0,
    // Vitest 5's default, stated so every mock setting is visible here.
    clearMocks: true,
    restoreMocks: true,
    // A package can only append to this array, so it keeps Vitest's defaults.
    exclude: [...configDefaults.exclude, '**/dist/**'],
    // Arrays concatenate in mergeConfig, so no package can drop the guard. Package setup files run after it.
    setupFiles: ['@porsche-design-system/testing/vitest-console-guard'],
  },
};
