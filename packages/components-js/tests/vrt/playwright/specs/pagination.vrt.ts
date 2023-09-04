import { expect, type Page, test } from '@playwright/test';
import {
  baseSchemes,
  baseThemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'pagination';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-pagination total-items-count="500" items-per-page="25" active-page="1"></p-pagination>
    <p-pagination total-items-count="500" items-per-page="25" active-page="2"></p-pagination>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'block' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-pagination >>> span');
  await forceFocusState(page, '.focus p-pagination >>> span');
  await forceFocusHoverState(page, '.focus-hover p-pagination >>> span');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseThemes.forEach((theme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${theme}.png`
      );
    });
  });

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${scheme}.png`
      ); // fixture is aliased since result has to be equal
    });
  });
});
