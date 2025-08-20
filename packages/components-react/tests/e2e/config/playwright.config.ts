import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigE2E } from '@porsche-design-system/shared/testing';

export default defineConfig({
  ...playwrightConfigE2E,
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
    },
  ],
  webServer: {
    command: 'npm run start-app',
    port: 3000,
  },
});
