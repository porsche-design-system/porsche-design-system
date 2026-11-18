import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigVRT } from '@porsche-design-system/testing';
import type { TestOptions } from '@porsche-design-system/testing/playwright';

export default defineConfig<TestOptions>({
  ...playwrightConfigVRT,
  snapshotPathTemplate: '{testDir}/../../../../components-js/tests/vrt/specs/__screenshots__/{arg}-{projectName}{ext}',
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
    port: 5173,
  },
});
