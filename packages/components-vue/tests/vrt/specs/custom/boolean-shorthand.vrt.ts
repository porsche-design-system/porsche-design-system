import { expect, test } from '@playwright/test';
import { themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';

test.describe('Boolean Shorthand Props', () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  for (const theme of themes) {
    test(`should have no visual regression for boolean shorthand props with theme ${theme}`, async ({ page }) => {
      await page.goto('/boolean-shorthand');
      await page.setViewportSize({
        width: viewportWidthM,
        height: await page.evaluate(() => document.body.clientHeight),
      });
      await expect(page.locator('#app')).toHaveScreenshot(`boolean-shorthand-${viewportWidthM}-theme-${theme}.png`);
    });
  }
});
