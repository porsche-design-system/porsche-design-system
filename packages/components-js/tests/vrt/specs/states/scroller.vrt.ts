import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';
import {
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/styles';

const component = 'scroller';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-scroller scroll-to-position="{scrollPosition: 10}" style="max-width: 300px;">
      <a href="#">Anchor</a>
      <a href="#">Anchor</a>
      <a href="#">Anchor</a>
      <a href="#">Anchor</a>
      <a href="#">Anchor</a>
      <a href="#">Anchor</a>
      <a href="#">Anchor</a>
      <a href="#">Anchor</a>
      <a href="#">Anchor</a>
    </p-scroller>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-scroller >>> button'); // Scroll indicator hover
  await forceFocusVisibleState(page, '.focus p-scroller >>> .scroll-wrapper');
  await forceHoverState(page, '.focus-hover p-scroller >>> button');
  await forceFocusVisibleState(page, '.focus-hover p-scroller >>> .scroll-wrapper');
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
