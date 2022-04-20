import { isRequiredAndParentNotRequired } from './isRequiredAndParentNotRequired';

const fieldsetWrapper = 'p-fieldset-wrapper';
it.each<[{ parentTagName: string; parentRequired: boolean; inputRequired: boolean }, boolean]>([
  [{ parentTagName: fieldsetWrapper, parentRequired: true, inputRequired: true }, false],
  [{ parentTagName: fieldsetWrapper, parentRequired: false, inputRequired: true }, true],
  [{ parentTagName: 'div', parentRequired: false, inputRequired: true }, true],
  [{ parentTagName: 'div', parentRequired: false, inputRequired: false }, false],
])('should for "%p" return "%s"', ({ parentTagName, parentRequired, inputRequired }, result) => {
  const parent = document.createElement(parentTagName);
  const child = document.createElement('p-textfield-wrapper');
  const input = document.createElement('input');
  parent.appendChild(child);
  child.appendChild(input);

  parent['required'] = parentRequired;
  input.required = inputRequired;

  expect(isRequiredAndParentNotRequired(child, input)).toBe(result);
});
