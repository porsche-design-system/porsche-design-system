import { defineConfig, devices } from '@playwright/test';
import { config } from '@porsche-design-system/shared/testing/playwright.vrt';

export default defineConfig({
  ...config,
  use: {
    ...config.use,
    // disable JavaScript to simulate SSR behaviour
    javaScriptEnabled: false,
  },
  snapshotPathTemplate: '{testDir}/../../../../nextjs/tests/vrt/specs/__screenshots__/{arg}-{projectName}{ext}',
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
    port: 3000,
  },
});
