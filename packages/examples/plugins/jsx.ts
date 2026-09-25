import fs from 'node:fs';
import path from 'node:path';
import { createElement, type FunctionComponent } from 'preact';
import { render } from 'preact-render-to-string';
import prettier from 'prettier';
import type { Plugin } from 'vite';
import { getSharedScripts, rewriteEntriesForDev, scriptEntryTag } from './entries.ts';
import { scriptEntryName } from './projects.ts';

/** Every page file default-exports a component that returns the complete `<html>` element. */
export type PageModule = { default: FunctionComponent };

/** Pages are the only `.tsx` files that are rendered; everything else is a layout, partial or helper. */
export const pageSuffix = '.page.tsx';

/**
 * Preact cannot render a doctype, and it is the same on every page, so it is prepended instead of being
 * expressed in JSX.
 */
export const doctype = '<!doctype html>';

/**
 * Renders a page component to a static HTML document.
 *
 * The renderer emits everything on a single line, but the generated pages are documentation, so they are formatted
 * afterwards. Prettier is used with the repository's `printWidth`, which keeps `dist/` readable and diffable.
 *
 * `htmlWhitespaceSensitivity: 'ignore'` is required: JSX drops the whitespace between elements that sit on separate
 * lines, so without it the formatter would have to keep inline elements glued together (`</label\n><input`).
 */
export const renderPage = async (Page: FunctionComponent): Promise<string> =>
  prettier.format(`${doctype}${render(createElement(Page, {}))}`, {
    parser: 'html',
    printWidth: 120,
    htmlWhitespaceSensitivity: 'ignore',
  });

/**
 * Files and folders starting with an underscore (layouts, partials, data) are inputs only, never pages.
 *
 * Named after the underscore convention rather than after "templates", which is a category of examples here
 * (`src/templates/`) and has nothing to do with build-time inputs.
 */
export const isBuildInput = (rootDir: string, filePath: string): boolean =>
  path
    .relative(rootDir, filePath)
    .split(path.sep)
    .some((segment) => segment.startsWith('_'));

/**
 * Maps a request URL to a page file: `/` → `index.page.tsx`, `/patterns/` → `patterns/index.page.tsx`,
 * `/templates/landing-page/index.html` → `templates/landing-page/index.page.tsx`.
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
 * A rendered page, prepared for the dev server: the generated entry tag replaced by what the source tree can serve.
 *
 * The counterpart of the entry generation in `scripts/build.ts`, applied to the same markup the build writes, so the
 * page a browser gets in dev differs from the emitted one in exactly this tag and in the CDN origin. A page missing
 * the tag is only a warning here, where it is an error in the build: the dev server has to keep serving the page so
 * the layout can be fixed with it open.
 */
const renderForDev = (html: string, pageFilePath: string): string => {
  if (!html.includes(scriptEntryTag)) {
    console.warn(
      `[examples] "${path.relative(process.cwd(), pageFilePath)}" does not reference its entry – is it using one of the layouts?`
    );
  }

  return rewriteEntriesForDev(html, {
    hasBehaviour: fs.existsSync(path.join(path.dirname(pageFilePath), scriptEntryName)),
    sharedScripts: getSharedScripts(html),
  });
};

/**
 * Dev server counterpart of `scripts/build.ts`: renders pages on the fly through Vite's SSR module runner, so a
 * page and its partials are type-checked and transformed by the same pipeline the build uses.
 *
 * The rendered markup is passed through `renderForDev()` **before** `server.transformIndexHtml()`, because Vite's own
 * HTML hook resolves and warms up every `<script src>` it finds, and it runs ahead of the plugin hooks that could
 * rewrite it (`createDevHtmlTransformFn()` places `devHtmlHook` between the `pre` and the `normal` hooks). The
 * generated `main.js` exists in the built projects only, so a page still carrying that tag makes Vite log
 * "Failed to load url /main.js" – the rewrite has to happen before Vite ever sees the HTML. The partials are injected
 * afterwards, in a `transformIndexHtml()` hook – see `vite.config.ts`.
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
          const page = renderForDev(await renderPage(pageModule.default), filePath);
          const html = await server.transformIndexHtml(req.url ?? '/', page);
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
        } catch (error) {
          server.ssrFixStacktrace(error as Error);
          next(error);
        }
      });

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
