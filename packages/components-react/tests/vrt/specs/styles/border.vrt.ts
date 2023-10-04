import { expect, test } from '@playwright/test';

const style = 'styles-border';
const viewportWidth = 1000;

test.describe(style, async () => {
  test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
    await page.goto(`/${style}`);
    await page.setViewportSize({ width: viewportWidth, height: 600 });
    await expect(page.locator('#app')).toHaveScreenshot(`${style}-${viewportWidth}.png`);
  });
});
