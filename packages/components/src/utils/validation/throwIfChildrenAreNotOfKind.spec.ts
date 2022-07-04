import { throwIfChildrenAreNotOfKind } from './throwIfChildrenAreNotOfKind';
import * as areChildrenOfKindUtils from '../dom/areChildrenOfKind';

it('should call areChildrenOfKind() with correct parameters', () => {
  const spy = jest.spyOn(areChildrenOfKindUtils, 'areChildrenOfKind');
  const parent = document.createElement('p-grid');
  const allowedTagName = 'pGridItem';

  throwIfChildrenAreNotOfKind(parent, allowedTagName);

  expect(spy).toBeCalledWith(parent, allowedTagName);
});

it('should throw correct error message when areChildrenOfKind() is false', () => {
  jest.spyOn(areChildrenOfKindUtils, 'areChildrenOfKind').mockReturnValue(false);
  const parent = document.createElement('p-grid');
  const child1 = document.createElement('p-grid-item');
  const child2 = document.createElement('div');
  parent.appendChild(child1);
  parent.appendChild(child2);

  expect(() => throwIfChildrenAreNotOfKind(parent, 'pGridItem')).toThrow(
    'Child HTMLElements of p-grid should be of kind p-grid-item but got div'
  );
});

it('should not throw error when areChildrenOfKind() is true', () => {
  jest.spyOn(areChildrenOfKindUtils, 'areChildrenOfKind').mockReturnValue(true);
  const parent = document.createElement('p-grid');

  expect(() => throwIfChildrenAreNotOfKind(parent, 'pGridItem')).not.toThrow();
});
