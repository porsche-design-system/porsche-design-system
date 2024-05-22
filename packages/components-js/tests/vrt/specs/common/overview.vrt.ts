import { expect, test } from '@playwright/test';
import { setupScenario } from '../../helpers';
import { viewportWidthM, viewportWidthXXL } from '@porsche-design-system/shared/testing/playwright.vrt';

// executed in Chrome only
test.describe('overview', async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression`, async ({ page }) => {
    await setupScenario(page, `/overview`, viewportWidthXXL);
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-${viewportWidthXXL}.png`);
  });
});
