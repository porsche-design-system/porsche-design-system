import { getTextListItemSkeletonCss } from './text-list-item-skeleton-styles';

it('should return correct css', () => {
  expect(getTextListItemSkeletonCss()).toMatchSnapshot();
});
