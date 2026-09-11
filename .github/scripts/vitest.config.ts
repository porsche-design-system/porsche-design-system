import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['.github/scripts/**/*.spec.ts'],
    environment: 'node',
  },
});
