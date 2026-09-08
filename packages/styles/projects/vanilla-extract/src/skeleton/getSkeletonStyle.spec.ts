import * as fromSkeleton from './index';
import { skeletonKeyframes } from './index';
import { getSkeletonStyle } from './getSkeletonStyle';

it('should provide all exports', () => {
  expect(Object.keys(fromSkeleton).length).toBe(2);
});

it('should return correct keyframes', () => {
  expect(skeletonKeyframes).toMatchSnapshot();
});

describe('getSkeletonStyle()', () => {
  it.each<Parameters<typeof getSkeletonStyle>>([
    ['animationName', { theme: 'light' }],
    ['animationName', { theme: 'dark' }],
  ])('should return correct css for opts: %s', (...args) => {
    expect(getSkeletonStyle(...args)).toMatchSnapshot();
  });
});
