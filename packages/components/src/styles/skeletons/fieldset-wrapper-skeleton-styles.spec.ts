import { getFieldsetWrapperSkeletonCss } from './fieldset-wrapper-skeleton-styles';

it('should return correct css', () => {
  expect(getFieldsetWrapperSkeletonCss()).toMatchSnapshot();
});
