import { config } from '@porsche-design-system/shared/testing/playwright.vrt.config';
import { devices, defineConfig } from '@playwright/test';

export default defineConfig({
  ...config,
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
    port: 8080,
  },
});
