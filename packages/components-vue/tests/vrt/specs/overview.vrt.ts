import { expect, test } from '@playwright/test';

test.describe('overview', async () => {
  test(`should have no visual regression`, async ({ page }) => {
    const viewportWidth = 1920;
    await page.goto('/overview');
    await page.setViewportSize({
      width: viewportWidth,
      height: await page.evaluate(() => document.body.clientHeight),
    });
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-${viewportWidth}.png`);
  });
});

test.describe('overview notifications', async () => {
  test(`should have no visual regression`, async ({ page }) => {
    const viewportWidth = 1000;
    await page.goto('/overview-notifications');
    await page.setViewportSize({
      width: viewportWidth,
      height: await page.evaluate(() => document.body.clientHeight),
    });
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-notifications-${viewportWidth}.png`);
  });
});
