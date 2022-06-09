import { areChildrenOfKind } from './areChildrenOfKind';

it('should return true if every children tag matches', () => {
  const parent = document.createElement('p-grid');
  const child1 = document.createElement('p-grid-item');
  const child2 = document.createElement('p-grid-item');
  parent.appendChild(child1);
  parent.appendChild(child2);

  expect(areChildrenOfKind(parent, 'pGridItem')).toBe(true);
});

it('should return true if every prefixed children tag matches', () => {
  const parent = document.createElement('my-prefix-p-grid');
  const child1 = document.createElement('my-prefix-p-grid-item');
  const child2 = document.createElement('my-prefix-p-grid-item');
  parent.appendChild(child1);
  parent.appendChild(child2);

  expect(areChildrenOfKind(parent, 'pGridItem')).toBe(true);
});

it('should return false if a children tag does not match', () => {
  const parent = document.createElement('p-grid');
  const child1 = document.createElement('p-grid-item');
  const child2 = document.createElement('div');
  parent.appendChild(child1);
  parent.appendChild(child2);

  expect(areChildrenOfKind(parent, 'pGridItem')).toBe(false);
});
