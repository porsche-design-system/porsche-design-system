import { expect, test } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';

test.describe('Boolean Shorthand Props', () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression for viewport ${viewportWidthM}`, async ({ page }) => {
    await page.goto('/boolean-shorthand');
    await page.setViewportSize({
      width: viewportWidthM,
      height: await page.evaluate(() => document.body.clientHeight),
    });
    await expect(page.locator('#app')).toHaveScreenshot(`boolean-shorthand-${viewportWidthM}.png`);
  });
});
