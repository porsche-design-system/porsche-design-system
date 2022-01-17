import { getComponentCss } from './spinner-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', 'light'],
    ['medium', 'light'],
    ['large', 'light'],
    ['inherit', 'light'],
    [{ base: 'medium', xs: 'small', s: 'medium', m: 'small', l: 'medium', xl: 'small' }, 'light'],
    ['small', 'dark'],
    ['medium', 'dark'],
    ['large', 'dark'],
    ['inherit', 'dark'],
    [{ base: 'medium', xs: 'small', s: 'medium', m: 'small', l: 'medium', xl: 'small' }, 'dark'],
  ])('should return correct css for size: %j and theme %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
