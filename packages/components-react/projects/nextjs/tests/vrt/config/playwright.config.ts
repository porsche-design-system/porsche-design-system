import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigVRT } from '@porsche-design-system/testing';
import type { TestOptions } from '@porsche-design-system/testing/playwright';

export default defineConfig<TestOptions>({
  ...playwrightConfigVRT,
  use: {
    ...playwrightConfigVRT.use,
    // disable JavaScript to simulate SSR behaviour
    javaScriptEnabled: false,
    // the overview and modal pages leave fonts from HeaderPartials unused for a few seconds
    expectedConsole: [/\/fonts\/porsche-next-latin-[\w-]+\.\w+\.woff2 was preloaded using link preload but not used/],
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
    port: 3000,
  },
});
