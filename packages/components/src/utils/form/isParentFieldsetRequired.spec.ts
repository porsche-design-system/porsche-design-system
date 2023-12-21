import { isParentFieldsetRequired } from './isParentFieldsetRequired';
import * as isParentOfKindUtils from '../dom/isParentOfKind';
import * as isRequiredUtils from './isRequired';

it('should call isParentOfKind() with correct parameters', () => {
  const spy = jest.spyOn(isParentOfKindUtils, 'isParentOfKind');
  const child = document.createElement('div');

  isParentFieldsetRequired(child);

  expect(spy).toBeCalledWith(child, 'p-fieldset');
  expect(spy).toBeCalledWith(child, 'p-fieldset-wrapper');
  expect(spy).toBeCalledTimes(2);
});

it('should call isRequired() with correct parameters', () => {
  const spy = jest.spyOn(isRequiredUtils, 'isRequired');
  const parent = document.createElement('p-fieldset-wrapper');
  const child = document.createElement('div');
  parent.appendChild(child);

  isParentFieldsetRequired(child);

  expect(spy).toBeCalledWith(parent);
});

it.each<[boolean, boolean, boolean]>([
  [true, true, true],
  [false, true, false],
  [true, false, false],
  [false, false, false],
])('should for isRequired(): %s and isParentOfKind: %s return: %s', (isRequired, isParentOfKind, result) => {
  jest.spyOn(isRequiredUtils, 'isRequired').mockReturnValueOnce(isRequired);
  jest.spyOn(isParentOfKindUtils, 'isParentOfKind').mockReturnValue(isParentOfKind);
  const child = document.createElement('div');

  expect(isParentFieldsetRequired(child)).toBe(result);
});
