import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { type Theme } from '@porsche-design-system/emotion';
import {
  forceFocusHoverState,
  forceFocusState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'input-text';

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
      input[type="text"] { min-height: initial; }
    </style>`;

  const markup = () => `
    <div>
      <p-input-text label="Default" value="Hello"></p-input-text>
      <p-input-text label="Error" state="error" message="Error" value="Hello"></p-input-text>
      <p-input-text label="Success" state="success" message="Success" value="Hello"></p-input-text>
    </div>
    <div>
      <p-input-text label="Readonly" value="Hello" read-only></p-input-text>
      <p-input-text label="Readonly Error" state="error" message="Error" value="Hello" read-only></p-input-text>
      <p-input-text label="Readonly Success" state="success" message="Success" value="Hello" read-only></p-input-text>
    </div>
    <div>
      <p-input-text label="Disabled" value="Hello" disabled></p-input-text>
      <p-input-text label="Disabled Error" state="error" message="Error" value="Hello" disabled></p-input-text>
      <p-input-text label="Disabled Success" state="success" message="Success" value="Hello" disabled></p-input-text>
    </div>
    <div>
      <p-input-text value="Hello">
        <span slot="label">
          Slotted label
        </span>
        <span slot="description">
          Slotted description
        </span>
      </p-input-text>
      <p-input-text label="Error" description="Some description" state="error" value="Hello">
        <span slot="message">
          Slotted error message
        </span>
      </p-input-text>
      <p-input-text label="Success" description="Some description" state="success" value="Hello">
        <span slot="message">
          Slotted success message
        </span>
      </p-input-text>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  // Hover states
  await forceHoverState(page, '.hover p-input-text >>> .wrapper');
  await forceHoverState(page, '.hover p-input-text >>> p-button-pure >>> button');

  // Focus states
  await forceFocusState(page, '.focus p-input-text >>> input');
  await forceFocusState(page, '.focus p-input-text >>> p-button-pure >>> button');
  await forceFocusVisibleState(page, '.focus p-input-text >>> p-button-pure >>> button');

  // Focus + hover states
  await forceFocusHoverState(page, '.focus-hover p-input-text >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-text >>> p-button-pure >>> button');
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
