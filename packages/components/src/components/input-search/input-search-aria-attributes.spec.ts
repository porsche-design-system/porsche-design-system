import { INPUT_SEARCH_ARIA_ATTRIBUTES } from './input-search-utils';

describe('INPUT_SEARCH_ARIA_ATTRIBUTES', () => {
  it('should match snapshot', () => {
    expect(INPUT_SEARCH_ARIA_ATTRIBUTES).toMatchSnapshot();
  });
});
