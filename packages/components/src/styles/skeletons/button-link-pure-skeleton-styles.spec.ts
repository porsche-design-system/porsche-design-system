import { getButtonLinkPureSkeletonCss } from './button-link-pure-skeleton-styles';

it('should return correct css', () => {
  expect(getButtonLinkPureSkeletonCss()).toMatchSnapshot();
});
