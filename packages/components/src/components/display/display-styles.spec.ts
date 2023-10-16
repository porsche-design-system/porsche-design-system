import { getComponentCss } from './display-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['large', 'start', 'primary', false, 'light'],
    ['large', 'start', 'primary', false, 'light'],
    ['large', 'end', 'primary', true, 'dark'],
    ['large', 'center', 'primary', false, 'dark'],
    ['large', 'start', 'primary', true, 'light'],
    ['large', 'start', 'primary', true, 'light'],
    ['medium', 'end', 'inherit', true, 'dark'],
    ['medium', 'start', 'inherit', false, 'light'],
    ['small', 'end', 'inherit', true, 'dark'],
    ['small', 'start', 'inherit', false, 'light'],
    ['inherit', 'center', 'primary', false, 'light'],
    [
      { base: 'medium', xs: 'large', s: 'medium', m: 'inherit', l: 'large', xl: 'medium' },
      'center',
      'primary',
      true,
      'dark',
    ],
  ])('should return correct css for size: %j, align: %s, color: %s, ellipsis: %o and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
