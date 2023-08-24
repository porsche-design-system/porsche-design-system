import { expect, test } from '@playwright/test';
import { setupScenario } from '../helpers';

// executed in Chrome only
['latin', 'greek-and-coptic', 'cyril', 'fallback'].forEach((typography) => {
  test.describe('typography', async () => {
    test.skip(({ browserName }) => browserName !== 'chromium');

    test(`should have no visual regression for ${typography}`, async ({ page }) => {
      const viewportWidth = 1920;
      await setupScenario(page, `/typography-${typography}`, viewportWidth);
      await expect(page.locator('#app')).toHaveScreenshot(`typography-${viewportWidth}-${typography}.png`);
    });
  });
});
