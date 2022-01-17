import { getComponentCss } from './accordion-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', false, true, 'light'],
    ['small', false, false, 'light'],
    ['small', true, true, 'light'],
    ['small', true, false, 'light'],
    ['medium', false, true, 'light'],
    ['small', false, true, 'dark'],
    [{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }, false, true, 'dark'],
  ])('should return correct css for size: %j, compact: %s, open: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
