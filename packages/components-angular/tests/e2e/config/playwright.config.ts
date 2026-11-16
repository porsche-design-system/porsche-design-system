import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigE2E } from '@porsche-design-system/testing';
import type { TestOptions } from '@porsche-design-system/testing/playwright';

export default defineConfig<TestOptions>({
  ...playwrightConfigE2E,
  use: {
    ...playwrightConfigE2E.use,
    // scripts/injectPartials.js preloads three font files, a slow page warns about the ones it does not use
    expectedConsole: [/was preloaded using link preload but not used within a few seconds/],
  },
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
    },
  ],
  webServer: {
    command: 'npm run start-app',
    port: 4200,
  },
});
