import { throwIfChildrenAreNotOfKind } from './throwIfChildrenAreNotOfKind';

it('should throw error if children tag does not match', () => {
  const parent = document.createElement('p-grid');
  const child1 = document.createElement('p-grid-item');
  const child2 = document.createElement('div');
  parent.appendChild(child1);
  parent.appendChild(child2);

  expect(() => throwIfChildrenAreNotOfKind(parent, 'pGridItem')).toThrow();
});

it('should not throw error if parent tag matches', () => {
  const parent = document.createElement('p-grid');
  const child1 = document.createElement('p-grid-item');
  const child2 = document.createElement('p-grid-item');
  parent.appendChild(child1);
  parent.appendChild(child2);

  expect(() => throwIfChildrenAreNotOfKind(parent, 'pGridItem')).not.toThrow();
});

it('should not throw error if prefixed parent tag matches', () => {
  const parent = document.createElement('my-prefix-p-grid');
  const child1 = document.createElement('my-prefix-p-grid-item');
  const child2 = document.createElement('my-prefix-p-grid-item');
  parent.appendChild(child1);
  parent.appendChild(child2);

  expect(() => throwIfChildrenAreNotOfKind(parent, 'pGridItem')).not.toThrow();
});
