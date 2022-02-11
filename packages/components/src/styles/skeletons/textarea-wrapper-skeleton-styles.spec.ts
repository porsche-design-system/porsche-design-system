import { getTextareaWrapperSkeletonCss } from './textarea-wrapper-skeleton-styles';

describe('getTextareaWrapperSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getTextareaWrapperSkeletonCss()).toMatchSnapshot();
  });
});
