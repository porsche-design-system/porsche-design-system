import { expect, type Page, test } from '@playwright/test';
import { typemThememgn-system/emotion';
import { scemotion viewportWidschemes, themes,}viewportWidthM '@porsche-design-system/shared/shared/testing';
import {
  forceFocusHoverState,
  forceFocusState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'input-tel';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const head = `
    <style>
      .playground > div {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        width: 100%;
      }
      .playground div:not(:last-child) {
        margin-bottom: 1rem;
      }
      input[type="tel"] { min-height: initial; }
    </style>`;

  const markup = () => `
    <div>
      <p-input-tel label="Default" value="+49 123 456789"></p-input-tel>
      <p-input-tel label="Error" state="error" message="Error" value="+49 123 456789"></p-input-tel>
      <p-input-tel label="Success" state="success" message="Success" value="+49 123 456789"></p-input-tel>
    </div>
    <div>
      <p-input-tel label="Readonly" value="+49 123 456789" read-only></p-input-tel>
      <p-input-tel label="Readonly Error" state="error" message="Error" value="+49 123 456789" read-only></p-input-tel>
      <p-input-tel label="Readonly Success" state="success" message="Success" value="+49 123 456789" read-only></p-input-tel>
    </div>
    <div>
      <p-input-tel label="Disabled" value="+49 123 456789" disabled></p-input-tel>
      <p-input-tel label="Disabled Error" state="error" message="Error" value="+49 123 456789" disabled></p-input-tel>
      <p-input-tel label="Disabled Success" state="success" message="Success" value="+49 123 456789" disabled></p-input-tel>
    </div>
    <div>
      <p-input-tel value="+49 123 456789">
        <span slot="label">
          Slotted label
        </span>
        <span slot="description">
          Slotted description
        </span>
      </p-input-tel>
      <p-input-tel label="Error" description="Some description" state="error" value="+49 123 456789">
        <span slot="message">
          Slotted error message
        </span>
      </p-input-tel>
      <p-input-tel label="Success" description="Some description" state="success" value="+49 123 456789">
        <span slot="message">
          Slotted success message
        </span>
      </p-input-tel>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  // Hover states
  await forceHoverState(page, '.hover p-input-tel >>> .wrapper');
  await forceHoverState(page, '.hover p-input-tel >>> p-button-pure >>> button');

  // Focus states
  await forceFocusState(page, '.focus p-input-tel >>> input');
  await forceFocusState(page, '.focus p-input-tel >>> p-button-pure >>> button');
  await forceFocusVisibleState(page, '.focus p-input-tel >>> p-button-pure >>> button');

  // Focus + hover states
  await forceFocusHoverState(page, '.focus-hover p-input-tel >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-tel >>> p-button-pure >>> button');
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
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-${scheme}.png`);
    });
  });
});
