import {
  getComponentChunkLinks,
  getFontLinks,
  getIconLinks,
  getLoaderScript,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-js/partials';
import { appTitle, patternComponents, templateComponents } from './projects.ts';

const REGEX_HEAD = /<\/head>/;
const REGEX_BODY = /<\/body>/;

/**
 * The Porsche Design System partials, injected by the dev server only.
 *
 * The pages use web components, so without the loader script nothing upgrades – and `:not(:defined)` in
 * `src/style.css` would keep the whole page invisible. The **build** does not inject anything: its output is the
 * source of two Vite projects, whose generated `vite.config.ts` injects the very same partials when they are built.
 *
 * The dev server serves both categories at once, so it preloads the union of their component chunks.
 */
export const injectPartials = (html: string): string => {
  const headPartials = [
    getComponentChunkLinks({ components: [...new Set([...patternComponents, ...templateComponents])] }),
    getFontLinks(),
    getIconLinks(),
    getMetaTagsAndIconLinks({ appTitle }),
  ].join('');

  // Injected after the formatting pass of `renderPage()`, so the inline loader script stays byte for byte what the
  // partial emitted – reformatting it would invalidate its CSP hash.
  return html.replace(REGEX_HEAD, `${headPartials}$&`).replace(REGEX_BODY, `${getLoaderScript()}$&`);
};
