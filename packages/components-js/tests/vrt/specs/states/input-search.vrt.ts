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

const component = 'input-search';

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
      input[type="search"] { min-height: initial; }
    </style>`;

  const markup = () => `
    <div>
      <p-input-search label="Default" value="Some value"></p-input-search>
      <p-input-search label="Error" state="error" message="Error" value="Some value"></p-input-search>
      <p-input-search label="Success" state="success" message="Success" value="Some value"></p-input-search>
    </div>
    <div>
      <p-input-search label="Readonly" value="Some value" read-only></p-input-search>
      <p-input-search label="Readonly Error" state="error" message="Error" value="Some value" read-only></p-input-search>
      <p-input-search label="Readonly Success" state="success" message="Success" value="Some value" read-only></p-input-search>
    </div>
    <div>
      <p-input-search label="Disabled" value="Some value" disabled></p-input-search>
      <p-input-search label="Disabled Error" state="error" message="Error" value="Some value" disabled></p-input-search>
      <p-input-search label="Disabled Success" state="success" message="Success" value="Some value" disabled></p-input-search>
    </div>
    <div>
      <p-input-search value="Some value">
        <span slot="label">
          Slotted label
        </span>
        <span slot="description">
          Slotted description
        </span>
      </p-input-search>
      <p-input-search label="Error" description="Some description" state="error" value="Some value">
        <span slot="message">
          Slotted error message
        </span>
      </p-input-search>
      <p-input-search label="Success" description="Some description" state="success" value="Some value">
        <span slot="message">
          Slotted success message
        </span>
      </p-input-search>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  // Hover states
  await forceHoverState(page, '.hover p-input-search >>> .wrapper');
  await forceHoverState(page, '.hover p-input-search >>> p-button-pure >>> button');

  // Focus states
  await forceFocusState(page, '.focus p-input-search >>> input');
  await forceFocusState(page, '.focus p-input-search >>> p-button-pure >>> button');
  await forceFocusVisibleState(page, '.focus p-input-search >>> p-button-pure >>> button');

  // Focus + hover states
  await forceFocusHoverState(page, '.focus-hover p-input-search >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-search >>> p-button-pure >>> button');
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
