import { BANNER_INLINE_STATES, BannerInlineState, getContentAriaAttributes, getIconName } from './banner-inline-utils';

describe('getIconName()', () => {
  it.each<BannerInlineState>(BANNER_INLINE_STATES)('should return correct icon for state: %s', (state) => {
    expect(getIconName(state)).toMatchSnapshot();
  });
});

describe('getContentAriaAttributes()', () => {
  it.each<BannerInlineState>(BANNER_INLINE_STATES)('should return correct aria attributes for state: %s', (state) => {
    expect(getContentAriaAttributes(state, 'labelId', 'descriptionId')).toMatchSnapshot();
  });
});
