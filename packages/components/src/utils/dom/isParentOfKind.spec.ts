import { isParentOfKind } from './isParentOfKind';

it('should return true if parent tag matches', () => {
  const parent = document.createElement('p-grid');
  const child = document.createElement('p-grid-item');
  parent.appendChild(child);

  expect(isParentOfKind(child, 'pGrid')).toBe(true);
});

it('should return false if parent tag does not match', () => {
  const parent = document.createElement('div');
  const child = document.createElement('p-grid-item');
  parent.appendChild(child);

  expect(isParentOfKind(child, 'pGrid')).toBe(false);
});

it('should return true if child is inside shadow dom and parent tag matches', () => {
  const parent = document.createElement('p-grid');
  const child = document.createElement('p-grid-item');
  parent.attachShadow({ mode: 'open' }).appendChild(child);

  expect(isParentOfKind(child, 'pGrid', true)).toBe(true);
});
