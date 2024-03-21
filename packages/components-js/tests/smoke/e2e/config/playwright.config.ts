import { config } from '@porsche-design-system/shared/testing/playwright.e2e';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  ...config,
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
    },
  ],
});
