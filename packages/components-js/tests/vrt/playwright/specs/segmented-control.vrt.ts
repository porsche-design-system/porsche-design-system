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

const component = 'segmented-control';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-segmented-control value="2">
      <p-segmented-control-item value="1">Default</p-segmented-control-item>
      <p-segmented-control-item value="2">Selected</p-segmented-control-item>
      <p-segmented-control-item value="3" disabled>Disabled</p-segmented-control-item>
    </p-segmented-control>
    <br>
    <p-segmented-control value="2">
      <p-segmented-control-item value="1" label="Some label">Default</p-segmented-control-item>
      <p-segmented-control-item value="2" label="Some label">Selected</p-segmented-control-item>
      <p-segmented-control-item value="3" label="Some label" disabled>Disabled</p-segmented-control-item>
    </p-segmented-control>
    <br>
    <p-segmented-control value="2">
      <p-segmented-control-item value="1" icon="arrow-head-right">Default</p-segmented-control-item>
      <p-segmented-control-item value="2" icon="arrow-head-right">Selected</p-segmented-control-item>
      <p-segmented-control-item value="3" icon="arrow-head-right" disabled>Disabled</p-segmented-control-item>
    </p-segmented-control>
    <br>
    <p-segmented-control value="2">
      <p-segmented-control-item value="1" label="Some label" icon="arrow-head-right">Default</p-segmented-control-item>
      <p-segmented-control-item value="2" label="Some label" icon="arrow-head-right">Selected</p-segmented-control-item>
      <p-segmented-control-item value="3" label="Some label" icon="arrow-head-right" disabled>Disabled</p-segmented-control-item>
    </p-segmented-control>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-segmented-control-item >>> button');
  await forceFocusState(page, '.focus p-segmented-control-item'); // native outline should not be visible
  await forceFocusState(page, '.focus p-segmented-control-item >>> button');
  await forceFocusHoverState(page, '.focus-hover p-segmented-control-item >>> button');
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
