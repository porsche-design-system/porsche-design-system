import { expect, type Page, test } from '@playwright/test';
import type { TagName } from '@porsche-design-system/shared';
import { themes, viewportWidthXXL } from '@porsche-design-system/shared/testing';
import type { Theme } from '@porsche-design-system/emotion';
import {
  forceFocusHoverState,
  forceFocusState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  getValueOfForAttribute,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'form-fields';

const scenario = async (page: Page, theme: Theme): Promise<void> => {
  const head = `
    <style>
      .playground div {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(0, 1fr);
        gap: 1rem;
        width: 100%;
       }
      textarea { min-height: initial; }
    </style>`;

  const tagNameToChildMap: { [key in TagName]?: string } = {
    'p-checkbox': '',
    'p-checkbox-wrapper': '<input type="checkbox" />', // readonly is not supported
    'p-radio-button-wrapper': '<input type="radio" />', // readonly is not supported
    'p-radio-group': '<p-radio-group-option label="Some value"></p-radio-group-option>', // readonly is not supported
    'p-select': '<p-select-option>Some value</p-select-option>', // readonly is not supported
    'p-select-wrapper': '<select><option>Some value</option></select>', // readonly is not supported
    'p-multi-select': '<p-multi-select-option>Some value</p-multi-select-option>', // readonly is not supported
    'p-text-field-wrapper': '<input type="text" value="Some value" />',
    'p-pin-code': '', // readonly is not supported
    'p-textarea': '',
    'p-textarea-wrapper': '<textarea>Some value</textarea>',
    'p-input-date': '',
    'p-input-email': '',
    'p-input-number': '',
    'p-input-password': '',
    'p-input-search': '',
    'p-input-tel': '',
    'p-input-text': '',
    'p-input-time': '',
    'p-input-url': '',
  };

  const markup = () =>
    Object.entries(tagNameToChildMap)
      .map(([tag, child]) => {
        const childDisabled = child.replace(/((?: \/)?>)/, ' disabled$1');
        const childReadonly = child.replace(/((?: \/)?>)/, ' readonly$1');
        const disabledAttribute =
          tag === 'p-pin-code' ||
          tag === 'p-multi-select' ||
          tag === 'p-textarea' ||
          tag === 'p-checkbox' ||
          tag === 'p-input-date' ||
          tag === 'p-input-time' ||
          tag === 'p-input-email' ||
          tag === 'p-input-number' ||
          tag === 'p-input-password' ||
          tag === 'p-input-search' ||
          tag === 'p-input-tel' ||
          tag === 'p-input-text' ||
          tag === 'p-input-url' ||
          tag === 'p-radio-group' ||
          tag === 'p-select'
            ? ' disabled="true"'
            : '';

        const readOnlyAttribute =
          tag === 'p-textarea' ||
          tag === 'p-input-date' ||
          tag === 'p-input-time' ||
          tag === 'p-input-email' ||
          tag === 'p-input-number' ||
          tag === 'p-input-password' ||
          tag === 'p-input-search' ||
          tag === 'p-input-tel' ||
          tag === 'p-input-text' ||
          tag === 'p-input-url'
            ? ' read-only="true"'
            : '';

        const valueAttribute =
          tag === 'p-textarea' ||
          tag === 'p-input-date' ||
          tag === 'p-input-time' ||
          tag === 'p-input-email' ||
          tag === 'p-input-number' ||
          tag === 'p-input-password' ||
          tag === 'p-input-search' ||
          tag === 'p-input-tel' ||
          tag === 'p-input-text' ||
          tag === 'p-radio-group' ||
          tag === 'p-input-url'
            ? ' value="Some value"'
            : '';

        return `
<div>
  <${tag} label="Default" ${valueAttribute}>
    ${child}
  </${tag}>
  <${tag} label="Readonly" ${valueAttribute} ${readOnlyAttribute}>
    ${childReadonly}
  </${tag}>
  <${tag} label="Disabled" ${valueAttribute} ${disabledAttribute}>
    ${childDisabled}
  </${tag}>
  <${tag} label="Error" state="error" message="Error" ${valueAttribute}>
    ${child}
  </${tag}>
  <${tag} label="Disabled" state="error" message="Error" ${valueAttribute} ${disabledAttribute}>
    ${childDisabled}
  </${tag}>
  <${tag} label="Success" state="success" message="Success" ${valueAttribute}>
    ${child}
  </${tag}>
  <${tag} label="Disabled" state="success" message="Success" ${valueAttribute} ${disabledAttribute}>
    ${childDisabled}
  </${tag}>
</div>`.replace(/(<p-select-wrapper)/g, '$1 native'); // native select is easier to force states on
      })
      .join('\n');

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
  });

  const valueOfForAttribute = await getValueOfForAttribute(page, 'p-pin-code label');

  await forceHoverState(page, '.hover input');
  await forceHoverState(page, '.hover p-checkbox >>> input');
  await forceHoverState(page, '.hover select');

  await forceHoverState(page, '.hover textarea');

  await forceHoverState(page, '.hover p-select >>> button');
  await forceHoverState(page, '.hover p-multi-select >>> button');
  await forceHoverState(page, `.hover p-pin-code >>> #${valueOfForAttribute}`);
  await forceFocusState(page, '.focus input[type="text"]');
  await forceFocusVisibleState(page, '.focus input[type="checkbox"]');
  await forceFocusVisibleState(page, '.focus input[type="radio"]');
  await forceFocusState(page, '.focus select');
  await forceFocusState(page, '.focus textarea');
  await forceFocusVisibleState(page, '.focus p-select >>> button');
  await forceFocusVisibleState(page, '.focus p-multi-select >>> button');
  await forceFocusVisibleState(page, '.focus p-checkbox >>> input');
  await forceFocusState(page, '.focus p-multi-select >>> button');
  await forceFocusState(page, `.focus p-pin-code >>> #${valueOfForAttribute}`);
  await forceFocusHoverState(page, '.focus-hover input');
  await forceFocusHoverState(page, '.focus-hover select');
  await forceFocusHoverState(page, '.focus-hover textarea');
  await forceFocusHoverState(page, '.focus-hover p-select >>> button');
  await forceFocusHoverState(page, '.focus-hover p-checkbox >>> input');
  await forceFocusVisibleState(page, '.focus-hover p-select >>> button');
  await forceFocusHoverState(page, '.focus-hover p-multi-select >>> button');
  await forceFocusHoverState(page, `.focus-hover p-pin-code >>> #${valueOfForAttribute}`);

  await forceHoverState(page, '.hover p-textarea >>> textarea');
  await forceFocusState(page, '.focus p-textarea >>> textarea');
  await forceFocusVisibleState(page, '.focus-hover p-textarea >>> textarea');
  await forceFocusHoverState(page, '.focus-hover p-textarea >>> textarea');

  await forceHoverState(page, '.hover p-input-date >>> .wrapper');
  await forceFocusState(page, '.focus p-input-date >>> input');
  await forceFocusVisibleState(page, '.focus-hover p-input-date >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-date >>> input');

  await forceHoverState(page, '.hover p-input-time >>> .wrapper');
  await forceFocusState(page, '.focus p-input-time >>> input');
  await forceFocusVisibleState(page, '.focus-hover p-input-time >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-time >>> input');

  await forceHoverState(page, '.hover p-input-email >>> .wrapper');
  await forceFocusState(page, '.focus p-input-email >>> input');
  await forceFocusVisibleState(page, '.focus-hover p-input-email >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-email >>> input');

  await forceHoverState(page, '.hover p-input-number >>> .wrapper');
  await forceFocusState(page, '.focus p-input-number >>> input');
  await forceFocusVisibleState(page, '.focus-hover p-input-number >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-number >>> input');

  await forceHoverState(page, '.hover p-input-password >>> .wrapper');
  await forceFocusState(page, '.focus p-input-password >>> input');
  await forceFocusVisibleState(page, '.focus-hover p-input-password >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-password >>> input');

  await forceHoverState(page, '.hover p-input-search >>> .wrapper');
  await forceFocusState(page, '.focus p-input-search >>> input');
  await forceFocusVisibleState(page, '.focus-hover p-input-search >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-search >>> input');

  await forceHoverState(page, '.hover p-input-tel >>> .wrapper');
  await forceFocusState(page, '.focus p-input-tel >>> input');
  await forceFocusVisibleState(page, '.focus-hover p-input-tel >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-tel >>> input');

  await forceHoverState(page, '.hover p-input-text >>> .wrapper');
  await forceFocusState(page, '.focus p-input-text >>> input');
  await forceFocusVisibleState(page, '.focus-hover p-input-text >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-text >>> input');

  await forceHoverState(page, '.hover p-input-url >>> .wrapper');
  await forceFocusState(page, '.focus p-input-url >>> input');
  await forceFocusVisibleState(page, '.focus-hover p-input-url >>> input');
  await forceFocusHoverState(page, '.focus-hover p-input-url >>> input');

  await forceHoverState(page, '.hover p-radio-group p-radio-group-option:first-of-type >>> input');
  await forceFocusVisibleState(page, '.focus p-radio-group p-radio-group-option:first-of-type >>> input');
  await forceFocusVisibleState(page, '.focus-hover p-radio-group-option:first-of-type >>> input');
  await forceFocusHoverState(page, '.focus-hover p-radio-group-option:first-of-type >>> input');
};

// executed in Chrome only
test.describe(component, () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  for (const theme of themes) {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme);
      await page.setViewportSize({ width: viewportWidthXXL, height: 600 });
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthXXL}-states-theme-${theme}.png`);
    });
  }
});
