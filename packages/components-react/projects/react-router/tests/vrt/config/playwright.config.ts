import { defineConfig, devices } from '@playwright/test';
import { config } from '@porsche-design-system/shared';

export default defineConfig({
  ...config,
  use: {
    ...config.use,
    // disable JavaScript to simulate SSR behaviour
    javaScriptEnabled: false,
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
    command: 'yarn start-app',
    port: 3000,
  },
});
