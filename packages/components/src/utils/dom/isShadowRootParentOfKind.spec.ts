import { isShadowRootParentOfKind } from './isShadowRootParentOfKind';

// TODO: tests are missing
it('should return true if child is inside shadow dom and parent tag matches', () => {
  const parent = document.createElement('p-grid');
  const child = document.createElement('p-grid-item');
  parent.attachShadow({ mode: 'open' }).appendChild(child);

  expect(isShadowRootParentOfKind(child, 'p-grid')).toBe(true);
});
