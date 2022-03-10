import { getButtonLinkSocialSkeletonStyles } from './button-link-social-skeleton-styles';

it('should return correct css', () => {
  expect(getButtonLinkSocialSkeletonStyles()).toMatchSnapshot();
});
