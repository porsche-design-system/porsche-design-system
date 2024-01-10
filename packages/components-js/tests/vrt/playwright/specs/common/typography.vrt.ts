import { expect, test } from '@playwright/test';
import { setupScenario } from '../../helpers';
import { viewportWidthXXL } from '@porsche-design-system/shared/testing/playwright.vrt.config';

// executed in Chrome only
['latin', 'greek-and-coptic', 'cyril', 'middle-east', 'fallback'].forEach((typography) => {
  test.describe('typography', async () => {
    test.skip(({ browserName }) => browserName !== 'chromium');

    test(`should have no visual regression for ${typography}`, async ({ page }) => {
      await setupScenario(page, `/typography-${typography}`, viewportWidthXXL);
      await expect(page.locator('#app')).toHaveScreenshot(`typography-${viewportWidthXXL}-${typography}.png`);
    });
  });
});
