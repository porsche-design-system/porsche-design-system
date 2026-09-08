import { expect, test } from '@playwright/test';
import { viewportWidthXXL } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../helpers';

const charsets = ['latin', 'greek-coptic', 'cyril', 'middle-east', 'thai', 'fallback'];

// executed in Chrome only
test.describe('typography', () => {
  for (const charset of charsets) {
    test.skip(({ browserName }) => browserName !== 'chromium');

    test(`should have no visual regression for ${charset}`, async ({ page }) => {
      await setupScenario(page, `/typography-${charset}`, viewportWidthXXL);
      await expect(page.locator('#app')).toHaveScreenshot(`typography-${viewportWidthXXL}-${charset}.png`);
    });
  }
});
