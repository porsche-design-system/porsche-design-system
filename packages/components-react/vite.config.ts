import { getFontFaceStyles, getFontLinks, getInitialStyles } from '@porsche-design-system/components-react/partials';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          headPartials: [
            getInitialStyles({ prefix: ['', 'my-prefix'] }),
            getFontFaceStyles().replace(
              /https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g,
              'http://localhost:3001'
            ),
            getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }),
          ]
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
