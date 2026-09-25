import type { Plugin, Rolldown } from 'vite';

/**
 * Inlines the one script entry and the one stylesheet Vite emits for a page into its HTML.
 *
 * Added by `scripts/buildSite.ts` only, never written into a generated `vite.config.ts`: the project "Open in
 * StackBlitz" hands over stays a plain Vite project, and only the file the storefront frames is self-contained.
 *
 * Deliberately narrow, which is why it is written here rather than taken from `vite-plugin-singlefile` (see the spike
 * in `STOREFRONT.md`): a page is exactly one HTML file, at most one script chunk and at most one stylesheet. A page
 * without behaviour has no chunk at all – its `main.js` only imports the stylesheet, and Vite drops the empty entry. An asset imported
 * from the page or a second chunk – a dynamic `import()` – is not inlined silently, it fails the build and names the
 * file, because an example that grows either has left the shape the storefront and StackBlitz rely on.
 */

type OutputAsset = Rolldown.OutputAsset;
type OutputChunk = Rolldown.OutputChunk;

const isHtml = (file: OutputAsset | OutputChunk): file is OutputAsset =>
  file.type === 'asset' && file.fileName.endsWith('.html');
const isCss = (file: OutputAsset | OutputChunk): file is OutputAsset =>
  file.type === 'asset' && file.fileName.endsWith('.css');
const isChunk = (file: OutputAsset | OutputChunk): file is OutputChunk => file.type === 'chunk';

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Keeps inlined code from ending its element early.
 *
 * The HTML parser ends a `<script>` at the first `</script`, and an `<!--` inside it switches into a state where
 * that closing tag is skipped, so both are escaped the way bundlers do it. A `</style` would end a `<style>` the same
 * way; CSS has no other use for that sequence.
 */
export const escapeInlineScript = (code: string): string => code.replace(/<(\/script|!--)/gi, '\\x3C$1');
export const escapeInlineStyle = (css: string): string => css.replace(/<\/style/gi, '<\\/style');

/**
 * Replaces the one tag of a given element that references a file, whatever the order of its attributes.
 *
 * Fails when there is not exactly one, so a change in the markup Vite emits breaks the build instead of shipping a
 * page that still points at a file nobody deploys.
 */
const replaceTag = (html: string, tagName: 'script' | 'link', fileName: string, replacement: string): string => {
  const attribute = tagName === 'script' ? 'src' : 'href';
  const closing = tagName === 'script' ? '\\s*</script>' : '';
  const pattern = new RegExp(
    `<${tagName}\\b[^>]*\\s${attribute}="[^"]*${escapeRegExp(fileName)}"[^>]*>${closing}`,
    'g'
  );
  const matches = html.match(pattern) ?? [];

  if (matches.length !== 1) {
    throw new Error(`[examples] expected exactly one <${tagName}> referencing "${fileName}", found ${matches.length}`);
  }

  return html.replace(pattern, () => replacement);
};

/** The inlining itself, on the bundle Vite is about to write – separate from the plugin so it can be tested. */
export const inlineBundle = (bundle: Rolldown.OutputBundle): void => {
  const files = Object.values(bundle);
  const pages = files.filter(isHtml);
  const chunks = files.filter(isChunk);
  const stylesheets = files.filter(isCss);
  const others = files.filter((file) => !isHtml(file) && !isChunk(file) && !isCss(file));

  if (pages.length !== 1 || chunks.length > 1 || stylesheets.length > 1 || others.length > 0) {
    throw new Error(
      `[examples] a page has to build to one HTML file, at most one script and at most one stylesheet, got: ${files
        .map(({ fileName }) => fileName)
        .join(', ')}`
    );
  }

  const [page] = pages;
  let html = String(page.source);

  for (const chunk of chunks) {
    html = replaceTag(
      html,
      'script',
      chunk.fileName,
      `<script type="module">${escapeInlineScript(chunk.code.trim())}</script>`
    );
    delete bundle[chunk.fileName];
  }

  for (const stylesheet of stylesheets) {
    html = replaceTag(
      html,
      'link',
      stylesheet.fileName,
      `<style>${escapeInlineStyle(String(stylesheet.source).trim())}</style>`
    );
    delete bundle[stylesheet.fileName];
  }

  page.source = html;
};

export const inlineEntries = (): Plugin => ({
  name: 'examples:inline-entries',
  apply: 'build',
  enforce: 'post',
  config: () => ({
    build: {
      // One entry per page, so there is nothing to preload – the polyfill would be dead code in every page.
      modulePreload: { polyfill: false },
      cssCodeSplit: false,
      // Nothing is turned into a data URL: an imported asset is an error in `inlineBundle()`, not a silent 800 kB.
      assetsInlineLimit: 0,
    },
  }),
  generateBundle(_options, bundle) {
    try {
      inlineBundle(bundle);
    } catch (error) {
      this.error((error as Error).message);
    }
  },
});
