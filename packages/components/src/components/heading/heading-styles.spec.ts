import { getComponentCss } from './heading-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['xx-large', 'start', 'primary', false, 'light'],
    ['x-large', 'start', 'primary', false, 'light'],
    ['x-large', 'left', 'primary', false, 'light'],
    ['x-large', 'right', 'primary', false, 'light'],
    ['large', 'center', 'inherit', true, 'dark'],
    ['medium', 'center', 'inherit', true, 'dark'],
    ['small', 'center', 'inherit', true, 'dark'],
    ['inherit', 'center', 'inherit', true, 'dark'],
    [
      { base: 'small', xs: 'medium', s: 'large', m: 'x-large', l: 'xx-large', xl: 'large' },
      'end',
      'inherit',
      false,
      'dark',
    ],
  ])('should return correct css for size: %j, align: %s, color: %s, ellipsis: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
