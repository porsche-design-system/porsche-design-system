import { getHeadlineSkeletonCss } from './headline-skeleton-styles';

it('should return correct css', () => {
  expect(getHeadlineSkeletonCss()).toMatchSnapshot();
});
