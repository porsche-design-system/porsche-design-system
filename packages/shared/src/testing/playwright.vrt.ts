import { type Config } from '@playwright/test';

export const themes = ['light', 'dark'] as const;
export const schemes = ['light', 'dark'] as const;

export const viewportWidthXXS = 320;
export const viewportWidthXS = 480;
export const viewportWidthS = 760;
export const viewportWidthM = 1000;
export const viewportWidthL = 1300;
export const viewportWidthXL = 1760;
export const viewportWidthXXL = 1920;
export const viewportWidth3XL = 2560;
export const viewportWidth4XL = 3000;
export const viewportWidths = [
  viewportWidthXXS,
  viewportWidthXS,
  viewportWidthS,
  viewportWidthM,
  viewportWidthL,
  viewportWidthXL,
] as const;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const playwrightConfigVRT: Config = {
  testDir: '../specs',
  testMatch: '**.vrt.ts',
  /* Maximum time one test can run for. */
  timeout: 120000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 120000,
  },
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}-{projectName}{ext}',
  use: {
    ...(process.env.CI
      ? {
          toHaveScreenshot: {
            animations: 'disabled',
          },
        }
      : {
          toMatchSnapshot: {
            maxDiffPixelRatio: 0,
            maxDiffPixels: 0,
            threshold: 0, // default Playwright threshold
          },
          toHaveScreenshot: {
            maxDiffPixelRatio: 0,
            maxDiffPixels: 0,
            threshold: 0, // default Playwright threshold
            animations: 'disabled',
          },
        }),
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off', // 'on-first-retry' causes CI job to get stuck
    viewport: null,
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
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: '../results',
};
