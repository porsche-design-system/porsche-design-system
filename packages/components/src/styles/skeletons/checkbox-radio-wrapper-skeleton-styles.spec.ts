import { getCheckboxRadioWrapperSkeletonCss } from './checkbox-radio-wrapper-skeleton-styles';

it('should return correct css', () => {
  expect(getCheckboxRadioWrapperSkeletonCss()).toMatchSnapshot();
});
