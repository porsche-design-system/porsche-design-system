import { getComponentCss } from './text-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', 'regular', 'left', 'primary', false, 'light'],
    ['small', 'regular', 'left', 'default', false, 'light'],
    ['x-large', 'thin', 'right', 'brand', true, 'dark'],
    ['x-large', 'regular', 'center', 'brand', false, 'dark'],
    ['large', 'semi-bold', 'left', 'notification-info', true, 'light'],
    ['large', 'semibold', 'left', 'notification-error', true, 'light'],
    ['medium', 'bold', 'right', 'neutral-contrast-high', true, 'dark'],
    ['x-small', 'semibold', 'left', 'inherit', false, 'light'],
    ['inherit', 'bold', 'center', 'default', false, 'light'],
    [
      { base: 'small', xs: 'large', s: 'medium', m: 'inherit', l: 'x-small', xl: 'x-large' },
      'bold',
      'center',
      'notification-error',
      true,
      'dark',
    ],
  ])(
    'should return correct css for size: %j, weight: %s, align: %s, color: %s, ellipsis: %o and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
