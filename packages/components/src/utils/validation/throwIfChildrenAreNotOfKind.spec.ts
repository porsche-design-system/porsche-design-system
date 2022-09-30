import type { TagName } from '@porsche-design-system/shared';
import { throwIfChildrenAreNotOfKind } from './throwIfChildrenAreNotOfKind';
import * as areAllChildrenOfKindUtils from '../dom/areAllChildrenOfKind';

it('should call areChildrenOfKind() with correct parameters', () => {
  const spy = jest.spyOn(areAllChildrenOfKindUtils, 'areAllChildrenOfKind');
  const parent = document.createElement('p-grid');
  const allowedTagName: TagName = 'p-grid-item';

  throwIfChildrenAreNotOfKind(parent, allowedTagName);

  expect(spy).toBeCalledWith(parent, allowedTagName);
});

it('should throw correct error message when areChildrenOfKind() is false', () => {
  jest.spyOn(areAllChildrenOfKindUtils, 'areAllChildrenOfKind').mockReturnValue(false);
  const parent = document.createElement('p-grid');
  const child1 = document.createElement('p-grid-item');
  const child2 = document.createElement('div');
  parent.append(child1, child2);

  expect(() => throwIfChildrenAreNotOfKind(parent, 'p-grid-item')).toThrow(
    'Child HTMLElements of p-grid should be of kind p-grid-item but got div'
  );
});

it('should not throw error when areChildrenOfKind() is true', () => {
  jest.spyOn(areAllChildrenOfKindUtils, 'areAllChildrenOfKind').mockReturnValue(true);
  const parent = document.createElement('p-grid');

  expect(() => throwIfChildrenAreNotOfKind(parent, 'p-grid-item')).not.toThrow();
});
