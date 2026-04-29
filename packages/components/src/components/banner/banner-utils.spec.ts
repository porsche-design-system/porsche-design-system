import { BANNER_STATES, type BannerState, getBannerAriaAttributes } from './banner-utils';

describe('getBannerAriaAttributes()', () => {
  it.each<BannerState>(BANNER_STATES)('should return correct aria attributes for state: %s', (state) => {
    expect(getBannerAriaAttributes(state, 'Some label')).toMatchSnapshot();
  });
});
