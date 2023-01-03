import { getFocus } from './focus';

describe('getFocus()', () => {
  it.each<Parameters<typeof getFocus>>([[], [{ color: 'deeppink' }], [{ offset: '5rem' }]])(
    'should return correct css for opts: %s',
    (...args) => {
      expect(getFocus(...args)).toMatchSnapshot();
    }
  );
});
