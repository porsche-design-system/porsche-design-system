import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getBodyMarkup,
  GetMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import { getVisualRegressionStatesTester } from '@porsche-design-system/shared/testing';
import { TagName } from '@porsche-design-system/shared';

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('form-field-wrapper-states', async () => {
      const page = vrt.getPage();

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
        'p-radio-button-wrapper': '<input type="radio" />', // readonly is not supported
        'p-select-wrapper': '<select><option>Some value</option></select>', // readonly is not supported
        'p-text-field-wrapper': '<input type="text" value="Some value" />',
        'p-textarea-wrapper': '<textarea>Some value</textarea>',
      };

      const getElementsMarkup: GetMarkup = () =>
        Object.entries(tagNameToChildMap)
          .map(
            ([tag, child]) => `<div>
  <${tag} label="Default">
    ${child}
  </${tag}>
  <${tag} label="Readonly">
    ${child.replace(/((?: \/)?>)/, ' readonly$1')}
  </${tag}>
  <${tag} label="Disabled">
    ${child.replace(/((?: \/)?>)/, ' disabled$1')}
  </${tag}>
  <${tag} label="Error" state="error" message="Error">
    ${child}
  </${tag}>
  <${tag} label="Disabled" state="error" message="Error">
    ${child.replace(/((?: \/)?>)/, ' disabled$1')}
  </${tag}>
  <${tag} label="Success" state="success" message="Success">
    ${child}
  </${tag}>
  <${tag} label="Disabled" state="success" message="Success">
    ${child.replace(/((?: \/)?>)/, ' disabled$1')}
  </${tag}>
</div>`
          )
          .join('\n');

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover input');
      await forceHoverState(page, '.hover select');
      await forceHoverState(page, '.hover textarea');
      await forceFocusState(page, '.focus input');
      await forceFocusState(page, '.focus select');
      await forceFocusState(page, '.focus textarea');
      await forceFocusHoverState(page, '.focus-hover input');
      await forceFocusHoverState(page, '.focus-hover select');
      await forceFocusHoverState(page, '.focus-hover textarea');
    })
  ).toBeFalsy();
});
