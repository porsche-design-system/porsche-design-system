import { throwIfRootNodeIsNotOneOfKind } from './throwIfRootNodeIsNotOneOfKind';

it('should throw error if root node tag does not match', () => {
  const child = document.createElement('p-select');

  expect(() => throwIfRootNodeIsNotOneOfKind(child, ['p-multi-select', 'p-select'])).toThrow();
});

it('should not throw error if root node tag matches', () => {
  const parent = document.createElement('p-select');
  const child = document.createElement('p-select');
  parent.attachShadow({ mode: 'open' });
  parent.shadowRoot.appendChild(child);

  expect(() => throwIfRootNodeIsNotOneOfKind(child, ['p-multi-select', 'p-select'])).not.toThrow();
});

it('should not throw error if prefixed root node tag matches', () => {
  const parent = document.createElement('my-prefix-p-select');
  const child = document.createElement('my-prefix-p-select');
  parent.attachShadow({ mode: 'open' });
  parent.shadowRoot.appendChild(child);

  expect(() => throwIfRootNodeIsNotOneOfKind(child, ['p-select'])).not.toThrow();
});
