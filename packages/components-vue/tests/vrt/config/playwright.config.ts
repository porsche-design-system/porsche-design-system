import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigVRT } from '@porsche-design-system/shared/testing';

export default defineConfig({
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
    command: 'yarn start-app',
    port: 5173,
  },
});
