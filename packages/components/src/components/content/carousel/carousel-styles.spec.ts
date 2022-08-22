import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, 'dark'],
    [false, false, false, 'light'],
    [false, true, false, 'light'],
    [true, false, false, 'light'],
    [true, true, false, 'light'],
    [true, true, true, 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, false, 'light'],
  ])(
    'should return correct css for wrapHeading: %s, disablePagination: %j, overflowVisible: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
