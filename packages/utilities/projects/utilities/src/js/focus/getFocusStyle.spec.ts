import { getFocusStyle } from './getFocusStyle';
import * as fromFocus from './';

it('should provide all exports', () => {
  expect(Object.keys(fromFocus).length).toBe(1);
});

describe('getFocusStyle()', () => {
  it.each<Parameters<typeof getFocusStyle>>([
    [{ inset: undefined, borderRadius: undefined }],
    [{ inset: 'small', borderRadius: 'small' }],
    [{ inset: 'medium', borderRadius: 'medium' }],
    [{ inset: '-4px -2px', borderRadius: '6px' }],
  ])('should return correct css for opts: %s', (...args) => {
    expect(getFocusStyle(...args)).toMatchSnapshot();
  });
});
