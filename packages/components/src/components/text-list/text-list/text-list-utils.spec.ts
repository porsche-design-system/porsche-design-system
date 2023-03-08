import type { TextListType, TextListListType, TextListOrderType } from './text-list-utils';
import { isListTypeOrdered, isListTypeNumbered } from './text-list-utils';

describe('isListTypeOrdered()', () => {
  it.each<[TextListType | TextListListType, boolean]>([
    ['unordered', false],
    ['ordered', true],
    ['alphabetically', true],
    ['numbered', true],
  ])('should for %s return %s', (listType, expected) => {
    expect(isListTypeOrdered(listType)).toBe(expected);
  });
});

describe('isListTypeNumbered()', () => {
  it.each<[TextListType | TextListOrderType, boolean]>([
    ['unordered', false],
    ['alphabetically', false],
    ['numbered', true],
  ])('should for %s return %s', (orderType, expected) => {
    expect(isListTypeNumbered(orderType)).toBe(expected);
  });
});
