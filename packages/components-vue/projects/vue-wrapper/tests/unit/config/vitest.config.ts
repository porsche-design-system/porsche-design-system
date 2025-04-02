import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/tests/unit/specs/**/*.spec.ts'],
    testTimeout: 10000,
    environment: 'jsdom',
  },
  plugins: [vue()],
});
