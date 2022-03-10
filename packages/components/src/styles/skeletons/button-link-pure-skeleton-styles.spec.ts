import { getButtonLinkPureSkeletonStyles } from './button-link-pure-skeleton-styles';

it('should return correct css', () => {
  expect(getButtonLinkPureSkeletonStyles()).toMatchSnapshot();
});
