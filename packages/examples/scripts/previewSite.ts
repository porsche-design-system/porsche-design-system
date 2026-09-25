import fs from 'node:fs';
import path from 'node:path';
import { preview } from 'vite';
import { rewriteCdnUrlsForDev } from '../plugins/partials.ts';
import { previewPort } from '../plugins/projects.ts';
import { examplesPath } from '../src/_media.ts';
import { copyDir, listFiles, listProjects, packageDir, scratchDir, siteDir } from './shared.ts';

/**
 * Serves the built site the way the storefront does, against the local CDN.
 *
 * `npm run dev` serves the **source** tree, where the pages are rendered per request. This is the other end:
 * `dist-site/` – the self-contained pages `scripts/buildSite.ts` built from their generated projects – served below
 * `/examples/`, like a storefront without a basePath serves `public/examples/`. So the media resolve exactly as they do
 * there, and what the browser gets is what the storefront ships.
 *
 * The one thing that is not served as built is the CDN origin: the partials emit production URLs, so the HTML is
 * rewritten to `http://localhost:3001`, where `serve-cdn` serves the locally built components. Only the copy in
 * `dist-tmp/` is touched – `dist-site/` keeps the production URLs the storefront deploys.
 *
 * The Playwright suites of this package use this script as their web server, which is why the port must not silently
 * move – hence `strictPort`.
 */

const previewSite = async (): Promise<void> => {
  if (!fs.existsSync(siteDir)) {
    throw new Error('[examples] "dist-site" is missing – run `npm run build` first');
  }

  const servedDir = path.join(scratchDir, examplesPath);

  fs.rmSync(scratchDir, { recursive: true, force: true });
  copyDir(siteDir, servedDir);

  for (const file of listFiles(servedDir).filter((name) => name.endsWith('.html'))) {
    const filePath = path.join(servedDir, file);
    fs.writeFileSync(filePath, rewriteCdnUrlsForDev(fs.readFileSync(filePath, 'utf8')));
  }

  // Static output, so there is no config to load: `configFile: false` keeps the dev server config of this package out
  // of it. Vite preview serves `<root>/<outDir>` at `/`, and the two must not be the same directory, so the package is
  // the root and `dist-tmp/` the output below it. `appType: 'mpa'` because these are many pages, not one app shell
  // that everything unknown should fall back to.
  const server = await preview({
    configFile: false,
    root: packageDir,
    appType: 'mpa',
    build: { outDir: path.relative(packageDir, scratchDir) },
    preview: { port: previewPort, strictPort: true },
  });

  const origin = `http://localhost:${previewPort}`;
  const locations = listProjects();

  console.log(`\n▸ ${locations.length} page(s), served against the local CDN on http://localhost:3001\n`);
  for (const { category, pageDir } of locations) {
    console.log(`  ${origin}${examplesPath}${category}/${pageDir}/`);
  }
  server.printUrls();
};

await previewSite();
