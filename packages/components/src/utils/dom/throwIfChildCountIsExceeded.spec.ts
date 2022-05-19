import { throwIfChildCountIsExceeded } from './throwIfChildCountIsExceeded';

it('should throw error if children count is exceeded', () => {
  const parent = document.createElement('div');
  ['div', 'div', 'div'].forEach((el) => {
    parent.appendChild(document.createElement(el));
  });

  expect(() => throwIfChildCountIsExceeded(parent, 2)).toThrow();
});

it('should not throw error if children count is inside allowedAmount', () => {
  const parent = document.createElement('div');
  ['div', 'div'].forEach((el) => {
    parent.appendChild(document.createElement(el));
  });

  expect(() => throwIfChildCountIsExceeded(parent, 2)).not.toThrow();
});
