import { getBaseSkeletonStyles } from './skeleton-base-styles';

describe('getBaseSkeletonStyles()', () => {
  it('should return correct styles', () => {
    expect(getBaseSkeletonStyles()).toMatchSnapshot();
  });
});
