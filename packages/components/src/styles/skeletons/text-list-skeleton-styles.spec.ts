import { getTextListSkeletonCss } from './text-list-skeleton-styles';

it('should return correct css', () => {
  expect(getTextListSkeletonCss()).toMatchSnapshot();
});
