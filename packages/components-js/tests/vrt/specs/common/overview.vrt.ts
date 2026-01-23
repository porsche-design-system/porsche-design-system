import { expect, test } from '@playwright/test';
import { viewportWidthXXL } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../../helpers';

// executed in Chrome only
test.describe('overview', () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test('should have no visual regression', async ({ page }) => {
    await setupScenario(page, '/overview-components', viewportWidthXXL);
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-components-${viewportWidthXXL}.png`);
  });
});
