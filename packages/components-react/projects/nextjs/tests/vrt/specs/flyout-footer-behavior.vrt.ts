import { expect, test } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';

const component = 'flyout';
test.describe(component, async () => {
  test(`should have no visual regression on flyout component with fixed footer in all variations for viewport ${viewportWidthM}`, async ({
    page,
  }) => {
    await page.goto(`/${component}-footer-behavior`, viewportWidthM);
    // Remove selects in iframes
    await page.evaluate(() => {
      document.querySelectorAll('iframe').forEach((iframe) => {
        iframe.contentDocument
          .querySelectorAll('select[name="route"], select[name="theme"]')
          .forEach((select) => select.remove());
      });
    });
    await page.setViewportSize({
      width: viewportWidthM,
      height: await page.evaluate(() => document.body.clientHeight),
    });
    await page.mouse.click(0, 0); // click top left corner of the page to remove autofocus
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-footer-behavior.png`);
  });
});
