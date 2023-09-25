import { expect, test } from '@playwright/test';

test.describe('overview', async () => {
  const viewportWidth = 1920;

  test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
    await page.goto('/overview');
    await page.evaluate(() => (window as any).componentsReady());
    await page.setViewportSize({
      width: viewportWidth,
      height: await page.evaluate(() => document.body.clientHeight),
    });
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-${viewportWidth}.png`);
  });
});

test.describe('overview notifications', async () => {
  const viewportWidth = 1000;

  test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
    await page.goto('/overview-notifications');
    await page.evaluate(() => (window as any).componentsReady());
    await page.setViewportSize({ width: viewportWidth, height: 600 });
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-notifications-${viewportWidth}.png`);
  });
});
