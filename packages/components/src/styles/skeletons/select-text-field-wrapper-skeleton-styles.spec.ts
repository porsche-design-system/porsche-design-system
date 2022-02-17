import { getSelectTextFieldWrapperSkeletonCss } from './select-text-field-wrapper-skeleton-styles';

it('should return correct css', () => {
  expect(getSelectTextFieldWrapperSkeletonCss()).toMatchSnapshot();
});
