import { getHoverStyle } from './getHoverStyle';
import * as fromFocus from './';

it('should provide all exports', () => {
  expect(Object.keys(fromFocus).length).toBe(1);
});

describe('getHoverStyle()', () => {
  it.each<Parameters<typeof getHoverStyle>>([
    [{ inset: undefined, borderRadius: undefined, theme: undefined }],
    [{ inset: 'small', borderRadius: 'small', theme: 'light' }],
    [{ inset: 'medium', borderRadius: 'medium', theme: 'light' }],
    [{ inset: '-4px -2px', borderRadius: '6px', theme: 'light' }],
    [{ inset: 'small', borderRadius: 'small', theme: 'dark' }],
    [{ inset: 'medium', borderRadius: 'medium', theme: 'dark' }],
    [{ inset: '-4px -2px', borderRadius: '6px', theme: 'dark' }],
  ])('should return correct css for opts: %s', (...args) => {
    expect(getHoverStyle(...args)).toMatchSnapshot();
  });
});
