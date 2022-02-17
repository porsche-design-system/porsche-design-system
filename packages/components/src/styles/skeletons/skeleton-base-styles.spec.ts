import { getBaseSkeletonStyles } from './skeleton-base-styles';

it('should return correct styles', () => {
  expect(getBaseSkeletonStyles()).toMatchSnapshot();
});
