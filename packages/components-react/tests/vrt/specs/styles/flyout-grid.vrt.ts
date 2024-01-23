import { expect, test } from '@playwright/test';
import {
  viewportWidth3XL,
  viewportWidth4XL,
  viewportWidths,
  viewportWidthXXL,
} from '@porsche-design-system/shared/testing/playwright.vrt.config';

const style = 'styles-flyout-grid';

test.describe(style, async () => {
  ([...viewportWidths, viewportWidthXXL, viewportWidth3XL, viewportWidth4XL] as const).forEach((viewportWidth) => {
    test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
      await page.goto(`/${style}`);
      await page.setViewportSize({
        width: viewportWidth,
        height: await page.evaluate(() => document.body.clientHeight),
      });
      await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidth}.png`);
    });
  });
});
