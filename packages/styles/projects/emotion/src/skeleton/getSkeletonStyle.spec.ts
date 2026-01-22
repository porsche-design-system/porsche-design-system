import { getSkeletonStyle } from './getSkeletonStyle';
import * as fromSkeleton from './';

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
