import { isShadowRootParentOfKind } from './isShadowRootParentOfKind';

it('should return true if child is inside shadow dom and parent tag matches', () => {
  const parent = document.createElement('p-grid');
  const child = document.createElement('p-grid-item');
  parent.attachShadow({ mode: 'open' }).appendChild(child);

  expect(isShadowRootParentOfKind(child, 'pGrid')).toBe(true);
});
