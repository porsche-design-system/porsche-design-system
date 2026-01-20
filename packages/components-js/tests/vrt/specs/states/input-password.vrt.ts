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

const component = 'input-password';

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
      input[type="password"] { min-height: initial; }
    </style>`;

  const markup = () => `
    <div>
      <p-input-password label="Default" value="password123"></p-input-password>
      <p-input-password label="Error" state="error" message="Error" value="password123"></p-input-password>
      <p-input-password label="Success" state="success" message="Success" value="password123"></p-input-password>
    </div>
    <div>
      <p-input-password label="Readonly" value="password123" read-only></p-input-password>
      <p-input-password label="Readonly Error" state="error" message="Error" value="password123" read-only></p-input-password>
      <p-input-password label="Readonly Success" state="success" message="Success" value="password123" read-only></p-input-password>
    </div>
    <div>
      <p-input-password label="Disabled" value="password123" disabled></p-input-password>
      <p-input-password label="Disabled Error" state="error" message="Error" value="password123" disabled></p-input-password>
      <p-input-password label="Disabled Success" state="success" message="Success" value="password123" disabled></p-input-password>
    </div>
    <div>
      <p-input-password value="password123">
        <span slot="label">
          Slotted label
        </span>
        <span slot="description">
          Slotted description
        </span>
      </p-input-password>
      <p-input-password label="Error" description="Some description" state="error" value="password123">
        <span slot="message">
          Slotted error message
        </span>
      </p-input-password>
      <p-input-password label="Success" description="Some description" state="success" value="password123">
        <span slot="message">
          Slotted success message
        </span>
      </p-input-password>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  // Hover states
  await forceHoverState(page, '.hover p-input-password >>> .wrapper');
  await forceHoverState(page, '.hover p-input-password >>> p-button-pure >>> button');

  // Focus states
  await forceFocusState(page, '.focus p-input-password >>> input');
  await forceFocusState(page, '.focus p-input-password >>> p-button-pure >>> button');
  await forceFocusVisibleState(page, '.focus p-input-password >>> p-button-pure >>> button');

  // Focus + hover states
  await forceFocusHoverState(page, '.focus-hover p-input-password >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-password >>> p-button-pure >>> button');
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
