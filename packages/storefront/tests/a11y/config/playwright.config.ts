import { defineConfig, devices } from '@playwright/test';
import { config } from '@porsche-design-system/shared/testing/playwright.a11y';

export default defineConfig({
  ...config,
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
    },
  ],
  webServer: {
    command: 'yarn dev', // TODO: Use start-app, problem is next build does not work with NODE_ENV=development
    port: 3000,
  },
});
