import { config } from '@porsche-design-system/shared/testing/playwright.vrt';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  ...config,
  snapshotPathTemplate: '{testDir}/../../../../components-js/tests/vrt/specs/__screenshots__/{arg}-{projectName}{ext}',
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
