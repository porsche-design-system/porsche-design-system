import fs from 'node:fs';
import path from 'node:path';
import { createElement, type FunctionComponent } from 'preact';
import { render } from 'preact-render-to-string';
import prettier from 'prettier';
import type { Plugin } from 'vite';

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
 * Dev server counterpart of `scripts/build.ts`: renders pages on the fly through Vite's SSR module runner, so a
 * page and its partials are type-checked and transformed by the same pipeline the build uses.
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
          const html = await server.transformIndexHtml(req.url ?? '/', await renderPage(pageModule.default));
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
