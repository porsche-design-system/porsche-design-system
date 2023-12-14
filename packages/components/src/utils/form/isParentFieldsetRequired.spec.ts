import { isParentFieldsetRequired } from './isParentFieldsetRequired';
import * as isParentOfKindUtils from '../dom/isParentOfKind';
import * as isRequiredUtils from './isRequired';

it('should call isParentOfKind with correct parameters', () => {
  const spy = jest.spyOn(isParentOfKindUtils, 'isParentOfKind');
  const child = document.createElement('div');

  isParentFieldsetRequired(child);

  expect(spy).toBeCalledWith(child, 'p-fieldset');
  expect(spy).toBeCalledWith(child, 'p-fieldset-wrapper');
  expect(spy).toBeCalledTimes(2);
});

it('should call isRequired with correct parameters', () => {
  const spy = jest.spyOn(isRequiredUtils, 'isRequired');
  const parent = document.createElement('p-fieldset-wrapper');
  const child = document.createElement('div');
  parent.appendChild(child);

  isParentFieldsetRequired(child);

  expect(spy).toBeCalledWith(parent);
});

it('should return true if isRequired and isParentOfKind return true', () => {
  jest.spyOn(isRequiredUtils, 'isRequired').mockReturnValueOnce(true);
  jest.spyOn(isParentOfKindUtils, 'isParentOfKind').mockReturnValue(true);
  const child = document.createElement('div');

  expect(isParentFieldsetRequired(child)).toBe(true);
});

it('should return false if isRequired returns false and isParentOfKind returns true', () => {
  jest.spyOn(isRequiredUtils, 'isRequired').mockReturnValueOnce(false);
  jest.spyOn(isParentOfKindUtils, 'isParentOfKind').mockReturnValue(true);
  const child = document.createElement('div');

  expect(isParentFieldsetRequired(child)).toBe(false);
});

it('should return false if isRequired returns true and isParentOfKind returns false', () => {
  jest.spyOn(isRequiredUtils, 'isRequired').mockReturnValueOnce(true);
  jest.spyOn(isParentOfKindUtils, 'isParentOfKind').mockReturnValue(false);
  const child = document.createElement('div');

  expect(isParentFieldsetRequired(child)).toBe(false);
});

it('should return false if isRequired returns false and isParentOfKind returns false', () => {
  jest.spyOn(isRequiredUtils, 'isRequired').mockReturnValueOnce(false);
  jest.spyOn(isParentOfKindUtils, 'isParentOfKind').mockReturnValue(false);
  const child = document.createElement('div');

  expect(isParentFieldsetRequired(child)).toBe(false);
});
