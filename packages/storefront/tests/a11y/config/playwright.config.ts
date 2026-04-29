import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigA11y } from '@porsche-design-system/shared/testing';

export default defineConfig({
  ...playwrightConfigA11y,
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
    },
  ],
  webServer: {
    command: 'npm run start-app',
    port: 8080,
  },
});
