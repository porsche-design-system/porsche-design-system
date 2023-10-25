import { expect, test } from '@playwright/test';
import { setupScenario, thresholdConfig } from '../../helpers';

// executed in Chrome only
test.describe('overview', async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression`, async ({ page }) => {
    const viewportWidth = 1920;
    await setupScenario(page, `/overview`, viewportWidth);
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-${viewportWidth}.png`, thresholdConfig);
  });
});

// executed in Chrome only
test.describe('overview notifications', async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression`, async ({ page }) => {
    const viewportWidth = 1000;
    await setupScenario(page, `/overview-notifications`, viewportWidth);
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-notifications-${viewportWidth}.png`);
  });
});
