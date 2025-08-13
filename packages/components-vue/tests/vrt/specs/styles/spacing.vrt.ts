import { expect, test } from '@playwright/test';
import { viewportWidth3XL, viewportWidths, viewportWidthXXL } from '@porsche-design-system/shared/testing';

const style = 'styles-spacing';

test.describe(style, async () => {
  ([...viewportWidths, viewportWidthXXL, viewportWidth3XL] as const).forEach((viewportWidth) => {
    test(`should have no visual regression for vanilla-extract at viewport ${viewportWidth}`, async ({ page }) => {
      await page.goto(`/vanilla-extract-${style}`);
      await page.setViewportSize({ width: viewportWidth, height: 600 });
      await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidth}.png`);
    });
    test(`should have no visual regression for tailwind at viewport ${viewportWidth}`, async ({ page }) => {
      await page.goto(`/tailwind-${style}`);
      await page.setViewportSize({ width: viewportWidth, height: 600 });
      await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidth}.png`);
    });
  });
});
