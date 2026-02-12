import { expect, test } from '@playwright/test';
import {
  viewportWidthL,
  viewportWidthM,
  viewportWidthS,
  viewportWidthXL,
  viewportWidthXS,
  viewportWidthXXL,
  viewportWidthXXS,
} from '@porsche-design-system/shared/testing';
import { themeMap } from '../../../src/components/ThemeSelect';
import { styleSolutions, styles } from '../../../src/routes';

const themes = Object.keys(themeMap) as (keyof typeof themeMap)[];

const stylesToExclude: (typeof styles)[number][] = ['motion', 'focus-visible'];

const styleViewportMap: Partial<Record<(typeof styles)[number], number[]>> = {
  grid: [viewportWidthXS, viewportWidthM],
  'media-query': [
    viewportWidthXXS,
    viewportWidthXS,
    viewportWidthS,
    viewportWidthM,
    viewportWidthL,
    viewportWidthXL,
    viewportWidthXXL,
  ],
};

const getViewportsForStyle = (style: string): number[] => {
  return styleViewportMap[style] ?? [viewportWidthM];
};

const getThemesForStyle = (style: string): typeof themes => {
  if (style === 'media-query') {
    return ['light'];
  }
  return themes;
};

// For light-dark theme, we need to test both color scheme preferences
const getColorSchemeVariants = (theme: string): ('light' | 'dark')[] => {
  return theme === 'light-dark' ? ['light', 'dark'] : [theme as 'light' | 'dark'];
};

const stylesToTest = styles.filter((style) => !stylesToExclude.includes(style));

for (const style of stylesToTest) {
  test.describe(`Style: ${style}`, () => {
    for (const theme of getThemesForStyle(style)) {
      test.describe(`Theme: ${theme}`, () => {
        for (const styleSolution of styleSolutions) {
          for (const viewportWidth of getViewportsForStyle(style)) {
            for (const colorScheme of getColorSchemeVariants(theme)) {
              const testName =
                theme === 'light-dark'
                  ? `${styleSolution} should have no visual regression for viewport ${viewportWidth} with prefers-color-scheme: ${colorScheme}`
                  : `${styleSolution} should have no visual regression for viewport ${viewportWidth}`;

              // Compare light-dark snapshots against the corresponding light/dark snapshots
              const snapshotName =
                theme === 'light-dark'
                  ? `${style}-${viewportWidth}-theme-${colorScheme}.png`
                  : `${style}-${viewportWidth}-theme-${theme}.png`;

              test(testName, async ({ page }) => {
                // Emulate color scheme before navigation for light-dark theme
                if (theme === 'light-dark') {
                  await page.emulateMedia({ colorScheme });
                }

                await page.goto(`/${styleSolution}/${style}`);

                const themeSelect = page.locator('select[name="theme"]');
                await themeSelect.selectOption(theme);
                await page.waitForFunction(
                  (expectedTheme) => document.documentElement.classList.contains(`scheme-${expectedTheme}`),
                  theme
                );

                await page.setViewportSize({ width: viewportWidth, height: 600 });
                await expect(page.locator('main')).toHaveScreenshot(snapshotName);
              });
            }
          }
        }
      });
    }
  });
}
