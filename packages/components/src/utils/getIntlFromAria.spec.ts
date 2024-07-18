import { getIntlFromAria } from './getIntlFromAria';

describe('getIntlFromAria', () => {
  it('should return intl object from aria object', () => {
    expect(
      getIntlFromAria({
        'aria-label': 'Pagination',
        prev: { 'aria-label': 'Previous page' },
        next: { 'aria-label': 'Next page' },
        page: { 'aria-label': 'Page {{value}}' },
      })
    ).toEqual({
      root: 'Pagination',
      prev: 'Previous page',
      next: 'Next page',
      page: 'Page {{value}}',
    });
  });

  it('should return empty object when aria is undefined', () => {
    expect(getIntlFromAria(undefined)).toEqual({});
  });
});
