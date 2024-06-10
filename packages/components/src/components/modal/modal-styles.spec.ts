import { getComponentCss } from './modal-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'blur', false, true, false, false, 'light'],
    [false, 'shading', false, true, false, false, 'light'],
    [false, 'blur', true, true, false, false, 'dark'],
    [false, 'shading', true, true, false, false, 'dark'],
    [false, 'blur', true, true, false, false, 'auto'],
    [false, 'shading', true, true, false, false, 'auto'],
    [false, 'blur', true, false, false, false, 'light'],
    [false, 'blur', true, false, true, false, 'dark'],
    [false, 'blur', false, false, true, false, 'light'],
    [false, 'blur', false, true, true, false, 'dark'],
    [false, 'blur', true, true, true, false, 'light'],
    [true, 'blur', false, true, false, false, 'dark'],
    [true, 'blur', true, true, false, false, 'light'],
    [true, 'blur', true, false, false, false, 'dark'],
    [true, 'blur', true, false, true, false, 'light'],
    [true, 'blur', false, false, true, false, 'dark'],
    [true, 'blur', false, true, true, false, 'light'],
    [true, 'blur', true, true, true, false, 'dark'],
    [true, 'blur', { base: true, xs: false, s: true, m: false, l: true, xl: false }, true, false, false, 'light'],
    [true, 'blur', false, false, true, true, 'dark'],
    [true, 'blur', false, false, false, true, 'light'],
  ])(
    'should return correct css for open: %s, backdrop: %s, fullscreen: %o, dismissButton: %s, hasHeader: %s, hasFooter: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
