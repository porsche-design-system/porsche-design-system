import { expect, Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';
import { Theme } from '@porsche-design-system/utilities-v2';

const component = 'banner';

const scenario = async (page: Page, theme: Theme, index: number, scheme?: PrefersColorScheme): Promise<void> => {
  const height = 300;
  const bannerTopBase = 56;

  const markup = () => `
    <div style="transform: translate(0); height: ${height}px; margin: 0 -16px;">
      <p-banner open="true" state="neutral" style="--p-banner-position-top: ${bannerTopBase * index++ + height}px">
        <span slot="title">
          Slotted title
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </span>
        <span slot="description">
          Slotted description
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </span>
      </p-banner>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-banner span a');
  // TODO: support for 3rd level of shadow DOM is missing
  // await forceHoveredState(page, '.hover p-banner >>> p-inline-notification >>> p-button-pure >>> button');
  await forceFocusVisibleState(page, '.focus p-banner span a');
  // await forceFocusedState(page, '.focus p-banner >>> p-inline-notification >>> p-button-pure >>> button');
  await forceFocusHoverState(page, '.focus-hover p-banner span a');
  // await forceFocusedHoveredState(page, '.focus-hover p-banner >>> p-inline-notification >>> p-button-pure >>> button');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  themes.forEach((theme, index) => {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme, index);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-${theme}.png`);
    });
  });

  schemes.forEach((scheme, index) => {
    test(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', index, scheme);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-${scheme}.png`); // fixture is aliased since result has to be equal
    });
  });
});
