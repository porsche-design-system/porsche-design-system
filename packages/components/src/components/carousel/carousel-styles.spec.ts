import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'dark', 'left'],
    [false, false, 'light', 'left'],
    [false, true, 'light', 'left'],
    [true, false, 'light', 'center'],
    [true, true, 'light', 'center'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'light', 'center'],
  ])('should return correct css for wrapContent: %s, disablePagination: %j and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
