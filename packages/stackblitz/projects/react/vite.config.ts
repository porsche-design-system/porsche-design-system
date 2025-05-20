import {
  getComponentChunkLinks,
  getFontFaceStyles,
  getFontLinks,
  getIconLinks,
  getInitialStyles,
  getLoaderScript,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-js/partials';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const REGEX_HEAD = /<\/head>/;
const REGEX_BODY = /<\/body>/;

const transformIndexHtmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      const headPartials = [
        getInitialStyles(),
        getFontFaceStyles(),
        getFontLinks(),
        getComponentChunkLinks(),
        getIconLinks(),
        getMetaTagsAndIconLinks({ appTitle: 'Example' }),
      ].join('');

      const bodyPartials = [getLoaderScript()].join('');

      return html.replace(REGEX_HEAD, `${headPartials}$&`).replace(REGEX_BODY, `${bodyPartials}$&`);
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [transformIndexHtmlPlugin(), react()],
});
