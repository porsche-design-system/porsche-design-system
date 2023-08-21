import { expect, test } from '@playwright/test';
import {
  type GetThemedMarkup,
  baseSchemes,
  baseThemes,
  baseViewportWidth,
  baseViewportWidths,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  setupScenario,
  setContentWithDesignSystem,
} from '../helpers';

const component = 'button';

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
    test(`should have no visual regression for viewport ${baseViewportWidth} and theme auto with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
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

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-button theme="${theme}" variant="primary">Primary</p-button>
        <p-button theme="${theme}" variant="secondary">Secondary</p-button>
        <p-button theme="${theme}" variant="primary" icon="arrow-right">Primary with icon</p-button>
        <p-button theme="${theme}" variant="secondary" icon="arrow-right">Secondary with icon</p-button>
        <p-button theme="${theme}" variant="secondary" icon="arrow-right">Secondary with icon</p-button>
        <p-button theme="${theme}" variant="primary" hide-label="true" icon="arrow-right">Primary with icon only</p-button>
        <p-button theme="${theme}" variant="secondary" hide-label="true" icon="arrow-right">Secondary with icon only</p-button>
        <p-button theme="${theme}" variant="primary" loading>Loading Primary</p-button>
        <p-button theme="${theme}" variant="secondary" loading>Loading Secondary</p-button>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup, { autoLayout: true }), {
        prefersColorScheme: scheme,
      });

      await forceHoverState(page, '.hover p-button >>> button');
      await forceFocusState(page, '.focus p-button'); // native outline should not be visible
      await forceFocusState(page, '.focus p-button >>> button');
      await forceFocusHoverState(page, '.focus-hover p-button >>> button');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
