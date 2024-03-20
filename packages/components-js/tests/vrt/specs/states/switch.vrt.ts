import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt.config';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'switch';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-switch>Label</p-switch>
    <p-switch checked="true">Label</p-switch>
    <p-switch loading="true">Loading</p-switch>
    <p-switch loading="true" checked="true">Loading</p-switch>
    <p-switch>
      Label
      <span>
        and some slotted, deeply nested <a href="#">anchor</a>.
      </span>
    </p-switch>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'inline' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-switch >>> button');
  await forceHoverState(page, '.hover p-switch span a');
  await forceFocusVisibleState(page, '.focus p-switch'); // native outline should not be visible
  await forceFocusVisibleState(page, '.focus p-switch >>> button');
  await forceFocusVisibleState(page, '.focus p-switch span a');
  await forceFocusHoverState(page, '.focus-hover p-switch >>> button');
  await forceFocusHoverState(page, '.focus-hover p-switch span a');
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
