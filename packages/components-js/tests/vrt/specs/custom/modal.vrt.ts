import { expect, test } from '@playwright/test';
import { setupScenario } from '../../helpers';
import {
  viewportWidth3XL,
  viewportWidth4XL,
  viewportWidthXXL,
} from '@porsche-design-system/shared/testing/playwright.vrt';

const component = 'modal';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  [viewportWidthXXL, viewportWidth3XL, viewportWidth4XL].forEach((viewportWidth) => {
    test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
      await setupScenario(page, `/${component}`, viewportWidth);
      await page.mouse.click(0, 0); // click top left corner of the page to remove focus
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidth}.png`);
    });
  });
});
