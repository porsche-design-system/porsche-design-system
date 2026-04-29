import { expect, test } from '@playwright/test';
import { viewportWidth3XL, viewportWidth4XL, viewportWidthXXL } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../helpers';

const component = 'banner';

// executed in Chrome only
test.describe(component, () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  for (const viewportWidth of [viewportWidthXXL, viewportWidth3XL, viewportWidth4XL]) {
    test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
      await setupScenario(page, `/${component}`, viewportWidth);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidth}.png`);
    });
  }
});
