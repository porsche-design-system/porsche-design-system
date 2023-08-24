import { expect, test } from '@playwright/test';
import { setupScenario } from '../helpers';

const viewportWidth = 1920;

// executed in Chrome only
test.describe('overview', async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression`, async ({ page }) => {
    await setupScenario(page, `/overview`, viewportWidth);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-${viewportWidth}.png`);
  });
});
