import { getButtonLinkPureSkeletonStyles } from './button-link-pure-skeleton-styles';
import { getCss } from '../../utils';

it('should return correct css', () => {
  expect(getCss(getButtonLinkPureSkeletonStyles())).toMatchSnapshot();
});
