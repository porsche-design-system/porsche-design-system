import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigE2E } from '@porsche-design-system/shared/testing';

export default defineConfig({
  ...playwrightConfigE2E,
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
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
