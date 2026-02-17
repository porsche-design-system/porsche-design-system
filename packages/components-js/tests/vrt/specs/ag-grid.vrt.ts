import { expect, test } from '@playwright/test';
import { schemes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../helpers';

const component = 'ag-grid';

// executed in Chrome only
test.describe(component, () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  for (const scheme of schemes) {
    test(`should have no visual regression for ag-grid with color-scheme "${scheme}"`, async ({ page }) => {
      await setupScenario(page, `/ag-grid-example?scheme=${scheme}`, viewportWidthM);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-${scheme}.png`);
    });
  }
});
