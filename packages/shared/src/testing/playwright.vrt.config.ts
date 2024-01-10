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
export const config: Config = {
  testDir: '../specs',
  testMatch: '**.vrt.ts',
  /* Maximum time one test can run for. */
  timeout: 60000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 30000,
    toMatchSnapshot: {
      maxDiffPixelRatio: undefined,
      maxDiffPixels: undefined,
      threshold: 0.2, // default Playwright threshold
    },
    toHaveScreenshot: {
      maxDiffPixelRatio: undefined,
      maxDiffPixels: undefined,
      threshold: 0.2, // default Playwright threshold
    },
  },
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}-{projectName}{ext}',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: '../results',
};
