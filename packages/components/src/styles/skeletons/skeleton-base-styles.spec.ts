import { getBaseSkeletonStyle } from './skeleton-base-styles';

it('should return correct styles', () => {
  expect(getBaseSkeletonStyle()).toMatchSnapshot();
});
