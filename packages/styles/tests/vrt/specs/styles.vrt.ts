import { expect, test } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing';

const styleSolutions = ['tailwindcss', 'scss', 'emotion', 'vanilla-extract'];
const styles = ['blur'];
const themes = ['light', 'dark'];

for (const styleSolution of styleSolutions) {
  for (const style of styles) {
    for (const theme of themes) {
      test.describe(`${styleSolution}: ${style} (${theme})`, async () => {
        test(`should have no visual regression for viewport ${viewportWidthM}`, async ({ page }) => {
          await page.goto(`/${styleSolution}/${style}`);

          const themeSelect = page.locator('select[name="theme"]');
          await themeSelect.selectOption(theme);

          await page.setViewportSize({ width: viewportWidthM, height: 600 });
          await expect(page.locator('main')).toHaveScreenshot(`${style}-${viewportWidthM}-theme-${theme}.png`);
        });
      });
    }
  }
}
