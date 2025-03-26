import { expect, test } from '@playwright/test';
import { themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';
import { setupScenario } from '../../helpers';

test.describe('Boolean Shorthand Props', () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  for (const theme of themes) {
    test(`should have no visual regression for boolean shorthand props with theme ${theme}`, async ({ page }) => {
      await setupScenario(page, '/boolean-shorthand', viewportWidthM, {
        forceComponentTheme: theme,
      });
      await expect(page.locator('#app')).toHaveScreenshot(`boolean-shorthand-${viewportWidthM}-theme-${theme}.png`);
    });
  }
});
