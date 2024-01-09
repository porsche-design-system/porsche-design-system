import { expect, test } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt.config';

const style = 'styles-frosted-glass';

test.describe(style, async () => {
  test(`should have no visual regression for viewport ${viewportWidthM}`, async ({ page }) => {
    await page.goto(`/${style}`);
    await page.setViewportSize({ width: viewportWidthM, height: 600 });
    await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidthM}.png`);
  });
});
