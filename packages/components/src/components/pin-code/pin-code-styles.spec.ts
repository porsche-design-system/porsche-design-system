import { getComponentCss } from './pin-code-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['number', false, 'none', false, 'light'],
    ['password', true, 'error', true, 'dark'],
    ['number', { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'success', false, 'light',],
  ])(
    'should return correct css for type: %s, hideLabel: %o, state: %s, isDisabled: %s, theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
