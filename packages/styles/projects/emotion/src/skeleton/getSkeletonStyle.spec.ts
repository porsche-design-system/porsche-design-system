import { describe, expect, it } from 'vitest';
import * as fromSkeleton from './';
import { getSkeletonStyle } from './getSkeletonStyle';

it('should provide all exports', () => {
  expect(Object.keys(fromSkeleton).length).toBe(1);
});

describe('getSkeletonStyle()', () => {
  it.each<Parameters<typeof getSkeletonStyle>>([[{ theme: 'light' }], [{ theme: 'dark' }]])(
    'should return correct css for opts: %s',
    (...args) => {
      expect(getSkeletonStyle(...args)).toMatchSnapshot();
    }
  );
});
