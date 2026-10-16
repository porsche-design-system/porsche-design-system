import { expect, test } from '@playwright/test';
import { COLOR_SCHEMES, type ColorScheme } from '@porsche-design-system/shared/models';
import {
  viewportWidthL,
  viewportWidthM,
  viewportWidthS,
  viewportWidthXL,
  viewportWidthXS,
  viewportWidthXXL,
  viewportWidthXXS,
} from '@porsche-design-system/shared/testing';
import { styleSolutions, styles } from '../../../src/routes';

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

const getViewportsForStyle = (style: (typeof styles)[number]): number[] => {
  return styleViewportMap[style] ?? [viewportWidthM];
};

const getColorSchemesForStyle = (style: string): readonly ColorScheme[] => {
  if (style === 'media-query') {
    return ['scheme-light'];
  }
  return COLOR_SCHEMES;
};

// The name a color scheme is captured under, e.g. `light-dark` for `scheme-light-dark`
const getThemeName = (colorScheme: ColorScheme): string => colorScheme.replace('scheme-', '');

// For light-dark theme, we need to test both color scheme preferences
const getColorSchemeVariants = (colorScheme: ColorScheme): ('light' | 'dark')[] => {
  return colorScheme === 'scheme-light-dark' ? ['light', 'dark'] : [colorScheme === 'scheme-dark' ? 'dark' : 'light'];
};

const stylesToTest = styles.filter((style) => !stylesToExclude.includes(style));

for (const style of stylesToTest) {
  test.describe(`Style: ${style}`, () => {
    for (const theme of getColorSchemesForStyle(style)) {
      test.describe(`Theme: ${getThemeName(theme)}`, () => {
        for (const styleSolution of styleSolutions) {
          for (const viewportWidth of getViewportsForStyle(style)) {
            for (const colorScheme of getColorSchemeVariants(theme)) {
              const testName =
                theme === 'scheme-light-dark'
                  ? `${styleSolution} should have no visual regression for viewport ${viewportWidth} with prefers-color-scheme: ${colorScheme}`
                  : `${styleSolution} should have no visual regression for viewport ${viewportWidth}`;

              // Compare light-dark snapshots against the corresponding light/dark snapshots
              const snapshotName =
                theme === 'scheme-light-dark'
                  ? `${style}-${viewportWidth}-theme-${colorScheme}.png`
                  : `${style}-${viewportWidth}-theme-${getThemeName(theme)}.png`;

              test(testName, async ({ page }) => {
                // Emulate color scheme before navigation for light-dark theme
                if (theme === 'scheme-light-dark') {
                  await page.emulateMedia({ colorScheme });
                }

                await page.goto(`/${styleSolution}/${style}`);

                const themeSelect = page.locator('select[name="theme"]');
                await themeSelect.selectOption(theme);
                await page.waitForFunction(
                  (expectedTheme) => document.documentElement.classList.contains(expectedTheme),
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
