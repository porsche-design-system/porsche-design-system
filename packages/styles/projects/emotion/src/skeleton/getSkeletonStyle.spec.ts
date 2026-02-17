import { describe, expect, it } from 'vitest';
import * as fromSkeleton from './';
import { getSkeletonStyle } from './getSkeletonStyle';

it('should provide all exports', () => {
  expect(Object.keys(fromSkeleton).length).toBe(1);
});

describe('getSkeletonStyle()', () => {
  it('should return correct css', () => {
    expect(getSkeletonStyle()).toMatchSnapshot();
  });
});
