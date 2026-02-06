import { expect, test } from '@playwright/test';
import { viewportWidthXXL } from '@porsche-design-system/shared/testing';

test.describe('overview', async () => {
  test('components', async ({ page }) => {
    await page.goto('/overview-components');
    await page.evaluate(() => (window as any).componentsReady());
    await page.setViewportSize({
      width: viewportWidthXXL,
      height: await page.evaluate(() => document.body.clientHeight),
    });
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-components-${viewportWidthXXL}.png`);
  });
});
