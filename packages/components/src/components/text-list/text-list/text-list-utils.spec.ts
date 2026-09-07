import { describe, expect, it } from 'vitest';
import type { TextListType } from './text-list-utils';
import { isListTypeOrdered, isListTypeNumbered } from './text-list-utils';

describe('isListTypeOrdered()', () => {
  it.each<[TextListType, boolean]>([
    ['unordered', false],
    ['alphabetically', true],
    ['numbered', true],
  ])('should for %s return %s', (listType, expected) => {
    expect(isListTypeOrdered(listType)).toBe(expected);
  });
});

describe('isListTypeNumbered()', () => {
  it.each<[TextListType, boolean]>([
    ['unordered', false],
    ['alphabetically', false],
    ['numbered', true],
  ])('should for %s return %s', (orderType, expected) => {
    expect(isListTypeNumbered(orderType)).toBe(expected);
  });
});
