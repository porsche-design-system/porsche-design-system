import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigA11y } from '@porsche-design-system/testing';
import type { TestOptions } from '@porsche-design-system/testing/playwright';

export default defineConfig<TestOptions>({
  ...playwrightConfigA11y,
  use: {
    ...playwrightConfigA11y.use,
    externalRequests: { allowedOrigins: ['https://nav.porsche.com'] },
    // vite.config.js preloads every chunk, a slow page warns about the chunks it does not use
    expectedConsole: [/was preloaded using link preload but not used within a few seconds/],
  },
  expect: {
    toMatchAriaSnapshot: {
      pathTemplate: '{testDir}/a11ytree/__snapshots__/{arg}{ext}',
    },
  },
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
    },
  ],
  webServer: {
    command: 'npm run start-app',
    port: 8575,
  },
});
