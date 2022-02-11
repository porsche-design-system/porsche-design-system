import { getSelectTextFieldWrapperSkeletonCss } from './select-text-field-wrapper-skeleton-styles';

describe('getSelectTextFieldWrapperSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getSelectTextFieldWrapperSkeletonCss()).toMatchSnapshot();
  });
});
