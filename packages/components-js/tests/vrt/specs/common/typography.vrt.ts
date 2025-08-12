import { expect, test } from '@playwright/test';
import { viewportWidthXXL } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../../helpers';

// executed in Chrome only
test.describe('typography', () => {
  for (const typography of ['latin', 'greek-coptic', 'cyril', 'middle-east', 'thai', 'fallback']) {
    test.skip(({ browserName }) => browserName !== 'chromium');

    test(`should have no visual regression for ${typography}`, async ({ page }) => {
      await setupScenario(page, `/typography-${typography}`, viewportWidthXXL);
      await expect(page.locator('#app')).toHaveScreenshot(`typography-${viewportWidthXXL}-${typography}.png`);
    });
  }
});
