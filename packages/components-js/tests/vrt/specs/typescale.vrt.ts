import { expect, test } from '@playwright/test';
import { schemes, viewportWidthXXL } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../helpers';

// executed in Chrome only
test.describe('typescale', () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test('typescale', async ({ page }) => {
    await setupScenario(page, '/overview-typescale', viewportWidthXXL);
    await page.mouse.click(0, 0);
    await expect(page.locator('#app')).toHaveScreenshot(`overview-typescale-${viewportWidthXXL}.png`);
  });
});
