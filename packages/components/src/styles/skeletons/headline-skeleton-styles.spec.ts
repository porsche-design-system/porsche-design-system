import { getHeadlineSkeletonCss } from './headline-skeleton-styles';

describe('getHeadlineSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getHeadlineSkeletonCss()).toMatchSnapshot();
  });
});
