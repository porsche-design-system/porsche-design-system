import { getTextSkeletonCss } from './text-skeleton-styles';

describe('getTextSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getTextSkeletonCss()).toMatchSnapshot();
  });
});
