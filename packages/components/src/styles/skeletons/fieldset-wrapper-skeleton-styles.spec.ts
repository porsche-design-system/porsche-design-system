import { getFieldsetWrapperSkeletonCss } from './fieldset-wrapper-skeleton-styles';

describe('getFieldsetWrapperSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getFieldsetWrapperSkeletonCss()).toMatchSnapshot();
  });
});
