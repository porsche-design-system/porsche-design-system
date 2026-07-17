import { expect, test } from '@playwright/test';
import { viewportWidthXXL } from '@porsche-design-system/shared/testing';

test.describe('overview', async () => {
  test('components', async ({ page }) => {
    await page.goto('/overview-components', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(
      () =>
        document.querySelectorAll('#app .playground').length > 0 &&
        Array.from(document.querySelectorAll('iframe')).every((iframe) => iframe.contentDocument?.readyState === 'complete')
    );
    await page.setViewportSize({
      width: viewportWidthXXL,
      height: await page.evaluate(() => document.body.clientHeight),
    });
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-components-${viewportWidthXXL}.png`);
  });
});
