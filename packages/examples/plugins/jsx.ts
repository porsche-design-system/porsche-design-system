import fs from 'node:fs';
import path from 'node:path';
import { styleText } from 'node:util';
// fast-glob is CommonJS, so it has to be imported as a default export from this ESM package.
import fastGlob from 'fast-glob';
import { createElement, type FunctionComponent } from 'preact';
import { render } from 'preact-render-to-string';
import prettier from 'prettier';
import type { Plugin } from 'vite';
import { linkStylesForDev } from './entries.ts';
import { categories, type PageLocation, resolvePageLocation } from './projects.ts';

/** Every page file default-exports a component that returns the complete `<html>` element. */
export type PageModule = { default: FunctionComponent };

/** Pages are the only `.tsx` files that are rendered; everything else is a layout, partial or helper. */
export const pageSuffix = '.page.tsx';

/**
 * Preact cannot render a doctype, and it is the same on every page, so it is prepended instead of being
 * expressed in JSX.
 */
export const doctype = '<!doctype html>';

const REGEX_SCRIPT_ELEMENT = /(<script\b[^>]*>[\s\S]*?<\/script>)/;
const REGEX_CLASS_ATTRIBUTE = /\sclass="([^"]*)"/g;

/**
 * Trims and collapses the whitespace of every `class` attribute, and drops one left empty.
 *
 * It is what lets a component write an optional class as a template literal – `` `p-static-xs ${scheme}` `` – without
 * a stray space in the markup when the class is not set; Prettier leaves attribute values as they are. The content of
 * `<script>` elements is not touched, since it is code rather than markup.
 */
export const normalizeClassAttributes = (html: string): string =>
  html
    .split(REGEX_SCRIPT_ELEMENT)
    .map((part, index) =>
      // `split()` with a capturing group puts the scripts at the odd indices.
      index % 2
        ? part
        : part.replace(REGEX_CLASS_ATTRIBUTE, (_match, value: string) => {
            const normalized = value.trim().split(/\s+/).join(' ');
            return normalized ? ` class="${normalized}"` : '';
          })
    )
    .join('');

/**
 * Renders a page component to a static HTML document.
 *
 * The renderer emits everything on a single line, but the generated pages are documentation, so they are formatted
 * afterwards. Prettier is used with the repository's `printWidth`, which keeps `dist/` readable and diffable.
 *
 * `htmlWhitespaceSensitivity: 'ignore'` is required: JSX drops the whitespace between elements that sit on separate
 * lines, so without it the formatter would have to keep inline elements glued together (`</label\n><input`).
 *
 * `embeddedLanguageFormatting: 'off'` keeps the `<Script>` elements as they are written: the formatter would otherwise
 * reprint them with its own defaults, and the build moves them into `main.js` verbatim – see `extractScripts()`.
 *
 * Class attributes are normalized first – see `normalizeClassAttributes()`.
 */
export const renderPage = async (Page: FunctionComponent): Promise<string> =>
  prettier.format(normalizeClassAttributes(`${doctype}${render(createElement(Page, {}))}`), {
    parser: 'html',
    printWidth: 120,
    htmlWhitespaceSensitivity: 'ignore',
    embeddedLanguageFormatting: 'off',
  });

/**
 * Every page of the source tree, in a stable order – found by its file name rather than listed anywhere, so a new
 * example is picked up by the dev server's URL list and by the Playwright suites without being registered.
 *
 * A `*.page.tsx` outside a category folder is not a page of any project and is skipped; `scripts/build.ts` rejects it.
 */
export const findPages = (srcDir: string): PageLocation[] =>
  fastGlob
    .sync(`**/*${pageSuffix}`, { cwd: srcDir, onlyFiles: true, ignore: ['**/_*/**'] })
    .sort()
    .flatMap((relativePath) => resolvePageLocation(relativePath) ?? []);

/**
 * Maps a request URL to a page file: `/templates/landing-page/` or `/templates/landing-page/index.html` →
 * `templates/landing-page/index.page.tsx`.
 * Returns `undefined` for anything that is not a page request, so assets fall through to Vite.
 */
export const resolvePagePath = (url: string): string | undefined => {
  const pathname = decodeURIComponent(url.split(/[?#]/)[0]);

  if (pathname.endsWith('/')) {
    return `${pathname.slice(1)}index${pageSuffix}`;
  }
  if (pathname.endsWith('.html')) {
    return `${pathname.slice(1, -'.html'.length)}${pageSuffix}`;
  }
  return undefined;
};

/**
 * Dev server counterpart of `scripts/build.ts`: renders pages on the fly through Vite's SSR module runner, so a
 * page and its partials are type-checked and transformed by the same pipeline the build uses.
 *
 * The page keeps its `<Script>` elements: Vite's own HTML hook turns every inline module script into a module it
 * serves and transforms, bare imports included, so no entry is generated here. Only the shared stylesheet is linked,
 * which the build imports from the entry instead – see `linkStylesForDev()`. The partials are injected afterwards, in
 * a `transformIndexHtml()` hook – see `vite.config.ts`.
 */
export const jsxPages = (): Plugin => {
  let rootDir = '';

  return {
    name: 'jsx-pages',
    enforce: 'pre',
    configResolved(config) {
      rootDir = config.root;
    },
    configureServer(server) {
      // Runs before Vite's internal middlewares, so page requests never reach the static file handler.
      server.middlewares.use(async (req, res, next) => {
        const relativePath = resolvePagePath(req.url ?? '/');
        if (!relativePath) {
          next();
          return;
        }

        const filePath = path.join(rootDir, relativePath);
        if (!fs.existsSync(filePath)) {
          next();
          return;
        }

        try {
          const pageModule = (await server.ssrLoadModule(filePath)) as PageModule;
          const page = linkStylesForDev(await renderPage(pageModule.default));
          const html = await server.transformIndexHtml(req.url ?? '/', page);
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
        } catch (error) {
          server.ssrFixStacktrace(error as Error);
          next(error);
        }
      });

      // There is no overview page: the URL of every page is listed below Vite's own when the server starts, and the
      // terminal makes them clickable. Pages added while it runs are served, but only listed after a restart.
      const printUrls = server.printUrls;
      server.printUrls = () => {
        printUrls();
        const origin = server.resolvedUrls?.local[0];
        if (!origin) {
          return;
        }
        const pages = findPages(rootDir);
        for (const { category } of categories) {
          server.config.logger.info(`\n  ${styleText('bold', category)}`);
          for (const page of pages.filter((location) => location.category === category)) {
            server.config.logger.info(
              `  ➜  ${styleText('cyan', new URL(`${category}/${page.pageDir}/`, origin).href)}`
            );
          }
        }
      };

      // Pages are rendered on the server, so they are not part of the client module graph and cannot hot-update.
      // Vite invalidates the SSR module on change; the browser just needs to ask for the page again.
      server.watcher.on('change', (file) => {
        if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          server.hot.send({ type: 'full-reload', path: '*' });
        }
      });
    },
  };
};
