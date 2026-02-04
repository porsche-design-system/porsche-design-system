import { expect, test } from '@playwright/test';
import { schemes, viewportWidthXXL } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../helpers';

// executed in Chrome only
test.describe('overview', () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test.describe('components', () => {
    test('should have no visual regression', async ({ page }) => {
      await setupScenario(page, '/overview-components', viewportWidthXXL);
      await page.mouse.click(0, 0);
      await expect(page.locator('#app')).toHaveScreenshot(`overview-components-${viewportWidthXXL}.png`);
    });
  });

  test.describe('forms', () => {
    for (const scheme of schemes) {
      test(`should have no visual regression for color-scheme ${scheme}`, async ({ page }) => {
        await setupScenario(page, `/overview-forms?scheme=${scheme}`, viewportWidthXXL);
        await expect(page.locator('#app')).toHaveScreenshot(`overview-forms-${viewportWidthXXL}-${scheme}.png`);
      });

      // TODO: it runs into a timeout because of select and multi-select, somehow forcePseudoState helper runs into an error with its selector
      test.fixme(
        `should have no visual regression for color-scheme "${scheme}" with ":focus" and/or ":focus-visible"`,
        async ({ page }) => {
          await setupScenario(page, `/overview-forms?scheme=${scheme}`, viewportWidthXXL, {
            forcePseudoState: 'focus',
          });
          await expect(page.locator('#app')).toHaveScreenshot(`overview-forms-${viewportWidthXXL}-${scheme}-focus.png`);
        }
      );

      test(`should have no visual regression for color-scheme "${scheme}" with ":hover"`, async ({ page }) => {
        await setupScenario(page, `/overview-forms?scheme=${scheme}`, viewportWidthXXL, {
          forcePseudoState: 'hover',
        });
        await expect(page.locator('#app')).toHaveScreenshot(`overview-forms-${viewportWidthXXL}-${scheme}-hover.png`);
      });
    }
  });
});
