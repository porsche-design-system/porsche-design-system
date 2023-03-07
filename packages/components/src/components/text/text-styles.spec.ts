import { getComponentCss } from './text-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small', 'regular', 'left', 'primary', false, 'light'],
    ['large', 'semi-bold', 'left', 'notification-info', true, 'light'],
    ['medium', 'bold', 'right', 'contrast-high', true, 'dark'],
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
