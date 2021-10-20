import { BANNER_INLINE_STATES, BannerInlineState, getIconName } from './banner-inline-utils';

describe('getIconName()', () => {
  it.each<BannerInlineState>(BANNER_INLINE_STATES)('should return correct icon for state: %s', (state) => {
    expect(getIconName(state)).toMatchSnapshot();
  });
});
