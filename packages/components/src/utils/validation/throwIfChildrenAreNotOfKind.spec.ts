import type { TagName } from '@porsche-design-system/shared';
import { vi } from 'vitest';
import * as areAllChildrenOfKindUtils from '../dom/areAllChildrenOfKind';
import { throwIfChildrenAreNotOfKind } from './throwIfChildrenAreNotOfKind';

it('should call areChildrenOfKind() with correct parameters', () => {
  const spy = vi.spyOn(areAllChildrenOfKindUtils, 'areAllChildrenOfKind');
  const parent = document.createElement('p-tabs');
  const allowedTagName: TagName = 'p-tabs-item';

  throwIfChildrenAreNotOfKind(parent, allowedTagName);

  expect(spy).toHaveBeenCalledWith(parent, allowedTagName);
});

it('should throw correct error message when areChildrenOfKind() is false', () => {
  vi.spyOn(areAllChildrenOfKindUtils, 'areAllChildrenOfKind').mockReturnValue(false);
  const parent = document.createElement('p-tabs');
  const child1 = document.createElement('p-tabs-item');
  const child2 = document.createElement('div');
  parent.append(child1, child2);

  expect(() => throwIfChildrenAreNotOfKind(parent, 'p-tabs-item')).toThrow(
    '[Porsche Design System] child HTMLElements of p-tabs should be of kind p-tabs-item but got div'
  );
});

it('should not throw error when areChildrenOfKind() is true', () => {
  vi.spyOn(areAllChildrenOfKindUtils, 'areAllChildrenOfKind').mockReturnValue(true);
  const parent = document.createElement('p-tabs');

  expect(() => throwIfChildrenAreNotOfKind(parent, 'p-tabs-item')).not.toThrow();
});
