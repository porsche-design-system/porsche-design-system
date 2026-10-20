import fs from 'node:fs';
import path from 'node:path';
import fastGlob from 'fast-glob';
import { type Plugin, preview } from 'vite';
import { rewriteCdnUrlsForDev } from '../lib/partials.ts';
import { categories, examplesPath, previewPort } from '../lib/projects.ts';
import { packageDir, siteDir } from '../lib/shared.ts';

/**
 * Serves the built site the way the storefront does, against the local CDN.
 *
 * `npm start` serves the **source** tree, where the pages are rendered per request. This is the other end:
 * `dist-site/` – the self-contained pages `scripts/buildSite.ts` built from their generated projects – served below
 * `/examples/`, like a storefront without a basePath serves `public/examples/`. So the media resolve exactly as they do
 * there, and what the browser gets is what the storefront ships.
 *
 * The one thing that is not served as built is the CDN origin: the partials emit production URLs, so every HTML
 * response is rewritten to `http://localhost:3001`, where `serve-cdn` serves the locally built components, fonts and
 * icons. The rewrite happens per response, in memory – `dist-site/` keeps the production URLs the storefront deploys.
 *
 * The Playwright suites of this package use this script as their web server, which is why the port must not silently
 * move – hence `strictPort`.
 */

/** Answers every page of `dist-site/` itself, with the CDN origin rewritten; everything else is left to Vite. */
const localCdnHtml = (): Plugin => ({
  name: 'examples-preview-local-cdn',
  configurePreviewServer(server) {
    // Registered before Vite's own middlewares, so `req.url` still carries the base.
    server.middlewares.use((req, res, next) => {
      const { pathname } = new URL(req.url ?? '/', 'http://localhost');
      if (!pathname.startsWith(examplesPath)) {
        next();
        return;
      }

      const relativePath = decodeURIComponent(pathname.slice(examplesPath.length));
      const filePath = path.resolve(siteDir, relativePath.endsWith('/') ? `${relativePath}index.html` : relativePath);

      if (!filePath.startsWith(`${siteDir}${path.sep}`) || !filePath.endsWith('.html') || !fs.existsSync(filePath)) {
        next();
        return;
      }

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(rewriteCdnUrlsForDev(fs.readFileSync(filePath, 'utf8')));
    });
  },
});

const previewSite = async (): Promise<void> => {
  if (!fs.existsSync(siteDir)) {
    throw new Error('[examples] "dist-site" is missing – run `npm run build` first');
  }

  // Static output, so there is no config to load: `configFile: false` keeps the dev server config of this package out
  // of it. Vite preview serves `<outDir>` at `<base>`, and the two must not be the same directory as the root, so the
  // package is the root and `dist-site/` the output below it. `appType: 'mpa'` because these are many pages, not one
  // app shell that everything unknown should fall back to.
  const server = await preview({
    configFile: false,
    root: packageDir,
    base: examplesPath,
    appType: 'mpa',
    plugins: [localCdnHtml()],
    build: { outDir: path.relative(packageDir, siteDir) },
    preview: { port: previewPort, strictPort: true },
  });

  // Listed from `dist-site/`, not from the projects in `dist/`: CI restores only `dist-site/` from the build artifact.
  const pages = categories.flatMap(({ category }) =>
    fastGlob
      .sync('**/index.html', { cwd: path.join(siteDir, category) })
      .sort()
      .map((file) => `${category}/${path.dirname(file)}/`)
  );

  console.log(`\n▸ ${pages.length} page(s), served against the local CDN on http://localhost:3001\n`);
  for (const page of pages) {
    console.log(`  http://localhost:${previewPort}${examplesPath}${page}`);
  }
  server.printUrls();
};

await previewSite();
