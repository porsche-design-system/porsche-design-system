import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigVRT } from '@porsche-design-system/shared/testing';

export default defineConfig({
  ...playwrightConfigVRT,
  use: {
    ...playwrightConfigVRT.use,
    // disable JavaScript to simulate SSR behaviour
    javaScriptEnabled: false,
  },
  snapshotPathTemplate: '{testDir}/../../../../nextjs/tests/vrt/specs/__screenshots__/{arg}-{projectName}{ext}',
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
    port: 3000,
  },
});
