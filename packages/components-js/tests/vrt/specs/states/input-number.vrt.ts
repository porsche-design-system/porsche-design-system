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

const component = 'input-number';

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
      input[type="number"] { min-height: initial; }
    </style>`;

  const markup = () => `
    <div>
      <p-input-number label="Default" value="42"></p-input-number>
      <p-input-number label="Error" state="error" message="Error" value="42"></p-input-number>
      <p-input-number label="Success" state="success" message="Success" value="42"></p-input-number>
    </div>
    <div>
      <p-input-number label="Readonly" value="42" read-only></p-input-number>
      <p-input-number label="Readonly Error" state="error" message="Error" value="42" read-only></p-input-number>
      <p-input-number label="Readonly Success" state="success" message="Success" value="42" read-only></p-input-number>
    </div>
    <div>
      <p-input-number label="Disabled" value="42" disabled></p-input-number>
      <p-input-number label="Disabled Error" state="error" message="Error" value="42" disabled></p-input-number>
      <p-input-number label="Disabled Success" state="success" message="Success" value="42" disabled></p-input-number>
    </div>
    <div>
      <p-input-number value="42">
        <span slot="label">
          Slotted label
        </span>
        <span slot="description">
          Slotted description
        </span>
      </p-input-number>
      <p-input-number label="Error" description="Some description" state="error" value="42">
        <span slot="message">
          Slotted error message
        </span>
      </p-input-number>
      <p-input-number label="Success" description="Some description" state="success" value="42">
        <span slot="message">
          Slotted success message
        </span>
      </p-input-number>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  // Hover states
  await forceHoverState(page, '.hover p-input-number >>> .wrapper');
  await forceHoverState(page, '.hover p-input-number >>> p-button-pure >>> button');

  // Focus states
  await forceFocusState(page, '.focus p-input-number >>> input');
  await forceFocusState(page, '.focus p-input-number >>> p-button-pure >>> button');
  await forceFocusVisibleState(page, '.focus p-input-number >>> p-button-pure >>> button');

  // Focus + hover states
  await forceFocusHoverState(page, '.focus-hover p-input-number >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-number >>> p-button-pure >>> button');
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
