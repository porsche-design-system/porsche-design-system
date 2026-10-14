import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: resolve(__dirname, '../../../'),
    include: ['**/*.spec.ts'],
    globals: true,
    // Vitest 5 truncates interpolated values in `test.each` titles at 40 chars, which hides the
    // values that distinguish cases and collapses distinct snapshot keys into one. 0 disables it.
    taskTitleValueFormatTruncate: 0,
    environment: 'jsdom',
    setupFiles: './tests/unit/config/vitest.setup.ts',
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
});
