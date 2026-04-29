import { vi } from 'vitest';
import * as isParentOfKindUtils from '../dom/isParentOfKind';
import { isParentFieldsetRequired } from './isParentFieldsetRequired';
import * as isRequiredUtils from './isRequired';

it('should call isParentOfKind() with correct parameters', () => {
  const spy = vi.spyOn(isParentOfKindUtils, 'isParentOfKind');
  const child = document.createElement('div');

  isParentFieldsetRequired(child);

  expect(spy).toHaveBeenCalledWith(child, 'p-fieldset');
  expect(spy).toHaveBeenCalledTimes(1);
});

it('should call isRequired() with correct parameters', () => {
  const spy = vi.spyOn(isRequiredUtils, 'isRequired');
  const parent = document.createElement('p-fieldset');
  const child = document.createElement('div');
  parent.appendChild(child);

  isParentFieldsetRequired(child);

  expect(spy).toHaveBeenCalledWith(parent);
});

it.each<[boolean, boolean, boolean]>([
  [true, true, true],
  [false, true, false],
  [true, false, false],
  [false, false, false],
])('should for isRequired(): %s and isParentOfKind(): %s return: %s', (isRequired, isParentOfKind, result) => {
  vi.spyOn(isRequiredUtils, 'isRequired').mockReturnValueOnce(isRequired);
  vi.spyOn(isParentOfKindUtils, 'isParentOfKind').mockReturnValue(isParentOfKind);
  const child = document.createElement('div');

  expect(isParentFieldsetRequired(child)).toBe(result);
});
