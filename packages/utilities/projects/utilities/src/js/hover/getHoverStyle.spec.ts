import { getHoverStyle } from './getHoverStyle';
import * as fromFocus from './';

it('should provide all exports', () => {
  expect(Object.keys(fromFocus).length).toBe(1);
});

describe('getHoverStyle()', () => {
  it.each<Parameters<typeof getHoverStyle>>([
    [{ inset: undefined, borderRadius: undefined }],
    [{ inset: 'small', borderRadius: 'small' }],
    [{ inset: 'medium', borderRadius: 'medium' }],
    [{ inset: '-4px -2px', borderRadius: '6px' }],
  ])('should return correct css for opts: %s', (...args) => {
    expect(getHoverStyle(...args)).toMatchSnapshot();
  });
});
