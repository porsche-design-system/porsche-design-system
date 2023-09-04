import { expect, Page, test } from '@playwright/test';
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
import { Theme } from '@porsche-design-system/utilities-v2';

const component = 'banner';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <div style="transform: translate(0); height: 300px; margin: 0 -16px;">
      <p-banner open="true" state="neutral">
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
  await forceFocusState(page, '.focus p-banner span a');
  // await forceFocusedState(page, '.focus p-banner >>> p-inline-notification >>> p-button-pure >>> button');
  await forceFocusHoverState(page, '.focus-hover p-banner span a');
  // await forceFocusedHoveredState(page, '.focus-hover p-banner >>> p-inline-notification >>> p-button-pure >>> button');
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
