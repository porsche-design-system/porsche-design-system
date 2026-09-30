import fs from 'node:fs';
import path from 'node:path';
import { build } from 'vite';
import { inlineEntries } from '../plugins/inline.ts';
import { getStackblitzPayload } from '../plugins/payload.ts';
import { payloadName } from '../plugins/projects.ts';
import {
  copyDir,
  distDir,
  listFiles,
  listProjects,
  mediaSourceDir,
  packageDir,
  siteDir,
  siteMediaDir,
  writeFile,
} from './shared.ts';

/**
 * Builds every generated project into the page the storefront frames.
 *
 * `dist/patterns/header/overlay/` – the Vite project of that page – is built with **its own** `vite.config.ts`, the
 * same build StackBlitz runs, plus the one thing only this build adds: `plugins/inline.ts`, which puts the bundled
 * script and stylesheet into the HTML. The result is a single self-contained file per page:
 *
 * ```text
 * dist-site/
 * ├── media/                        # public/examples/media/, copied once
 * └── patterns/header/overlay/
 *     ├── index.html                # CSS and JS inline; only the PDS CDN and the media stay external
 *     └── stackblitz.json           # the generated project of the page, verbatim
 * ```
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

    const files = Object.fromEntries(
      listFiles(projectDir).map((file) => [file, fs.readFileSync(path.join(projectDir, file), 'utf8')])
    );
    writeFile(path.join(outDir, payloadName), JSON.stringify(getStackblitzPayload(files), null, 2));

    console.log(`✓ ${location.category}/${location.pageDir}`);
  }

  copyDir(mediaSourceDir, siteMediaDir);

  console.log(`\nBuilt ${locations.length} page(s) → ${path.relative(packageDir, siteDir)}`);
};

await buildSite();
