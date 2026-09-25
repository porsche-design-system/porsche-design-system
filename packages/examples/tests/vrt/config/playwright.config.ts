import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigVRT, viewportWidthM, viewportWidthXXS } from '@porsche-design-system/shared/testing';
import { exampleWebServers } from '../../helpers/previewServers.ts';

/**
 * Visual regression tests of the examples.
 *
 * They run against the **built** site, not against the dev server – see
 * [`previewServers.ts`](../../helpers/previewServers.ts) for the servers and why.
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
  webServer: exampleWebServers,
});
