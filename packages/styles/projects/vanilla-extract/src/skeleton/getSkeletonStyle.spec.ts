import { getSkeletonStyle } from './getSkeletonStyle';
import * as fromSkeleton from './index';
import { skeletonKeyframes } from './index';

it('should provide all exports', () => {
  expect(Object.keys(fromSkeleton).length).toBe(2);
});

it('should return correct keyframes', () => {
  expect(skeletonKeyframes).toMatchSnapshot();
});

describe('getSkeletonStyle()', () => {
  it('should return correct css', () => {
    expect(getSkeletonStyle('animationName')).toMatchSnapshot();
  });
});
