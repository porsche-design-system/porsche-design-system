import { expect, it } from 'vitest';
import { throwIfParentIsNotOfKind } from './throwIfParentIsNotOfKind';

it('should throw error if parent tag does not match', () => {
  const parent = document.createElement('div');
  const child = document.createElement('p-tabs-item');
  parent.appendChild(child);

  expect(() => throwIfParentIsNotOfKind(child, 'p-tabs')).toThrow();
  expect(() => throwIfParentIsNotOfKind(child, ['p-tabs', 'p-accordion'])).toThrow();
});

it('should not throw error if parent tag matches', () => {
  const parent = document.createElement('p-tabs');
  const child = document.createElement('p-tabs-item');
  parent.appendChild(child);

  expect(() => throwIfParentIsNotOfKind(child, 'p-tabs')).not.toThrow();
  expect(() => throwIfParentIsNotOfKind(child, ['p-tabs', 'p-accordion'])).not.toThrow();
});

it('should not throw error if prefixed parent tag matches', () => {
  const parent = document.createElement('my-prefix-p-tabs');
  const child = document.createElement('my-prefix-p-tabs-item');
  parent.appendChild(child);

  expect(() => throwIfParentIsNotOfKind(child, 'p-tabs')).not.toThrow();
  expect(() => throwIfParentIsNotOfKind(child, ['p-tabs', 'p-accordion'])).not.toThrow();
});
