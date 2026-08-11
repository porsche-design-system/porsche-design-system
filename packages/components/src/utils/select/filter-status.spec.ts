import { getFilterStatusMessage } from './filter-status';

describe('getFilterStatusMessage()', () => {
  it.each([
    ['', 0, ''],
    ['', 3, ''],
    ['abc', 0, 'No results found'],
    ['abc', 1, '1 result available'],
    ['abc', 5, '5 results available'],
  ])('should return correct message for filterValue: %s and visibleOptionCount: %s', (filterValue, visibleOptionCount, expected) => {
    expect(getFilterStatusMessage(filterValue, visibleOptionCount)).toBe(expected);
  });
});
