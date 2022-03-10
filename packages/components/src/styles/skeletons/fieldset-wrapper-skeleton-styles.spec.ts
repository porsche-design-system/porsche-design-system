import { getFieldsetWrapperSkeletonStyles } from './fieldset-wrapper-skeleton-styles';

it('should return correct css', () => {
  expect(getFieldsetWrapperSkeletonStyles()).toMatchSnapshot();
});
