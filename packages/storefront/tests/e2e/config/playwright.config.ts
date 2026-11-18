import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigE2E } from '@porsche-design-system/testing';
import type { TestOptions } from '@porsche-design-system/testing/playwright';
import { externalRequests } from '../../helpers/externalRequests';

export default defineConfig<TestOptions>({
  ...playwrightConfigE2E,
  use: {
    ...playwrightConfigE2E.use,
    externalRequests,
  },
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
