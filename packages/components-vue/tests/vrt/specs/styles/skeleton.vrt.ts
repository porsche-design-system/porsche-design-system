import { expect, test } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing';

const style = 'styles-skeleton';

test.describe(style, async () => {
  test(`should have no visual regression for vanilla-extract at viewport ${viewportWidthM}`, async ({ page }) => {
    await page.goto(`/vanilla-extract-${style}`);
    await page.setViewportSize({ width: viewportWidthM, height: 600 });
    await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidthM}.png`);
  });
  test(`should have no visual regression for tailwind at viewport ${viewportWidthM}`, async ({ page }) => {
    await page.goto(`/tailwind-${style}`);
    await page.setViewportSize({ width: viewportWidthM, height: 600 });
    await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidthM}.png`);
  });
});
