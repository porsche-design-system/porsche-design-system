import { expect, test } from '@playwright/test';
import { setupScenario } from '../../helpers';

// executed in Chrome only
test.describe('overview', async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression`, async ({ page }) => {
    const viewportWidth = 1920;
    await setupScenario(page, `/overview`, viewportWidth, { revertAutoFocus: true });
    await expect(page.locator('#app')).toHaveScreenshot(`overview-${viewportWidth}.png`);
  });
});

// executed in Chrome only
test.describe('overview notifications', async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression`, async ({ page }) => {
    const viewportWidth = 1000;
    await setupScenario(page, `/overview-notifications`, viewportWidth, { revertAutoFocus: true });
    await expect(page.locator('#app')).toHaveScreenshot(`overview-notifications-${viewportWidth}.png`);
  });
});
