import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Adjust path as necessary based on your project structure
    },
  },
  test: {
    include: ['**/**/*.spec.{tsx,ts}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/unit/config/vitest.setup.ts',
  },
});
