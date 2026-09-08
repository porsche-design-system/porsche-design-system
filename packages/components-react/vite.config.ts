import { getFontLinks } from '@porsche-design-system/components-react/partials';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { Features } from "lightningcss"

// https://vite.dev/config/
export default defineConfig({
  css: {
    transformer: "lightningcss",
    // Disables light-dark() polyfill of lightningcss which is broken https://github.com/porsche-design-system/porsche-design-system/issues/4257
    lightningcss: {
      exclude: Features.LightDark,
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    createHtmlPlugin({
      inject: {
        data: {
          headPartials: [getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] })]
            .join('\n')
            .replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001'),
        },
      },
    }),
  ],
  build: {
    outDir: './dist/demo-app',
  },
});
