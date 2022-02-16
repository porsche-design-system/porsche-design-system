import { getTextAndTextListSkeletonCss } from './text-skeleton-styles';

describe('getTextSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getTextAndTextListSkeletonCss()).toMatchSnapshot();
  });
});
