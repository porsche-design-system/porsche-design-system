import { getButtonLinkSocialSkeletonStyles } from './button-link-social-skeleton-styles';
import { getCss } from '../../utils';

it('should return correct css', () => {
  expect(getCss(getButtonLinkSocialSkeletonStyles())).toMatchSnapshot();
});
