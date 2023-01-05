import { getFocus } from './focus';
import * as fromFocus from './';

it('should provide all exports', () => {
  expect(Object.keys(fromFocus).length).toBe(1);
});

describe('getFocus()', () => {
  it.each<Parameters<typeof getFocus>>([[], [{ offset: '5rem' }]])(
    'should return correct css for opts: %s',
    (...args) => {
      expect(getFocus(...args)).toMatchSnapshot();
    }
  );
});
