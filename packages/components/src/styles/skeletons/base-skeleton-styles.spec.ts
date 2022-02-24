import { getBaseSkeletonStyle } from './base-skeleton-styles';

it('should return correct style', () => {
  expect(getBaseSkeletonStyle()).toMatchSnapshot();
});
