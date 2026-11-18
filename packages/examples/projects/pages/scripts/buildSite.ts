import fs from 'node:fs';
import path from 'node:path';
import { build } from 'vite';
import { inlineEntries } from '../lib/inline.ts';
import { copyDir, distDir, listProjects, mediaSourceDir, packageDir, siteDir, siteMediaDir } from '../lib/shared.ts';

/**
 * Builds every generated project into the page the storefront frames.
 *
 * `dist/patterns/header/overlay/` – the Vite project of that page – is built with **its own** `vite.config.ts`, the
 * same build StackBlitz runs, plus the one thing only this build adds: `lib/inline.ts`, which puts the bundled
 * script and stylesheet into the HTML. The result is a single self-contained file per page:
 *
 * ```text
 * dist-site/
 * ├── media/                        # public/examples/media/, copied once
 * └── patterns/header/overlay/
 *     └── index.html                # CSS and JS inline; only the PDS CDN and the media stay external
 * ```
 *
 * The project itself – what StackBlitz opens and the storefront shows as code – is not part of it: the storefront
 * imports it from the package export in `dist/`.
 *
 * The storefront copies this folder to `public/examples/`, so every path inside it is either free of the storefront
 * slug (`/examples/media/…`) or points at the CDN – one build is deployed under several slugs.
 */

const buildSite = async (): Promise<void> => {
  const locations = listProjects();

  if (locations.length === 0) {
    throw new Error('[examples] "dist" holds no generated project – run scripts/build.ts first');
  }

  fs.rmSync(siteDir, { recursive: true, force: true });

  for (const location of locations) {
    const projectDir = path.join(distDir, location.category, location.pageDir);
    const outDir = path.join(siteDir, location.category, location.pageDir);

    await build({
      root: projectDir,
      configFile: path.join(projectDir, 'vite.config.ts'),
      logLevel: 'warn',
      plugins: [inlineEntries()],
      // No two pages share an output folder – `build.ts` rejects nested pages – so there is nothing to empty.
      build: { outDir, emptyOutDir: false },
    });

    console.log(`✓ ${location.category}/${location.pageDir}`);
  }

  copyDir(mediaSourceDir, siteMediaDir);

  console.log(`\nBuilt ${locations.length} page(s) → ${path.relative(packageDir, siteDir)}`);
};

await buildSite();
