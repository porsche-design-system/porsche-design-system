import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { type Theme } from '@porsche-design-system/styles';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'checkbox';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-checkbox label="When input gets hovered or focused" name="some-name"></p-checkbox>
    <p-checkbox class="force-label" label="When label gets hovered or focused" name="some-name" ></p-checkbox>
    <p-checkbox label="Disabled" name="some-name" disabled ></p-checkbox>
    <p-checkbox label="Disabled and checked" name="some-name" checked disabled ></p-checkbox>
    <p-checkbox label="Loading" loading="true" name="some-name" ></p-checkbox>
    <p-checkbox label="Loading and Checked" loading="true" name="some-name" checked ></p-checkbox>
    <p-checkbox label="State error" state="error" message="Some error validation message." name="some-name" ></p-checkbox>
    <p-checkbox label="State success" state="success" message="Some success validation message." name="some-name" ></p-checkbox>
    <p-checkbox label="Checked" name="some-name" checked ></p-checkbox>
    <p-checkbox label="Checked with state error" state="error" message="Some error validation message." name="some-name" checked ></p-checkbox>
    <p-checkbox label="Checked with state success" state="success" message="Some success validation message." name="some-name" checked ></p-checkbox>
    <p-checkbox name="some-name">
      <span slot="label">
        Slotted label
      </span>
    </p-checkbox>
    <p-checkbox label="State error" state="error" name="some-name">
      <span slot="message">
        Slotted error message
      </span>
    </p-checkbox>
    <p-checkbox label="State success" state="success" name="some-name">
      <span slot="message">
        Slotted success message
      </span>
    </p-checkbox>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'block' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-checkbox:not(.force-label) >>> input');
  await forceHoverState(page, '.hover p-checkbox.force-label >>> .label-wrapper');
  await forceHoverState(page, '.hover p-checkbox span a');
  await forceFocusVisibleState(page, '.focus p-checkbox >>> input');
  await forceFocusVisibleState(page, '.focus p-checkbox span a');
  await forceFocusHoverState(page, '.focus-hover p-checkbox:not(.force-label) >>> input');
  await forceFocusVisibleState(page, '.focus-hover p-checkbox.force-label >>> input');
  await forceHoverState(page, '.focus-hover p-checkbox.force-label >>> .label-wrapper');
  await forceFocusHoverState(page, '.focus-hover p-checkbox span a');
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
