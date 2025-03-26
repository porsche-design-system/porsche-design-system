import { expect, test } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';
import { setupScenario } from '../../helpers';

test.describe('Boolean Shorthand Props', () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression for viewport ${viewportWidthM}`, async ({ page }) => {
    await setupScenario(page, '/boolean-shorthand', viewportWidthM, {
      forceComponentTheme: 'light',
    });
    await expect(page.locator('#app')).toHaveScreenshot(`boolean-shorthand-${viewportWidthM}.png`);
  });
});
