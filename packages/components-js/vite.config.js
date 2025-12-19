import { resolve } from 'path';
import {
  getComponentChunkLinks,
  getFontLinks,
  getLoaderScript,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-js/partials';
import { defineConfig } from 'vite';
import { COMPONENT_CHUNK_NAMES } from './projects/components-wrapper';

const localhost = 'http://localhost:3001';

const transformIndexHtmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      const headPartials = [
        getComponentChunkLinks({ components: [...COMPONENT_CHUNK_NAMES] }),
        // Icon links produce too many requests in flyout iframes page which leads to ERR_INSUFFICIENT_RESOURCES error
        // getIconLinks({ icons: [...ICON_NAMES] }),
        // '<link rel="stylesheet" href="http://localhost:3001/styles/font-face.css">',
        getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }),
        getMetaTagsAndIconLinks({ appTitle: 'Porsche Design System' }),
      ]
        .join('')
        .replace(/https:\/\/cdn\.ui\.porsche\.com?(?:\/porsche-design-system)?/g, localhost);

      const bodyPartials = [getLoaderScript({ prefix: ['', 'my-prefix'] })]
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
    outDir: 'dist/demo-app',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [transformIndexHtmlPlugin()],
});
