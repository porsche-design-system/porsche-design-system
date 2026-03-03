import {
  getComponentChunkLinks,
  getFontLinks,
  getIconLinks,
  getLoaderScript,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-js/partials';
import { defineConfig } from 'vite';

const REGEX_HEAD = /<\/head>/;
const REGEX_BODY = /<\/body>/;

const transformIndexHtmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      const headPartials = [
        getFontLinks(),
        getComponentChunkLinks(),
        getIconLinks(),
        getMetaTagsAndIconLinks({ appTitle: 'Example' }),
      ].join('');

      const bodyPartials = [getLoaderScript(), `<script type="module" src="/src/main.js"></script>`].join('');

      return html.replace(REGEX_HEAD, `${headPartials}$&`).replace(REGEX_BODY, `${bodyPartials}$&`);
    },
  };
};

export default defineConfig({
  plugins: [transformIndexHtmlPlugin()],
});
