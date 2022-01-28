import { getFocusJssStyle } from './focus';

describe('getFocusJssStyle()', () => {
  it.each<Parameters<typeof getFocusJssStyle>>([[], [{ color: 'deeppink' }], [{ offset: '5rem' }]])(
    'should return correct css for opts: %s',
    (...args) => {
      expect(getFocusJssStyle(...args)).toMatchSnapshot();
    }
  );
});
