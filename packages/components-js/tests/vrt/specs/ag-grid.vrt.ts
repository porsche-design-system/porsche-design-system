import { expect, test } from '@playwright/test';
import { themes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../helpers';

const component = 'ag-grid';

// executed in Chrome only
test.describe(component, () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  for (const theme of themes) {
    test(`should have no visual regression for ag-grid with theme ${theme}`, async ({ page }) => {
      await setupScenario(page, '/ag-grid-example', viewportWidthM, {
        forceComponentTheme: theme,
      });
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-theme-${theme}.png`);
    });
  }
});
