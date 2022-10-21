import { getComponentCss } from './tabs-bar-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', 'regular', 'light'],
    ['small', 'regular', 'dark'],
    ['small', 'regular', 'light-electric'],
    ['medium', 'regular', 'light'],
    ['medium', 'regular', 'dark'],
    ['medium', 'regular', 'light-electric'],
    ['small', 'semibold', 'light'],
    [{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }, 'regular', 'light'],
  ])('should return correct css for size: %j, weight: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
