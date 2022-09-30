import { throwIfRootNodeIsNotOneOfKind } from './throwIfRootNodeIsNotOneOfKind';

it('should throw error if root node tag does not match', () => {
  const child = document.createElement('p-select-wrapper-dropdown');

  expect(() => throwIfRootNodeIsNotOneOfKind(child, ['p-content-wrapper', 'p-select-wrapper'])).toThrow();
});

it('should not throw error if root node tag matches', () => {
  const parent = document.createElement('p-select-wrapper');
  const child = document.createElement('p-select-wrapper-dropdown');
  parent.attachShadow({ mode: 'open' });
  parent.shadowRoot.appendChild(child);

  expect(() => throwIfRootNodeIsNotOneOfKind(child, ['p-content-wrapper', 'p-select-wrapper'])).not.toThrow();
});

it('should not throw error if prefixed root node tag matches', () => {
  const parent = document.createElement('my-prefix-p-select-wrapper');
  const child = document.createElement('my-prefix-p-select-wrapper-dropdown');
  parent.attachShadow({ mode: 'open' });
  parent.shadowRoot.appendChild(child);

  expect(() => throwIfRootNodeIsNotOneOfKind(child, ['p-select-wrapper'])).not.toThrow();
});
