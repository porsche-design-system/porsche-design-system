import { getButtonLinkSocialSkeletonCss } from './button-link-social-skeleton-styles';

it('should return correct css', () => {
  expect(getButtonLinkSocialSkeletonCss()).toMatchSnapshot();
});
