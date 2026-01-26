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
import { themes } from '../../../src/components/ThemeSelect';
import { styleSolutions, styles } from '../../../src/routes';

const stylesToExclude: (typeof styles)[number][] = ['motion'];

// Add viewport widths if more than just viewportWidthM should be tested
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
  return themes.filter((theme) => theme !== 'auto');
};

const stylesToTest = styles.filter((style) => !stylesToExclude.includes(style));

for (const style of stylesToTest) {
  test.describe(`Style: ${style}`, () => {
    for (const theme of getThemesForStyle(style)) {
      test.describe(`Theme: ${theme}`, () => {
        for (const styleSolution of styleSolutions) {
          for (const viewportWidth of getViewportsForStyle(style)) {
            test(`${styleSolution} should have no visual regression for viewport ${viewportWidth}`, async ({
              page,
            }) => {
              await page.goto(`/${styleSolution}/${style}`);

              const themeSelect = page.locator('select[name="theme"]');
              await themeSelect.selectOption(theme);
              await page.waitForFunction(
                (expectedTheme) => document.documentElement.classList.contains(expectedTheme),
                theme
              );

              await page.setViewportSize({ width: viewportWidth, height: 600 });
              await expect(page.locator('main')).toHaveScreenshot(`${style}-${viewportWidth}-theme-${theme}.png`);
            });
          }
        }
      });
    }
  });
}
