import { getComponentCss } from './display-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['large', 'left', 'primary', false, 'light'],
    ['large', 'left', 'primary', false, 'light'],
    ['large', 'right', 'primary', true, 'dark'],
    ['large', 'center', 'primary', false, 'dark'],
    ['large', 'left', 'primary', true, 'light'],
    ['large', 'left', 'primary', true, 'light'],
    ['medium', 'right', 'inherit', true, 'dark'],
    ['medium', 'left', 'inherit', false, 'light'],
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
