import {
  getComponentChunkLinks,
  getFontLinks,
  getIconLinks,
  getLoaderScript,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-vue/partials';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const REGEX_HEAD = /<\/head>/;
const REGEX_BODY = /<\/body>/;

const transformIndexHtmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      const headPartials = [
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
  plugins: [transformIndexHtmlPlugin(), vue()],
});
