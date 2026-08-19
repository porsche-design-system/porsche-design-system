import fs from 'node:fs';
import path from 'node:path';
// fast-glob is CommonJS, so it has to be imported as a default export from this ESM package.
import fastGlob from 'fast-glob';
import { preview } from 'vite';
import { rewriteCdnUrlsForDev } from '../plugins/partials.ts';
import { getProject, projects } from '../plugins/projects.ts';
import { buildGeneratedProject, scratchDir } from './buildGeneratedProject.ts';

/**
 * Builds one generated project and serves the result against the local CDN.
 *
 * `npm run dev` serves the **source** tree, where the pages are rendered per request and the partials are injected by
 * `vite.config.ts` of this package. This is the other end: `dist/<category>` is built with its own generated config –
 * the same build `npm run build:verify` runs – and the built site is served, so what the browser gets is bundled
 * JavaScript, hashed assets and the partials as they will ship.
 *
 * The one thing that is not shipped as built is the CDN origin: the partials emit production URLs, so the emitted
 * HTML is rewritten to `http://localhost:3001`, where `serve-cdn` serves the locally built components. Only the
 * throwaway copy in `dist-tmp/` is touched – `dist/`, the source handed to the examples repository, keeps the
 * production URLs.
 */

/** Points the built pages at `serve-cdn`, mirroring the rewrite the dev server does per request. */
const rewriteCdnUrls = (outDir: string): number => {
  const htmlFiles = fastGlob.sync('**/*.html', { cwd: outDir, onlyFiles: true });

  for (const relativePath of htmlFiles) {
    const filePath = path.join(outDir, relativePath);
    fs.writeFileSync(filePath, rewriteCdnUrlsForDev(fs.readFileSync(filePath, 'utf8')));
  }

  return htmlFiles.length;
};

const previewProject = async (): Promise<void> => {
  const category = process.argv[2];
  const project = category ? getProject(category) : undefined;

  if (!project) {
    throw new Error(
      `[examples] unknown category "${category}" – expected one of: ${projects.map(({ category: c }) => c).join(', ')}`
    );
  }

  const outDir = buildGeneratedProject(project);
  const pageCount = rewriteCdnUrls(outDir);

  console.log(`\n▸ ${pageCount} page(s) rewritten to the local CDN on http://localhost:3001`);

  // Static output, so the generated config has nothing left to contribute: `configFile: false` keeps its `root: 'src'`
  // from being resolved against this package. Vite preview serves `<root>/<outDir>`, and the two must not be the same
  // directory, so the scratch directory is the root and the category is the output below it. `appType: 'mpa'` because
  // these are many pages, not one app shell that everything unknown should fall back to.
  const server = await preview({
    configFile: false,
    root: scratchDir,
    appType: 'mpa',
    build: { outDir: project.category },
    preview: {
      port: project.previewPort,
      open: '/',
    },
  });

  server.printUrls();
};

await previewProject();
