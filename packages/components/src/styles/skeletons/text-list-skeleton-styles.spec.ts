import { getTextListSkeletonCss } from './text-list-skeleton-styles';

describe('getTextListSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getTextListSkeletonCss()).toMatchSnapshot();
  });
});
