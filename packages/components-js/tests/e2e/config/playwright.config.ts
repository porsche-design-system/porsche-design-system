import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigE2E } from '@porsche-design-system/testing';
import type { TestOptions } from '@porsche-design-system/testing/playwright';

export default defineConfig<TestOptions>({
  ...playwrightConfigE2E,
  use: {
    ...playwrightConfigE2E.use,
    // setContentWithDesignSystem writes the demo app script with document.write
    expectedConsole: [/parser-blocking, cross site .* is invoked via document\.write/],
  },
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
    command: 'npm run start-app',
    port: 8575,
  },
});
