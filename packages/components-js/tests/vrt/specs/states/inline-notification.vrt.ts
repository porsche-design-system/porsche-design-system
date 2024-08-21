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

const component = 'inline-notification';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-inline-notification action-label="Retry">
      <span slot="heading">
        Slotted heading
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </span>
      Slotted description
      <span>
        and some slotted, deeply nested <a href="#">anchor</a>.
      </span>
    </p-inline-notification>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-inline-notification a');
  await forceHoverState(page, '.hover p-inline-notification >>> p-button >>> button');
  await forceHoverState(page, '.hover p-inline-notification >>> p-button-pure >>> button');
  await forceFocusVisibleState(page, '.focus p-inline-notification a');
  await forceFocusVisibleState(page, '.focus p-inline-notification >>> p-button >>> button');
  await forceFocusVisibleState(page, '.focus p-inline-notification >>> p-button-pure >>> button');
  await forceFocusHoverState(page, '.focus-hover p-inline-notification a');
  await forceFocusHoverState(page, '.focus-hover p-inline-notification >>> p-button >>> button');
  await forceFocusHoverState(page, '.focus-hover p-inline-notification >>> p-button-pure >>> button');
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
