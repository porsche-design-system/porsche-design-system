import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    include: ['**/tests/unit/specs/**/*.spec.{ts,tsx}'],
  },
  plugins: [react()],
});
