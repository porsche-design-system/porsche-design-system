import { getComponentCss } from './carousel-styles';

xdescribe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'dark'],
    [false, false, 'light'],
    [false, true, 'light'],
    [true, false, 'light'],
    [true, true, 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'light'],
  ])('should return correct css for wrapContent: %s, disablePagination: %j and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
