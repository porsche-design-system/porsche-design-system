import { defineConfig } from 'vite';
import { resolve } from 'path';
import {
  getInitialStyles,
  getMetaTagsAndIconLinks,
  getComponentChunkLinks,
  getFontFaceStylesheet,
  getFontLinks,
  getIconLinks,
  getLoaderScript,
} from '@porsche-design-system/components-js/partials';
import { COMPONENT_CHUNK_NAMES } from './projects/components-wrapper';
import { ICON_NAMES } from '@porsche-design-system/assets';

const localhost = 'http://localhost:3001';

const transformIndexHtmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      const headPartials = [
        getInitialStyles({ prefix: ['', 'my-prefix'] }),
        getComponentChunkLinks({ components: [...COMPONENT_CHUNK_NAMES] }),
        getIconLinks({ icons: [...ICON_NAMES] }),
        getFontFaceStylesheet(),
        getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }),
        getMetaTagsAndIconLinks({ appTitle: 'Porsche Design System' }),
      ]
        .join('')
        .replace(/https:\/\/cdn\.ui\.porsche\.com?(?:\/porsche-design-system)?/g, localhost);

      const bodyPartials = [getLoaderScript()]
        .join('')
        .replace(/"https:\/\/cdn\.ui\.porsche\."\+\("cn"===window\[t\]\?"cn":"com"\)/g, `"${localhost}"`);

      return html.replace(/<\/head>/, `${headPartials}$&`).replace(/<\/body>/, `${bodyPartials}$&`);
    },
  };
};

export default defineConfig({
  base: '/',
  preview: {
    port: 8575,
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist/www',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [transformIndexHtmlPlugin()],
});
