import { throwIfParentIsNotOneOfKind } from './throwIfParentIsNotOneOfKind';

it('should throw error if parent tag does not match', () => {
  const parent = document.createElement('div');
  const child = document.createElement('p-grid-item');
  parent.appendChild(child);

  expect(() => throwIfParentIsNotOneOfKind(child, ['pGrid'])).toThrow();
});

it('should not throw error if parent tag matches 1st element', () => {
  const parent = document.createElement('p-grid');
  const child = document.createElement('p-grid-item');
  parent.appendChild(child);

  expect(() => throwIfParentIsNotOneOfKind(child, ['pGrid', 'pFlex'])).not.toThrow();
});

it('should not throw error if parent tag matches 2nd element', () => {
  const parent = document.createElement('p-grid');
  const child = document.createElement('p-grid-item');
  parent.appendChild(child);

  expect(() => throwIfParentIsNotOneOfKind(child, ['pFlex', 'pGrid'])).not.toThrow();
});
