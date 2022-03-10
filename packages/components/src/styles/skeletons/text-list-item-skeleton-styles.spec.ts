import { getTextListItemSkeletonStyles } from './text-list-item-skeleton-styles';

it('should return correct css', () => {
  expect(getTextListItemSkeletonStyles()).toMatchSnapshot();
});
