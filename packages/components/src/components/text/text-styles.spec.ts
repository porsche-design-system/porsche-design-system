import { getComponentCss } from './text-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', 'regular', 'start', 'primary', false, 'light'],
    ['small', 'regular', 'left', 'primary', false, 'light'],
    ['small', 'regular', 'right', 'primary', false, 'light'],
    ['large', 'semi-bold', 'start', 'notification-info', true, 'light'],
    ['medium', 'bold', 'end', 'contrast-high', true, 'dark'],
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
