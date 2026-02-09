import { areAllChildrenOfKind } from './areAllChildrenOfKind';

it('should return true if every child tag matches', () => {
  const parent = document.createElement('p-tabs');
  const child1 = document.createElement('p-tabs-item');
  const child2 = document.createElement('p-tabs-item');
  parent.appendChild(child1);
  parent.appendChild(child2);

  expect(areAllChildrenOfKind(parent, 'p-tabs-item')).toBe(true);
});

it('should return true if every prefixed child tag matches', () => {
  const parent = document.createElement('my-prefix-p-tabs');
  const child1 = document.createElement('my-prefix-p-tabs-item');
  const child2 = document.createElement('my-prefix-p-tabs-item');
  parent.appendChild(child1);
  parent.appendChild(child2);

  expect(areAllChildrenOfKind(parent, 'p-tabs-item')).toBe(true);
});

it('should return false if a child tag does not match', () => {
  const parent = document.createElement('p-tabs');
  const child1 = document.createElement('p-tabs-item');
  const child2 = document.createElement('div');
  parent.appendChild(child1);
  parent.appendChild(child2);

  expect(areAllChildrenOfKind(parent, 'p-tabs-item')).toBe(false);
});
