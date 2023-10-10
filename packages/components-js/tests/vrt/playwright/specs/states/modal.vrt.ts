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
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'modal';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <div style="transform: translate(0); height: 300px; margin: 0 -16px;">
      <p-modal open="true">
        <div slot="heading">
          Some slotted heading
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </div>
        Some content
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </p-modal>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-modal a');
  // due to custom hover state we need to set hover also on component itself
  await forceHoverState(page, '.hover p-modal >>> p-button-pure');
  await forceHoverState(page, '.hover p-modal >>> p-button-pure >>> button');
  await forceFocusState(page, '.focus p-modal a');
  await forceFocusState(page, '.focus p-modal >>> div');
  await forceFocusState(page, '.focus p-modal >>> p-button-pure >>> button');
  await forceFocusHoverState(page, '.focus-hover p-modal a');
  await forceFocusHoverState(page, '.focus-hover p-modal >>> div');
  // due to custom hover state we need to set hover also on component itself
  await forceFocusHoverState(page, '.focus-hover p-modal >>> p-button-pure');
  await forceFocusHoverState(page, '.focus-hover p-modal >>> p-button-pure >>> button');
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
