import { getButtonLinkSkeletonCss } from './button-link-skeleton-styles';

it('should return correct css', () => {
  expect(getButtonLinkSkeletonCss()).toMatchSnapshot();
});
