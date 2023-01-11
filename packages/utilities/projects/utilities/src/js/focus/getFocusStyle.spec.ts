import { getFocusStyle } from './getFocusStyle';
import * as fromFocus from './';

it('should provide all exports', () => {
  expect(Object.keys(fromFocus).length).toBe(1);
});

describe('getFocusStyle()', () => {
  it.each<Parameters<typeof getFocusStyle>>([[], [{ offset: '5rem' }], [{ theme: 'dark' }]])(
    'should return correct css for opts: %s',
    (...args) => {
      expect(getFocusStyle(...args)).toMatchSnapshot();
    }
  );
});
