import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigVRT } from '@porsche-design-system/testing';
import type { TestOptions } from '@porsche-design-system/testing/playwright';
import { externalRequests } from '../../helpers/externalRequests';

export default defineConfig<TestOptions>({
  ...playwrightConfigVRT,
  use: {
    ...playwrightConfigVRT.use,
    externalRequests,
  },
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
    command: 'npm run start-app',
    port: 8080,
  },
});
