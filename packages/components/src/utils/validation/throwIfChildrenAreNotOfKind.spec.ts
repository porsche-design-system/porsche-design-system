import type { TagName } from '@porsche-design-system/shared';
import { vi } from 'vitest';
import * as areAllChildrenOfKindUtils from '../dom/areAllChildrenOfKind';
import { throwIfChildrenAreNotOfKind } from './throwIfChildrenAreNotOfKind';

it('should call areChildrenOfKind() with correct parameters', () => {
  const spy = vi.spyOn(areAllChildrenOfKindUtils, 'areAllChildrenOfKind');
  const parent = document.createElement('p-grid');
  const allowedTagName: TagName = 'p-grid-item';

  throwIfChildrenAreNotOfKind(parent, allowedTagName);

  expect(spy).toHaveBeenCalledWith(parent, allowedTagName);
});

it('should throw correct error message when areChildrenOfKind() is false', () => {
  vi.spyOn(areAllChildrenOfKindUtils, 'areAllChildrenOfKind').mockReturnValue(false);
  const parent = document.createElement('p-grid');
  const child1 = document.createElement('p-grid-item');
  const child2 = document.createElement('div');
  parent.append(child1, child2);

  expect(() => throwIfChildrenAreNotOfKind(parent, 'p-grid-item')).toThrow(
    '[Porsche Design System] child HTMLElements of p-grid should be of kind p-grid-item but got div'
  );
});

it('should not throw error when areChildrenOfKind() is true', () => {
  vi.spyOn(areAllChildrenOfKindUtils, 'areAllChildrenOfKind').mockReturnValue(true);
  const parent = document.createElement('p-grid');

  expect(() => throwIfChildrenAreNotOfKind(parent, 'p-grid-item')).not.toThrow();
});
