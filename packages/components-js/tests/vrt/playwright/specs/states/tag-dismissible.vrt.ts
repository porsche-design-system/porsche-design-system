import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt.config';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
  thresholdConfig,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'tag-dismissible';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-tag-dismissible>Some Text</p-tag-dismissible>
    <p-tag-dismissible label="Some Label" color="background-base">Some Text</p-tag-dismissible>
    <p-tag-dismissible label="Some Label" color="background-surface">Some Text</p-tag-dismissible>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'inline' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-tag-dismissible >>> button');
  await forceFocusState(page, '.focus p-tag-dismissible'); // native outline should not be visible
  await forceFocusState(page, '.focus p-tag-dismissible >>> button');
  await forceFocusHoverState(page, '.focus-hover p-tag-dismissible >>> button');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  themes.forEach((theme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${viewportWidthM}-states-theme-${theme}.png`,
        thresholdConfig
      );
    });
  });

  schemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${viewportWidthM}-states-theme-${scheme}.png`,
        thresholdConfig
      ); // fixture is aliased since result has to be equal
    });
  });
});
