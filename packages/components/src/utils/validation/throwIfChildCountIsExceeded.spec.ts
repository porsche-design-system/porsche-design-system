import { throwIfChildCountIsExceeded } from './throwIfChildCountIsExceeded';

it('should throw error if children count is exceeded', () => {
  const parent = document.createElement('div');
  parent.append(...Array.from(Array(3), () => document.createElement('div')));

  expect(() => throwIfChildCountIsExceeded(parent, 2)).toThrow();
});

it('should not throw error if children count is inside allowedAmount', () => {
  const parent = document.createElement('div');
  parent.append(...Array.from(Array(2), () => document.createElement('div')));

  expect(() => throwIfChildCountIsExceeded(parent, 2)).not.toThrow();
  expect(() => throwIfChildCountIsExceeded(parent, 3)).not.toThrow();
});
