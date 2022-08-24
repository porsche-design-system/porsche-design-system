import { test, expect } from '@playwright/test';

export const defaultViewports = [320, 480, 760, 1000, 1300, 1760] as const;
type Viewport = typeof defaultViewports[number];

const defaultOptions = {
  // viewports: defaultViewports as unknown as number[],
  // fixturesDir: 'tests/vrt/fixtures',
  // resultsDir: 'tests/vrt/results',
  // tolerance: 0,
  baseUrl: 'http://localhost:8575',
  // timeout: 90000,
};

export const vrtCBT = async (viewport: Viewport, name: string): Promise<void> => {
  const { baseUrl } = defaultOptions;
  return test(`should have no visual regression for viewport ${viewport}`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport,
      height: viewport,
    });
    await page.goto(`${baseUrl}/#${name}`);
    await expect(page).toHaveScreenshot(name);
  });
};
