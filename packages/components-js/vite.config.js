import { defineConfig } from 'vite';
import { resolve } from 'path';
import {
  getInitialStyles,
  getMetaTagsAndIconLinks,
  getComponentChunkLinks,
  getFontFaceStyles,
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
        // Icon links produce too many requests in flyout iframes page which leads to ERR_INSUFFICIENT_RESOURCES error
        // getIconLinks({ icons: [...ICON_NAMES] }),
        // '<link rel="stylesheet" href="http://localhost:3001/styles/font-face.css">',
        getFontFaceStyles().replace(/https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system/g, 'http://localhost:3001'),
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
