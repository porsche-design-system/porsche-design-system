import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigVRT } from '@porsche-design-system/testing';
import type { TestOptions } from '@porsche-design-system/testing/playwright';

export default defineConfig<TestOptions>({
  ...playwrightConfigVRT,
  use: {
    ...playwrightConfigVRT.use,
    externalRequests: { allowedOrigins: ['https://nav.porsche.com'] },
    // vite.config.js preloads every chunk, a slow page warns about the chunks it does not use
    expectedConsole: [/was preloaded using link preload but not used within a few seconds/],
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: 1,
      },
    },
    {
      name: 'safari',
      use: {
        ...devices['Desktop Safari'],
        deviceScaleFactor: 1,
      },
    },
  ],
  webServer: {
    command: 'npm run start-app',
    port: 8575,
  },
});
