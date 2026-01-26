import { expect, test } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing';
import { themes } from '../../../src/components/ThemeSelect';
import { styleSolutions } from '../../../src/routes';

for (const style of ['blur', 'border', 'color', 'grid']) {
  test.describe(`Style: ${style}`, () => {
    for (const theme of themes.filter((theme) => theme !== 'auto')) {
      test.describe(`Theme: ${theme}`, () => {
        for (const styleSolution of styleSolutions) {
          test(`${styleSolution} should have no visual regression for viewport ${viewportWidthM}`, async ({ page }) => {
            await page.goto(`/${styleSolution}/${style}`);

            const themeSelect = page.locator('select[name="theme"]');
            await themeSelect.selectOption(theme);
            await page.waitForFunction(
              (expectedTheme) => document.documentElement.classList.contains(expectedTheme),
              theme
            );

            const screenshotTheme = theme === 'auto' ? 'dark' : theme;
            await page.setViewportSize({ width: viewportWidthM, height: 600 });
            await expect(page.locator('main')).toHaveScreenshot(
              `${style}-${viewportWidthM}-theme-${screenshotTheme}.png`
            );
          });
        }
      });
    }
  });
}

// TODO: Add multiple sizes for grid (s, xxl)
