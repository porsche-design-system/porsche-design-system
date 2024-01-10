import { expect, test } from '@playwright/test';
import { viewportWidthM, viewportWidthXXL } from '@porsche-design-system/shared/testing/playwright.vrt.config';

test.describe('overview', async () => {
  test(`should have no visual regression for viewport ${viewportWidthXXL}`, async ({ page }) => {
    await page.goto('/overview');
    await page.setViewportSize({
      width: viewportWidthXXL,
      height: await page.evaluate(() => document.body.clientHeight),
    });
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-${viewportWidthXXL}.png`);
  });
});

test.describe('overview notifications', async () => {
  test(`should have no visual regression for viewport ${viewportWidthM}`, async ({ page }) => {
    await page.goto('/overview-notifications');
    await page.setViewportSize({ width: viewportWidthM, height: 600 });
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-notifications-${viewportWidthM}.png`);
  });
});
