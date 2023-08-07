import { LINK_ARIA_ATTRIBUTES } from './link-aria-attribute';

describe('LINK_ARIA_ATTRIBUTES', () => {
  it('should match snapshot', () => {
    expect(LINK_ARIA_ATTRIBUTES).toMatchSnapshot();
  });
});
