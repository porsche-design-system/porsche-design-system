import { isShadowRootParentOfKind } from './isShadowRootParentOfKind';

it('should return true if child is inside shadow dom and parent tag matches', () => {
  const parent = document.createElement('p-grid');
  const child = document.createElement('p-grid-item');
  parent.attachShadow({ mode: 'open' }).appendChild(child);

  expect(isShadowRootParentOfKind(child, 'p-grid')).toBe(true);
});

it('should return true if prefixed child is inside shadow dom and parent tag matches', () => {
  const parent = document.createElement('my-prefix-p-grid');
  const child = document.createElement('my-prefix-p-grid-item');
  parent.attachShadow({ mode: 'open' }).appendChild(child);

  expect(isShadowRootParentOfKind(child, 'p-grid')).toBe(true);
});

it('should return false if no parent element is found', () => {
  const child = document.createElement('p-grid-item');

  expect(isShadowRootParentOfKind(child, 'p-grid')).toBe(false);
});

it('should return false if child is inside shadow dom and parent tag does not match', () => {
  const parent = document.createElement('p-grid');
  const child = document.createElement('p-grid-item');
  parent.attachShadow({ mode: 'open' }).appendChild(child);

  expect(isShadowRootParentOfKind(child, 'p-fieldset')).toBe(false);
});
