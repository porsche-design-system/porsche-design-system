import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  getValueOfForAttribute,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
  forceFocusState,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/styles';

const component = 'pin-code';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-pin-code theme="${theme}" label="input gets hovered or focused"></p-pin-code>
    <p-pin-code class="force-label" theme="${theme}" label="label gets hovered or focused"></p-pin-code>
    <p-pin-code theme="${theme}" label="Disabled" disabled="true"></p-pin-code>
    <p-pin-code theme="${theme}" label="Error state" state="error" message="Some error validation message."></p-pin-code>
    <p-pin-code theme="${theme}" label="Success state" state="success" message="Some success validation message."></p-pin-code>
    <p-pin-code theme="${theme}">
      <span slot="label">
        Slotted label
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </span>
    </p-pin-code>
    <p-pin-code theme="${theme}" label="Some label" state="error">
      <span slot="description">
        Slotted description
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </span>
    </p-pin-code>
    <p-pin-code theme="${theme}" label="Some label" state="error">
      <span slot="message">
        Slotted error message
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </span>
    </p-pin-code>
    <p-pin-code theme="${theme}" label="Some label" state="success">
      <span slot="message">
        Slotted success message
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </span>
    </p-pin-code>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-pin-code:not(.force-label) >>> input');
  await forceHoverState(page, '.hover p-pin-code.force-label >>> label');
  await forceHoverState(
    page,
    `.hover p-pin-code.force-label >>> #${await getValueOfForAttribute(page, 'p-pin-code label')}`
  );
  await forceHoverState(page, '.hover p-pin-code span a');
  await forceFocusState(page, '.focus p-pin-code >>> input');
  await forceFocusVisibleState(page, '.focus p-pin-code span a');
  await forceFocusHoverState(page, '.focus-hover p-pin-code:not(.force-label) >>> input');
  await forceFocusState(page, '.focus-hover p-pin-code.force-label >>> input');
  await forceHoverState(page, '.focus-hover p-pin-code.force-label >>> label');
  await forceFocusHoverState(page, '.focus-hover p-pin-code span a');
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
