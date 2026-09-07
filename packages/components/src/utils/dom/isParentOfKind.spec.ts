import { isParentOfKind } from './isParentOfKind';

it('should return true if parent tag matches', () => {
  const parent = document.createElement('p-tabs');
  const child = document.createElement('p-tabs-item');
  parent.appendChild(child);

  expect(isParentOfKind(child, 'p-tabs')).toBe(true);
});

it('should return false if parent tag does not match', () => {
  const parent = document.createElement('div');
  const child = document.createElement('p-tabs-item');
  parent.appendChild(child);

  expect(isParentOfKind(child, 'p-tabs')).toBe(false);
});
