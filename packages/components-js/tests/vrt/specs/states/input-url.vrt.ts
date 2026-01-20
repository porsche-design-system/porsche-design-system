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

const component = 'input-url';

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
      input[type="url"] { min-height: initial; }
    </style>`;

  const markup = () => `
    <div>
      <p-input-url label="Default" value="https://example.com"></p-input-url>
      <p-input-url label="Error" state="error" message="Error" value="https://example.com"></p-input-url>
      <p-input-url label="Success" state="success" message="Success" value="https://example.com"></p-input-url>
    </div>
    <div>
      <p-input-url label="Readonly" value="https://example.com" read-only></p-input-url>
      <p-input-url label="Readonly Error" state="error" message="Error" value="https://example.com" read-only></p-input-url>
      <p-input-url label="Readonly Success" state="success" message="Success" value="https://example.com" read-only></p-input-url>
    </div>
    <div>
      <p-input-url label="Disabled" value="https://example.com" disabled></p-input-url>
      <p-input-url label="Disabled Error" state="error" message="Error" value="https://example.com" disabled></p-input-url>
      <p-input-url label="Disabled Success" state="success" message="Success" value="https://example.com" disabled></p-input-url>
    </div>
    <div>
      <p-input-url value="https://example.com">
        <span slot="label">
          Slotted label
        </span>
        <span slot="description">
          Slotted description
        </span>
      </p-input-url>
      <p-input-url label="Error" description="Some description" state="error" value="https://example.com">
        <span slot="message">
          Slotted error message
        </span>
      </p-input-url>
      <p-input-url label="Success" description="Some description" state="success" value="https://example.com">
        <span slot="message">
          Slotted success message
        </span>
      </p-input-url>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  // Hover states
  await forceHoverState(page, '.hover p-input-url >>> .wrapper');
  await forceHoverState(page, '.hover p-input-url >>> p-button-pure >>> button');

  // Focus states
  await forceFocusState(page, '.focus p-input-url >>> input');
  await forceFocusState(page, '.focus p-input-url >>> p-button-pure >>> button');
  await forceFocusVisibleState(page, '.focus p-input-url >>> p-button-pure >>> button');

  // Focus + hover states
  await forceFocusHoverState(page, '.focus-hover p-input-url >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-url >>> p-button-pure >>> button');
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
