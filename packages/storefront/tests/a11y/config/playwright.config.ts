import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigA11y } from '@porsche-design-system/testing';
import type { TestOptions } from '@porsche-design-system/testing/playwright';
import { externalRequests } from '../../helpers/externalRequests';

export default defineConfig<TestOptions>({
  ...playwrightConfigA11y,
  use: {
    ...playwrightConfigA11y.use,
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
