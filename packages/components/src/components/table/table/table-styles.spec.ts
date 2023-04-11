import { getComponentCss } from './table-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([['dark'], ['light']])(
    'should return correct css for theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
