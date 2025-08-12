import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigE2E } from '@porsche-design-system/shared/testing';

export default defineConfig({
  ...playwrightConfigE2E,
  testMatch: '**.smoke.ts',
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
    },
  ],
});
