import { expect, test } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';
import { setupScenario } from '../../helpers';

const component = 'flyout';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression on flyout component with fixed footer in all variations for viewport ${viewportWidthM}`, async ({
    page,
  }) => {
    await setupScenario(page, `/${component}-footer-behavior`, viewportWidthM);
    await page.mouse.click(0, 0); // click top left corner of the page to remove focus
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-footer-behavior.png`);
  });
});
