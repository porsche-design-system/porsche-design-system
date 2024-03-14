import { expect, test } from '@playwright/test';
import { setupScenario } from '../../helpers';
import { viewportWidthM, viewportWidthXXL } from '@porsche-design-system/shared/testing/playwright.vrt.config';

// executed in Chrome only
test.describe('overview', async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression`, async ({ page }) => {
    await setupScenario(page, `/overview`, viewportWidthXXL);
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-${viewportWidthXXL}.png`);
  });
});

// executed in Chrome only
test.describe('overview notifications', async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression`, async ({ page }) => {
    await setupScenario(page, `/overview-notifications`, viewportWidthM);
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-notifications-${viewportWidthM}.png`);
  });
});
