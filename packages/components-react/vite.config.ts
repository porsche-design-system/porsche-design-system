import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import * as partials from '@porsche-design-system/components-react/partials';
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          headPartials: [
            partials.getInitialStyles({ prefix: ['', 'my-prefix'] }),
            partials
              .getFontFaceStyles()
              .replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001'),
            partials.getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }),
          ]
            .join('\n')
            .replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001'),
          bodyPartials: [partials.getBrowserSupportFallbackScript(), partials.getCookiesFallbackScript()]
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
