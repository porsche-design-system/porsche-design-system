import { expect, test } from '@playwright/test';
import { baseSchemes, baseThemes, baseViewportWidth, baseViewportWidths, setupScenario } from '../helpers';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';

const components = TAG_NAMES.filter((el, i, arr) => {
  return !/item$|-table-|-select-wrapper-/.test(el);
})
  .map((el) => {
    return el.substring(2);
  })
  .filter((el) => {
    const argv = process.argv.slice(5);
    return !argv.length || argv.includes(el);
  });

const isComponentThemeable = (component: string): boolean => getComponentMeta(`p-${component}` as TagName).isThemeable;

test(`should have certain amount of components`, () => {
  expect(components.length).toBe(49);
});

components.forEach((component) => {
  // executed in Chrome + Safari
  test.describe(component, async () => {
    baseThemes.forEach((theme) => {
      test(`should have no visual regression for viewport ${baseViewportWidth} and theme ${theme}`, async ({
        page,
      }) => {
        test.skip(!isComponentThemeable(component) && theme === 'dark', 'This component has no theme support.');

        await setupScenario(page, `/${component}`, baseViewportWidth, {
          forceComponentTheme: isComponentThemeable(component) ? theme : undefined,
        });
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${baseViewportWidth}-theme-${theme}.png`);
      });
    });
  });

  // executed in Chrome only
  test.describe(component, async () => {
    test.skip(({ browserName }) => browserName !== 'chromium', 'CDP is available in Chromium only.');

    baseViewportWidths.forEach((viewportWidth) => {
      test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
        await setupScenario(page, `/${component}`, viewportWidth);
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidth}.png`);
      });
    });

    baseSchemes.forEach((scheme) => {
      test.skip(`should have no visual regression for viewport ${baseViewportWidth} and theme auto with prefers-color-scheme ${scheme}`, async ({
        page,
      }) => {
        test.skip(!isComponentThemeable(component), 'This component has no theme support.');

        await setupScenario(page, `/${component}`, baseViewportWidth, {
          forceComponentTheme: 'auto',
          prefersColorScheme: scheme,
        });
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${baseViewportWidth}-theme-${scheme}.png`); // fixture is aliased since result has to be equal
      });

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
});
