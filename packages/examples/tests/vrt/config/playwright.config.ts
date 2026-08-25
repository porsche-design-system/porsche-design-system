import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigVRT, viewportWidthM, viewportWidthXXS } from '@porsche-design-system/shared/testing';
import { projects as exampleProjects } from '../../../plugins/projects.ts';

/**
 * Visual regression tests of the examples.
 *
 * They run against the **built** projects, not against the dev server: `dist/` is source, and what the examples
 * repository ships is the result of building it. The web servers below are therefore the same `vite build` +
 * `vite preview` that `npm run preview:examples/*` runs, so the bundled entries, the injected Porsche Design System
 * partials and the copied stylesheet are part of what is screenshotted. `serve-cdn` provides the locally built
 * components, which the preview rewrites the production CDN URLs to.
 *
 * The two Playwright projects are named after their browser, like everywhere else in the monorepo – the shared
 * `prepare-vrt-snapshots` tooling derives the file names of the regression artifacts from exactly these names. They
 * are one engine × viewport pairing each:
 *
 * | project  | engine   | viewport | captures                                        |
 * | -------- | -------- | -------- | ----------------------------------------------- |
 * | `chrome` | chromium | 1000 (M) | light, dark, hcm light/dark, font-size 200%, rtl |
 * | `safari` | webkit   | 320 (XXS)| light                                           |
 *
 * The extended captures are chromium-only on purpose: scaling the page font size and forcing colors go through CDP,
 * and a second engine would double the baselines without covering a second pattern. The mobile project is the narrow
 * end of the responsive behaviour the examples demonstrate, which is where their layout actually changes.
 */

const packageDir = path.resolve(import.meta.dirname, '../../..');

/** One preview server per category, each serving the built project of that category on its own port. */
const previewServers = exampleProjects.map(({ category, previewPort }) => ({
  command: `npm run preview:${category}:app`,
  port: previewPort,
  cwd: packageDir,
  // Each server builds its project first, which is a full `vite build` – well beyond Playwright's default timeout.
  timeout: 300_000,
  reuseExistingServer: !process.env.CI,
  stdout: 'pipe' as const,
}));

export default defineConfig({
  ...playwrightConfigVRT,
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: 1,
      },
      metadata: { viewportWidth: viewportWidthM },
    },
    {
      name: 'safari',
      use: {
        ...devices['Desktop Safari'],
        deviceScaleFactor: 1,
      },
      metadata: { viewportWidth: viewportWidthXXS },
    },
  ],
  webServer: [
    {
      // Serves the locally built components; keeps running when the port is already taken, so a dev session next to
      // the test run is not a conflict.
      command: 'serve-cdn',
      port: 3001,
      cwd: packageDir,
      reuseExistingServer: true,
    },
    ...previewServers,
  ],
});
