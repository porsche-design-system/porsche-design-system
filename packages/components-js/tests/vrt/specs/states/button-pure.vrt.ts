import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/styles';

const component = 'button-pure';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-button-pure>Label default</p-button-pure>
    <p-button-pure loading="true">Label loading</p-button-pure>
    <p-button-pure align-label="left">Label align left</p-button-pure>
    <p-button-pure align-label="left" icon="logo-delicious">Label align left</p-button-pure>
    <p-button-pure hide-label="true">Without label</p-button-pure>
    <p-button-pure active="true">Label active</p-button-pure>
    <p-button-pure icon="none">Label icon none</p-button-pure>
    <p-button-pure style="padding: 1rem">Label with custom click-area</p-button-pure>
    <p-button-pure hide-label="true" style="padding: 1rem">Label with custom click-area</p-button-pure>
    <p-button-pure stretch="true">Label stretch</p-button-pure>
    <p-button-pure align-label="left" stretch="true">Label stretch align left</p-button-pure>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'inline' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-button-pure >>> button');
  await forceFocusVisibleState(page, '.focus p-button-pure'); // native outline should not be visible
  await forceFocusVisibleState(page, '.focus p-button-pure >>> button');
  await forceFocusHoverState(page, '.focus-hover p-button-pure >>> button');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  themes.forEach((theme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-${theme}.png`);
    });
  });

  schemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-${scheme}.png`); // fixture is aliased since result has to be equal
    });
  });
});
