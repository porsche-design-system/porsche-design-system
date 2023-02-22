import type { ListType, OrderType } from './text-list-utils';
import { isListTypeOrdered, isOrderTypeNumbered } from './text-list-utils';

describe('isListTypeOrdered()', () => {
  it.each<[ListType, boolean]>([
    ['ordered', true],
    ['unordered', false],
  ])('should for %s return %s', (listType, expected) => {
    expect(isListTypeOrdered(listType)).toBe(expected);
  });
});

describe('isOrderTypeNumbered()', () => {
  it.each<[OrderType, boolean]>([
    ['numbered', true],
    ['alphabetically', false],
  ])('should for %s return %s', (orderType, expected) => {
    expect(isOrderTypeNumbered(orderType)).toBe(expected);
  });
});
