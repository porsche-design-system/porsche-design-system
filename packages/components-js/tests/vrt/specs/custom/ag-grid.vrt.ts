import { expect, test } from '@playwright/test';
import { setupScenario } from '../../helpers';
import { themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';

const component = 'ag-grid';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  themes.forEach((theme) => {
    test(`should have no visual regression for ag-grid with theme ${theme}`, async ({ page }) => {
      await setupScenario(page, `/ag-grid-example`, viewportWidthM, {
        forceComponentTheme: theme,
      });
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-theme-${theme}.png`);
    });
  });
});
