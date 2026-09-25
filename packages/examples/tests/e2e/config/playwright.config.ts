import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigE2E } from '@porsche-design-system/shared/testing';
import { exampleWebServers } from '../../helpers/previewServers.ts';

/**
 * End-to-end tests of the examples.
 *
 * Like the other two suites they run against the **built** site (see
 * [`previewServers.ts`](../../helpers/previewServers.ts)), which matters more here than anywhere else: the behaviour
 * under test is the `main.js` the build *generates*, by inlining the shared snippets a page's markup asks for next to
 * the script authored beside it. Running against the source tree would exercise modules that no example ships.
 *
 * Chromium only. These are demos of behaviour wired on ids, not a browser compatibility matrix – the rendering
 * differences between engines are the VRT's job.
 */

export default defineConfig({
  ...playwrightConfigE2E,
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: 1,
      },
    },
  ],
  webServer: exampleWebServers,
});
