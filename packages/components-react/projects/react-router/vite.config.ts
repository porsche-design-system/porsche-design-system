import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ isSsrBuild }) => {
  return {
    define: {
      'process.browser': JSON.stringify(!isSsrBuild),
    },
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  };
});
