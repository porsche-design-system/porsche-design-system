import { expect, test } from '@playwright/test';
import {
  viewportWidth3XL,
  viewportWidth4XL,
  viewportWidthM,
  viewportWidthXXL,
} from '@porsche-design-system/shared/testing/playwright.vrt';
import { setupScenario } from '../../helpers';

const component = 'carousel';

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

// Test pagination on touch device
test.describe(component, () => {
  test.skip(({ browserName }) => browserName !== 'chromium');
  test.use({ hasTouch: true });

  test(`should have no visual regression on touch device for viewport ${viewportWidthM}`, async ({ page }) => {
    await setupScenario(page, `/${component}`, viewportWidthM);
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-touch.png`);
  });
});
