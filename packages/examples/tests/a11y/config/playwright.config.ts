import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigA11y } from '@porsche-design-system/shared/testing';
import { exampleWebServers } from '../../helpers/previewServers.ts';

/**
 * Accessibility tests of the examples.
 *
 * Like the VRT, they run against the **built** projects (see
 * [`previewServers.ts`](../../helpers/previewServers.ts)), so what is scanned is the page a consumer gets: the
 * bundled entry, the injected Porsche Design System partials and the upgraded components from the local CDN.
 *
 * Chromium only. Axe evaluates the accessibility tree the browser computes, and running the same rule set against a
 * second engine measures the engine rather than the examples – the monorepo's own component suites are chromium only
 * for the same reason. The responsive and cross-engine coverage lives in the VRT.
 */

export default defineConfig({
  ...playwrightConfigA11y,
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
