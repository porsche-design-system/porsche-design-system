import { getButtonLinkSkeletonCss } from './button-link-skeleton-styles';

describe('getButtonLinkSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getButtonLinkSkeletonCss()).toMatchSnapshot();
  });
});
