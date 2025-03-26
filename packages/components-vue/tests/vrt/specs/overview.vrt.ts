import { expect, test } from '@playwright/test';
import { viewportWidthXXL } from '@porsche-design-system/shared/testing/playwright.vrt';

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
