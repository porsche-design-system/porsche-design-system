import { getCheckboxRadioWrapperSkeletonCss } from './checkbox-radio-wrapper-skeleton-styles';

describe('getCheckboxRadioWrapperSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getCheckboxRadioWrapperSkeletonCss()).toMatchSnapshot();
  });
});
