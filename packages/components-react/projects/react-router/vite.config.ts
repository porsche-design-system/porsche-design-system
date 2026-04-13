import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { Features } from "lightningcss"

export default defineConfig(({ isSsrBuild }) => {
  return {
    css: {
      transformer: "lightningcss",
      // Disables light-dark() polyfill of lightningcss which is broken https://github.com/porsche-design-system/porsche-design-system/issues/4257
      lightningcss: {
        exclude: Features.LightDark,
      },
    },
    define: {
      'process.browser': JSON.stringify(!isSsrBuild),
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      tailwindcss(),
      reactRouter(),
    ],
  };
});
