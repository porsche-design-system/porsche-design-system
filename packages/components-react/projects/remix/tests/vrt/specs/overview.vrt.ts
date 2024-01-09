import { expect, test } from '@playwright/test';
import { viewportWidthXXL } from '@porsche-design-system/shared/testing/playwright.vrt.config';

test.describe('overview', async () => {
  test(`should have no visual regression`, async ({ page }) => {
    await page.goto('/overview');
    await page.setViewportSize({
      width: viewportWidthXXL,
      height: await page.evaluate(() => document.body.clientHeight),
    });
    await page.mouse.click(0, 0); // click top left corner of the page to remove autofocus
    await expect(page.locator('#app')).toHaveScreenshot(`overview-${viewportWidthXXL}.png`);
  });
});
