import { expect, type Page, test } from '@playwright/test';
import {
  baseThemes,
  baseViewportWidth,
  getPlaygroundPseudoStatesMarkup,
  setContentWithDesignSystem,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';
import { type TagName } from '@porsche-design-system/shared';

const component = 'form-fields';

const scenario = async (page: Page, theme: Theme): Promise<void> => {
  const head = `
    <style>
      .playground div { display: flex; }
      .playground div > * { width: 20%; }
      .playground div > *:not(:last-child) {
        margin-right: 1rem;
        margin-bottom: 1rem;
      }
      textarea { min-height: initial; }
    </style>`;

  const tagNameToChildMap: { [key in TagName]?: string } = {
    'p-checkbox-wrapper': '<input type="checkbox" />', // readonly is not supported
    'p-pin-code': '', // readonly is not supported
    'p-radio-button-wrapper': '<input type="radio" />', // readonly is not supported
    'p-select-wrapper': '<select><option>Some value</option></select>', // readonly is not supported
    'p-text-field-wrapper': '<input type="text" value="Some value" />',
    'p-textarea-wrapper': '<textarea>Some value</textarea>',
  };

  const markup = () =>
    Object.entries(tagNameToChildMap)
      .map(([tag, child]) => {
        const childDisabled = child.replace(/((?: \/)?>)/, ' disabled$1');
        const childReadonly = child.replace(/((?: \/)?>)/, ' readonly$1')

        return `
<div>
  <${tag} label="Default">
    ${child}
  </${tag}>
  <${tag} label="Readonly">
    ${childReadonly}
  </${tag}>
  <${tag} label="Disabled" ${tag === 'p-pin-code' && 'disabled="true"'}>
    ${childDisabled}
  </${tag}>
  <${tag} label="Error" state="error" message="Error">
    ${child}
  </${tag}>
  <${tag} label="Disabled" state="error" message="Error" ${tag === 'p-pin-code' && 'disabled="true"'}>
    ${childDisabled}
  </${tag}>
  <${tag} label="Success" state="success" message="Success">
    ${child}
  </${tag}>
  <${tag} label="Disabled" state="success" message="Success" ${tag === 'p-pin-code' && 'disabled="true"'}>
    ${childDisabled}
  </${tag}>
</div>`.replace(/(<p-select-wrapper)/g, '$1 native'); // native select is easier to force states on
      })
      .join('\n');

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
  });

  await forceHoverState(page, '.hover input');
  await forceHoverState(page, '.hover select');
  await forceHoverState(page, '.hover textarea');
  await forceFocusState(page, '.focus input');
  await forceFocusState(page, '.focus select');
  await forceFocusState(page, '.focus textarea');
  await forceFocusHoverState(page, '.focus-hover input');
  await forceFocusHoverState(page, '.focus-hover select');
  await forceFocusHoverState(page, '.focus-hover textarea');
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
});
