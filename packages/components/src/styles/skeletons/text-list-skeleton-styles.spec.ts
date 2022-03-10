import { getTextListSkeletonStyles } from './text-list-skeleton-styles';

it('should return correct css', () => {
  expect(getTextListSkeletonStyles()).toMatchSnapshot();
});
