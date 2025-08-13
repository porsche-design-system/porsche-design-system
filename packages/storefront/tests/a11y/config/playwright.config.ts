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
    command: 'yarn start-app',
    port: 8080,
  },
});
