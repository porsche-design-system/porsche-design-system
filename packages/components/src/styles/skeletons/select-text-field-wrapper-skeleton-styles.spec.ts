import { getSelectTextFieldWrapperSkeletonStyles } from './select-text-field-wrapper-skeleton-styles';

it('should return correct css', () => {
  expect(getSelectTextFieldWrapperSkeletonStyles()).toMatchSnapshot();
});
