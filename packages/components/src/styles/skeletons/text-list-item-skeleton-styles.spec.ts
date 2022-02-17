import { getTextListItemSkeletonCss } from './text-list-item-skeleton-styles';

describe('getTextListItemSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getTextListItemSkeletonCss()).toMatchSnapshot();
  });
});
