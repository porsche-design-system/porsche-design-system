import { expect, test } from '@playwright/test';
import { baseSchemes, baseThemes, baseViewportWidth, baseViewportWidths, setupScenario } from '../helpers';

const component = 'icon';

test.beforeEach(async ({}, testInfo) => {
  testInfo.snapshotSuffix = '';
});

// executed in Chrome + Safari
test.describe(component, async () => {
  baseThemes.forEach((theme) => {
    test(`should have no visual regression for viewport ${baseViewportWidth} and theme ${theme}`, async ({ page }) => {
      await setupScenario(page, `/${component}`, baseViewportWidth, {
        forceComponentTheme: theme,
      });
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${baseViewportWidth}-theme-${theme}.png`);
    });
  });
});

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseViewportWidths.forEach((viewportWidth) => {
    test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
      await setupScenario(page, `/${component}`, viewportWidth);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidth}.png`);
    });
  });

  baseSchemes.forEach((scheme) => {
    /*test(`should have no visual regression for viewport ${baseViewportWidth} and theme auto with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await setupScenario(page, `/${component}`, baseViewportWidth, {
        forceComponentTheme: 'auto',
        prefersColorScheme: scheme,
      });
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${baseViewportWidth}-theme-${scheme}.png`); // fixture is aliased since result has to be equal
    });*/

    test(`should have no visual regression for viewport ${baseViewportWidth} and high contrast mode with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await setupScenario(page, `/${component}`, baseViewportWidth, {
        forcedColorsEnabled: true,
        prefersColorScheme: scheme,
      });
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-high-contrast-scheme-${scheme}.png`
      );
    });
  });

  test(`should have no visual regression for viewport ${baseViewportWidth} in scale mode`, async ({ page }) => {
    await setupScenario(page, `/${component}`, baseViewportWidth, {
      scalePageFontSize: true,
    });
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${baseViewportWidth}-scale-mode.png`);
  });
});
