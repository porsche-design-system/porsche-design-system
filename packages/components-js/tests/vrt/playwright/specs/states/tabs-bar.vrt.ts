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
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'tabs-bar';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-tabs-bar active-tab-index="1">
      <button type="button">Button Tab One</button>
      <button type="button">Button Tab Two</button>
      <button type="button">Button Tab Three</button>
    </p-tabs-bar>
    <p-tabs-bar active-tab-index="1">
      <a href="#">Anchor Tab One</a>
      <a href="#">Anchor Tab Two</a>
      <a href="#">Anchor Tab Three</a>
    </p-tabs-bar>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'block' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-tabs-bar button');
  await forceHoverState(page, '.hover p-tabs-bar a');
  await forceFocusState(page, '.focus p-tabs-bar button');
  await forceFocusState(page, '.focus p-tabs-bar a');
  await forceFocusHoverState(page, '.focus-hover p-tabs-bar button');
  await forceFocusHoverState(page, '.focus-hover p-tabs-bar a');
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
