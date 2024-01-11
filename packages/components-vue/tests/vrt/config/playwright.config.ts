import { config } from '@porsche-design-system/shared/testing/playwright.vrt.config';
import { devices, defineConfig } from '@playwright/test';

export default defineConfig({
  ...config,
  snapshotPathTemplate:
    '{testDir}/../../../../components-js/tests/vrt/playwright/specs/__screenshots__/{arg}-{projectName}{ext}',
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off', // 'on-first-retry' causes CI job to get stuck
    viewport: null,
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: 1,
      },
    },
  ],
  webServer: {
    command: 'yarn start-app',
    port: 5173,
  },
});
