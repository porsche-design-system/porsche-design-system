import { getBaseSkeletonStyle } from './base-skeleton-styles';

it('should return correct styles', () => {
  expect(getBaseSkeletonStyle()).toMatchSnapshot();
});
