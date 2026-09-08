import { TAG_DISMISSIBLE_ARIA_ATTRIBUTES } from './tag-dismissible-utils';

describe('TAG_DISMISSIBLE_ARIA_ATTRIBUTES', () => {
  it('should list supported aria attributes', () => {
    expect(TAG_DISMISSIBLE_ARIA_ATTRIBUTES).toStrictEqual(['aria-label']);
  });
});
