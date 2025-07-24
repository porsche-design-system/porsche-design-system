import { playwrightConfigE2E } from '@porsche-design-system/shared';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  ...playwrightConfigE2E,
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
    },
  ],
  webServer: {
    command: 'yarn start-app',
    port: 3000,
  },
});
