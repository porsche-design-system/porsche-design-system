import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: '../specs',
  testMatch: '**.e2e.ts',
  /* Maximum time one test can run for. */
  timeout: 9 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
    toMatchSnapshot: {
      maxDiffPixelRatio: 0,
      maxDiffPixels: 0,
      threshold: 0,
    },
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off', // 'on-first-retry' causes CI job to get stuck
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'desktop chrome',
      use: devices['Desktop Chrome'],
    },
    {
      name: 'desktop safari',
      use: devices['Desktop Safari'],
      // use: { ...devices['Desktop Safari'], headless: false },
    },
    {
      name: 'desktop firefox',
      use: devices['Desktop Firefox'],
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: '../results',

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'yarn start-app',
    port: 8575,
  },
};

export default config;
