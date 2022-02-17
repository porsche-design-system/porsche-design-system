import { getTextSkeletonCss } from './text-skeleton-styles';

it('should return correct css', () => {
  expect(getTextSkeletonCss()).toMatchSnapshot();
});
