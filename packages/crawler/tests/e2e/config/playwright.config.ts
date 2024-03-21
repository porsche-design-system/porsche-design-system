import { config } from '@porsche-design-system/shared/testing/playwright.e2e';
import { devices, defineConfig } from '@playwright/test';

export default defineConfig({
  ...config,
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
    },
  ],
  webServer: {
    command: 'yarn start-app',
    port: 3001,
  },
});
