import { getCheckboxRadioWrapperSkeletonStyles } from './checkbox-radio-wrapper-skeleton-styles';

it('should return correct css', () => {
  expect(getCheckboxRadioWrapperSkeletonStyles()).toMatchSnapshot();
});
