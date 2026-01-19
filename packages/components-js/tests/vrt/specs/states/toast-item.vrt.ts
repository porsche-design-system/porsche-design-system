import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { type Theme } from '@porsche-design-system/emotion';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'toast-item';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const getTop = (index: number) => {
    switch (index) {
      case 0:
        return '50px';
      case 1:
        return '175px';
      case 2:
        return '300px';
    }
  };
  const markup = (index: number) => `
<div style="height: 60px;">
    <!-- toast item needs overwriting styles to render correctly -->
    <div style="position: fixed; top: ${getTop(index)}; left: 16px">
      <p-toast-item text="Some message" style="opacity: 1;"></p-toast-item>
    </div>
</div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-toast-item >>> p-button >>> button');
  await forceFocusVisibleState(page, '.focus p-toast-item >>> p-button >>> button');
  await forceFocusHoverState(page, '.focus-hover p-toast-item >>> p-button >>> button');
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
