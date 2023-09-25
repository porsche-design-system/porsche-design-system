import { expect, test } from '@playwright/test';

const style = 'styles-flyout-grid';

test.describe(style, async () => {
  [320, 480, 760, 1300, 1760, 1920, 2560, 3000].forEach((viewportWidth) => {
    test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
      await page.goto(`/${style}`);
      await page.setViewportSize({ width: viewportWidth, height: 600 });
      await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidth}.png`);
    });
  });
});
