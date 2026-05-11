import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { type Theme } from '@porsche-design-system/styles';
import {
  forceFocusHoverState,
  forceFocusState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'textarea';

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
      textarea { min-height: initial; }
    </style>`;

  const markup = () => `
    <div>
      <p-textarea label="Default" value="Value"></p-textarea>
      <p-textarea label="Error" state="error" message="Error" value="Value"></p-textarea>
      <p-textarea label="Success" state="success" message="Success" value="Value"></p-textarea>
    </div>
    <div>
      <p-textarea label="Readonly" value="Value" read-only></p-textarea>
      <p-textarea label="Readonly Error" state="error" message="Error" value="Value" read-only></p-textarea>
      <p-textarea label="Readonly Success" state="success" message="Success" value="Value" read-only></p-textarea>
    </div>
    <div>
      <p-textarea label="Disabled" value="Value" disabled></p-textarea>
      <p-textarea label="Disabled Error" state="error" message="Error" value="Value" disabled></p-textarea>
      <p-textarea label="Disabled Success" state="success" message="Success" value="Value" disabled></p-textarea>
    </div>
    <div>
      <p-textarea value="Value">
        <span slot="label">
          Slotted label
        </span>
        <span slot="description">
          Slotted description
        </span>
      </p-textarea>
      <p-textarea label="Error" description="Some description" state="error" value="Value">
        <span slot="message">
          Slotted error message
        </span>
      </p-textarea>
      <p-textarea label="Success" description="Some description" state="success" value="Value">
        <span slot="message">
          Slotted success message
        </span>
      </p-textarea>
    </div>
    <div>
      <p-textarea class="force-label" label="Label gets hovered or focussed" value="Value"></p-textarea>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-textarea:not(.force-label) textarea');
  await forceHoverState(page, '.hover p-textarea.force-label >>> .label-wrapper');
  await forceHoverState(page, '.hover p-textarea a');

  await forceFocusState(page, '.focus p-textarea textarea');
  await forceFocusVisibleState(page, '.focus p-textarea a');

  await forceFocusHoverState(page, '.focus-hover p-textarea:not(.force-label) textarea');

  await forceFocusState(page, '.focus-hover p-textarea.force-label textarea');
  await forceHoverState(page, '.focus-hover p-textarea.force-label >>> .label-wrapper');
  await forceFocusHoverState(page, '.focus-hover p-textarea a');
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
