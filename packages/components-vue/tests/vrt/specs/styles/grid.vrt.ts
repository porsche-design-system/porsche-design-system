import { expect, test } from '@playwright/test';
import {
  viewportWidth3XL,
  viewportWidth4XL,
  viewportWidthXXL,
  viewportWidths,
} from '@porsche-design-system/shared/testing/playwright.vrt';

const style = 'styles-grid';

test.describe(style, async () => {
  ([...viewportWidths, viewportWidthXXL, viewportWidth3XL, viewportWidth4XL] as const).forEach((viewportWidth) => {
    test(`should have no visual regression for vanilla-extract at viewport ${viewportWidth}`, async ({ page }) => {
      await page.goto(`/vanilla-extract-${style}`);
      await page.setViewportSize({ width: viewportWidth, height: 600 });
      await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidth}.png`);
    });
  });
});
