import { expect, test } from '@playwright/test';
import { themes, viewportWidthXXL } from '@porsche-design-system/shared/testing';
import { setupScenario } from '../../helpers';

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
    for (const theme of themes) {
      test(`should have no visual regression for theme ${theme}`, async ({ page }) => {
        await setupScenario(page, '/overview-forms', viewportWidthXXL, {
          forceComponentTheme: theme,
        });
        await expect(page.locator('#app')).toHaveScreenshot(`overview-forms-${viewportWidthXXL}-${theme}.png`);
      });

      // TODO: it runs into a timeout because of select and multi-select, somehow forcePseudoState helper runs into an error with its selector
      test.fixme(
        `should have no visual regression for theme ${theme} with :focus and/or :focus-visible`,
        async ({ page }) => {
          await setupScenario(page, '/overview-forms', viewportWidthXXL, {
            forceComponentTheme: theme,
            forcePseudoState: 'focus',
          });
          await expect(page.locator('#app')).toHaveScreenshot(`overview-forms-${viewportWidthXXL}-${theme}-focus.png`);
        }
      );

      test(`should have no visual regression for theme ${theme} with :hover`, async ({ page }) => {
        await setupScenario(page, '/overview-forms', viewportWidthXXL, {
          forceComponentTheme: theme,
          forcePseudoState: 'hover',
        });
        await expect(page.locator('#app')).toHaveScreenshot(`overview-forms-${viewportWidthXXL}-${theme}-hover.png`);
      });
    }
  });
});
