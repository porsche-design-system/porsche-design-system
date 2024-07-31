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

const component = 'stepper-horizontal';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-stepper-horizontal>
      <p-stepper-horizontal-item state="warning">Warning</p-stepper-horizontal-item>
      <p-stepper-horizontal-item state="complete">Complete</p-stepper-horizontal-item>
      <p-stepper-horizontal-item state="warning" disabled>Warning Disabled</p-stepper-horizontal-item>
      <p-stepper-horizontal-item state="complete" disabled>Complete Disabled</p-stepper-horizontal-item>
      <p-stepper-horizontal-item state="current">Current</p-stepper-horizontal-item>
      <p-stepper-horizontal-item>Default</p-stepper-horizontal-item>
    </p-stepper-horizontal>
    <p-stepper-horizontal size="medium">
      <p-stepper-horizontal-item state="warning">Warning</p-stepper-horizontal-item>
      <p-stepper-horizontal-item state="complete">Complete</p-stepper-horizontal-item>
      <p-stepper-horizontal-item state="warning" disabled>Warning Disabled</p-stepper-horizontal-item>
      <p-stepper-horizontal-item state="complete" disabled>Complete Disabled</p-stepper-horizontal-item>
      <p-stepper-horizontal-item state="current">Current</p-stepper-horizontal-item>
      <p-stepper-horizontal-item>Default</p-stepper-horizontal-item>
    </p-stepper-horizontal>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-stepper-horizontal p-stepper-horizontal-item >>> button');
  await forceFocusVisibleState(page, '.focus p-stepper-horizontal p-stepper-horizontal-item >>> button');
  await forceFocusHoverState(page, '.focus-hover p-stepper-horizontal p-stepper-horizontal-item >>> button');
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
