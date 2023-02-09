import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 400, 'left', 'dark'],
    [false, false, 400, 'left', 'light'],
    [false, true, 400, 'left', 'light'],
    [true, false, 400, 'center', 'light'],
    [true, true, 400, 'center', 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 400, 'center', 'light'],
  ])(
    'should return correct css for wrapContent: %s, disablePagination: %j, splideSpeed: %s, alignHeader: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
