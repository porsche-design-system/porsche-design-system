import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigVRT } from '@porsche-design-system/shared/testing';

export default defineConfig({
  ...playwrightConfigVRT,
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
    command: 'npm run preview',
    port: 4173,
  },
});
