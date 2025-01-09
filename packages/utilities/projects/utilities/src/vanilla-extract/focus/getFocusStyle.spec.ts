import * as fromFocus from './';
import { getFocusStyle } from './getFocusStyle';

it('should provide all exports', () => {
  expect(Object.keys(fromFocus).length).toBe(1);
});

describe('getFocusStyle()', () => {
  it.each<Parameters<typeof getFocusStyle>>([
    [{ offset: undefined, borderRadius: undefined }],
    [{ offset: 'small', borderRadius: 'small' }],
    [{ offset: 'none', borderRadius: 'medium' }],
    [{ offset: '3px', borderRadius: '6px' }],
  ])('should return correct css for opts: %s', (...args) => {
    expect(getFocusStyle(...args)).toMatchSnapshot();
  });
});
