import { getComponentCss } from './heading-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['heading-1', 'left', 'default', false, 'light'],
    ['inherit', 'left', 'default', false, 'light'],
    ['large-title', 'center', 'inherit', true, 'dark'],
    ['heading-2', 'center', 'inherit', true, 'dark'],
    ['heading-3', 'center', 'inherit', true, 'dark'],
    ['heading-4', 'center', 'inherit', true, 'dark'],
    ['heading-5', 'center', 'inherit', true, 'dark'],
    [
      { base: 'small', xs: 'large', s: 'small', m: 'large', l: 'small', xl: 'large' },
      'right',
      'inherit',
      false,
      'dark',
    ],
  ])('should return correct css for variant: %j, align: %s, color: %s, ellipsis: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
