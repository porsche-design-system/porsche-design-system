import { getButtonLinkPureSkeletonCss } from './button-link-pure-skeleton-styles';

describe('getButtonLinkPureSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getButtonLinkPureSkeletonCss()).toMatchSnapshot();
  });
});
