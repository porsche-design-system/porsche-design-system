import { expect, test } from '@playwright/test';

const fallbacks = ['cookies', 'browser-support'] as const;
const viewportWidths = [320, 480, 760, 1000, 1300, 1760] as const;

fallbacks.forEach((fallback) => {
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
