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

const component = 'radio-group';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const getRadioGroupOptionsMarkup = (loading?: boolean): string => `
      <p-radio-group-option label="Some Label A" value="a" ${loading ? 'loading="true"' : ''}></p-radio-group-option>
      <p-radio-group-option label="Some Label B" value="b"></p-radio-group-option>
      <p-radio-group-option label="Some Label C" value="c"></p-radio-group-option>
  `;

  const markup = () => `
    <p-radio-group name="some-name" label="When input gets hovered or focused">
      ${getRadioGroupOptionsMarkup()}
    </p-radio-group>

    <p-radio-group name="some-name" class="force-label" label="When label gets hovered or focused">
      ${getRadioGroupOptionsMarkup()}
    </p-radio-group>

    <p-radio-group name="some-name-disabled" disabled label="Disabled">
      ${getRadioGroupOptionsMarkup()}
    </p-radio-group>

    <p-radio-group name="some-name-disabled-checked" disabled value="a" label="Disabled and checked">
      ${getRadioGroupOptionsMarkup()}
    </p-radio-group>

    <p-radio-group name="some-name-loading" loading label="Loading">
      ${getRadioGroupOptionsMarkup()}
    </p-radio-group>

    <p-radio-group name="some-name-loading-option" label="Loading option">
      ${getRadioGroupOptionsMarkup(true)}
    </p-radio-group>

    <p-radio-group name="some-name-loading-and-loading-option" loading label="Loading and Loading option">
      ${getRadioGroupOptionsMarkup(true)}
    </p-radio-group>

    <p-radio-group name="some-name-loading-checked" loading value="a" label="Loading and checked">
      ${getRadioGroupOptionsMarkup()}
    </p-radio-group>

    <p-radio-group name="some-name-loading-option-and-checked" value="a" label="Loading option and checked">
      ${getRadioGroupOptionsMarkup(true)}
    </p-radio-group>

    <p-radio-group name="some-name-state-error" label="State error" state="error" message="Some error validation message.">
      ${getRadioGroupOptionsMarkup()}
    </p-radio-group>

    <p-radio-group name="some-name-state-success" label="State success" state="success" message="Some success validation message.">
      ${getRadioGroupOptionsMarkup()}
    </p-radio-group>

    <p-radio-group name="some-name-checked" label="Checked" value="a">
      ${getRadioGroupOptionsMarkup()}
    </p-radio-group>

    <p-radio-group name="some-name-checked-state-error" value="a" label="Checked with state error" state="error" message="Some error validation message.">
      ${getRadioGroupOptionsMarkup()}
    </p-radio-group>

    <p-radio-group name="some-name-checked-state-success" value="a" label="Checked with state success" state="success" message="Some success validation message.">
      ${getRadioGroupOptionsMarkup()}
    </p-radio-group>

    <p-radio-group name="some-name">
      <span slot="label">Slotted label</span>
      ${getRadioGroupOptionsMarkup()}
    </p-radio-group>

    <p-radio-group name="some-name" label="State error" state="error">
      ${getRadioGroupOptionsMarkup()}
      <span slot="message">Slotted error message</span>
    </p-radio-group>

    <p-radio-group name="some-name" label="State success" state="success">
      ${getRadioGroupOptionsMarkup()}
      <span slot="message">Slotted error message</span>
    </p-radio-group>
`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'block' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-radio-group:not(.force-label) p-radio-group-option:first-of-type >>> input');
  await forceHoverState(page, '.hover p-radio-group.force-label p-radio-group-option:first-of-type >>> .label-wrapper');
  await forceFocusVisibleState(page, '.focus p-radio-group p-radio-group-option:first-of-type >>> input');
  await forceFocusHoverState(
    page,
    '.focus-hover p-radio-group:not(.force-label) p-radio-group-option:first-of-type >>> input'
  );
  await forceFocusVisibleState(
    page,
    '.focus-hover p-radio-group.force-label p-radio-group-option:first-of-type >>> input[type="radio"]'
  );
  await forceHoverState(
    page,
    '.focus-hover p-radio-group.force-label p-radio-group-option:first-of-type >>> .label-wrapper'
  );
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
