import { INPUT_SEARCH_ARIA_ATTRIBUTES } from './input-search-utils';

describe('INPUT_SEARCH_ARIA_ATTRIBUTES', () => {
  it('should list supported aria attributes', () => {
    expect(INPUT_SEARCH_ARIA_ATTRIBUTES).toStrictEqual([
      'role',
      'aria-autocomplete',
      'aria-controls',
      'aria-expanded',
      'aria-haspopup',
      'aria-label',
    ]);
  });
});
