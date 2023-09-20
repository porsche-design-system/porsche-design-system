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

const component = 'checkbox-wrapper';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-checkbox-wrapper label="When input gets hovered or focused">
      <input type="checkbox" name="some-name" />
    </p-checkbox-wrapper>
    <p-checkbox-wrapper class="force-label" label="When label gets hovered or focused">
    <p-checkbox-wrapper label="Disabled">
      <input type="checkbox" name="some-name" disabled />
    </p-checkbox-wrapper>
    <p-checkbox-wrapper label="Disabled and checked">
      <input type="checkbox" name="some-name" checked disabled />
    </p-checkbox-wrapper>
    <p-checkbox-wrapper label="Loading" loading="true">
      <input type="checkbox" name="some-name" />
    </p-checkbox-wrapper>
    <p-checkbox-wrapper label="Loading and Checked" loading="true">
      <input type="checkbox" name="some-name" checked />
    </p-checkbox-wrapper>
    <p-checkbox-wrapper label="State error" state="error" message="Some error validation message.">
      <input type="checkbox" name="some-name" />
    </p-checkbox-wrapper>
    <p-checkbox-wrapper label="State success" state="success" message="Some success validation message.">
      <input type="checkbox" name="some-name" />
    </p-checkbox-wrapper>
    <p-checkbox-wrapper label="Checked">
      <input type="checkbox" name="some-name" checked/>
    </p-checkbox-wrapper>
    <p-checkbox-wrapper label="Checked with state error" state="error" message="Some error validation message.">
      <input type="checkbox" name="some-name" checked/>
    </p-checkbox-wrapper>
    <p-checkbox-wrapper label="Checked with state success" state="success" message="Some success validation message.">
      <input type="checkbox" name="some-name" checked />
    </p-checkbox-wrapper>
    <p-checkbox-wrapper>
      <span slot="label">
        Slotted label
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </span>
      <input type="checkbox" name="some-name" />
    </p-checkbox-wrapper>
    <p-checkbox-wrapper label="State error" state="error">
      <input type="checkbox" name="some-name" />
      <span slot="message">
        Slotted error message
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </span>
    </p-checkbox-wrapper>
    <p-checkbox-wrapper label="State success" state="success">
      <input type="checkbox" name="some-name" />
      <span slot="message">
        Slotted success message
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </span>
    </p-checkbox-wrapper>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'block' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-checkbox-wrapper:not(.force-label) input[type="checkbox"]');
  await forceHoverState(page, '.hover p-checkbox-wrapper.force-label >>> span');
  await forceHoverState(page, '.hover p-checkbox-wrapper span a');
  await forceFocusState(page, '.focus p-checkbox-wrapper input[type="checkbox"]');
  await forceFocusState(page, '.focus p-checkbox-wrapper span a');
  await forceFocusHoverState(page, '.focus-hover p-checkbox-wrapper:not(.force-label) input[type="checkbox"]');
  await forceFocusState(page, '.focus-hover p-checkbox-wrapper.force-label input[type="checkbox"]');
  await forceHoverState(page, '.focus-hover p-checkbox-wrapper.force-label >>> span');
  await forceFocusHoverState(page, '.focus-hover p-checkbox-wrapper span a');
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
