import { getHoverStyle } from './getHoverStyle';
import * as fromFocus from './index';

it('should provide all exports', () => {
  expect(Object.keys(fromFocus).length).toBe(1);
});

describe('getHoverStyle()', () => {
  it.each<Parameters<typeof getHoverStyle>>([
    [{ borderRadius: undefined }],
    [{ borderRadius: 'small' }],
    [{ borderRadius: 'medium' }],
    [{ borderRadius: '6px' }],
  ])('should return correct css for opts: %s', (...args) => {
    expect(getHoverStyle(...args)).toMatchSnapshot();
  });
});
