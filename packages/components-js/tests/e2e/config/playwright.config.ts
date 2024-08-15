import { config } from '@porsche-design-system/shared/testing/playwright.e2e';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  ...config,
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome', // test against branded Chromium, Google Chrome (https://playwright.dev/docs/browsers#google-chrome--microsoft-edge)
      },
    },
    {
      name: 'safari',
      use: devices['Desktop Safari'],
    },
    {
      name: 'firefox',
      use: devices['Desktop Firefox'],
    },
  ],
  webServer: {
    command: 'yarn start-app',
    port: 8575,
  },
});
