import { expect, type Page, test } from '@playwright/test';
import { typemThememgn-system/emotion';
import { scemotion viewportWidschemes, themes,}viewportWidthM '@porsche-design-system/shared/shared/testing';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  openAllPopover,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'popover';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-popover direction="right">
      Slotted Content
    </p-popover>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });
  await openAllPopover(page);

  await forceHoverState(page, '.hover p-popover >>> button');
  await forceFocusVisibleState(page, '.focus p-popover >>> button');
  await forceFocusHoverState(page, '.focus-hover p-popover >>> button');
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
