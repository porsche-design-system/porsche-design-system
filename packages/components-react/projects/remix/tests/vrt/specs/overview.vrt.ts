import { expect, test } from '@playwright/test';

test.describe('overview', async () => {
  test(`should have no visual regression`, async ({ page }) => {
    const viewportWidth = 1920;
    await page.goto('/overview');
    await page.setViewportSize({
      width: viewportWidth,
      height: await page.evaluate(() => document.body.clientHeight),
    });
    await page.mouse.click(0, 0); // click top left corner of the page to remove autofocus
    await expect(page.locator('#app')).toHaveScreenshot(`overview-${viewportWidth}.png`);
  });
});
