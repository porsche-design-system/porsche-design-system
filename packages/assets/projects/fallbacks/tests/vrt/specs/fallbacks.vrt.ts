import { expect, test } from '@playwright/test';
import { viewportWidths } from '@porsche-design-system/shared/testing/playwright.vrt.config';

(['cookies', 'browser-support'] as const).forEach((fallback) => {
  test.describe(fallback, async () => {
    viewportWidths.forEach((viewportWidth) => {
      test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
        await page.goto('/');
        await page.click(`#${fallback}`);
        await page.waitForSelector(`#porsche-design-system-fallbacks-${fallback}`);
        await page.setViewportSize({
          width: viewportWidth,
          height: await page.evaluate(() => document.body.clientHeight),
        });
        await expect(page.locator('#app')).toHaveScreenshot(`${fallback}-${viewportWidth}.png`);
      });
    });
  });
});
