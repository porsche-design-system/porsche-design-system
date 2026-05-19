import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigE2E } from '@porsche-design-system/shared/testing';

const realChromeUserAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36';
const realChromeSecChUa = '"Google Chrome";v="147", "Chromium";v="147", "Not.A/Brand";v="8"';

export default defineConfig({
  ...playwrightConfigE2E,
  testMatch: '**.smoke.ts',
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        userAgent: realChromeUserAgent,
        extraHTTPHeaders: {
          'sec-ch-ua': realChromeSecChUa,
        },
      },
    },
  ],
});
