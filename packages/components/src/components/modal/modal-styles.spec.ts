import { getComponentCss, isFullscreenForXl } from './modal-styles';
import type { BreakpointCustomizable } from '../../types';
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

describe('isFullscreenForXL()', () => {
  it.each<[BreakpointCustomizable<boolean>, boolean]>([
    [true, true],
    [false, false],
    [{ base: true }, true],
    [{ base: true, xs: true }, true],
    [{ base: true, xs: false }, false],
    [{ base: true, xs: true, s: true }, true],
    [{ base: true, xs: true, s: false }, false],
    [{ base: true, xs: true, s: true, m: true }, true],
    [{ base: true, xs: true, s: true, m: false }, false],
    [{ base: true, xs: true, s: true, m: true, l: true }, true],
    [{ base: true, xs: true, s: true, m: true, l: false }, false],
    [{ base: true, xs: true, s: true, m: true, l: true, xl: true }, true],
    [{ base: true, xs: true, s: true, m: true, l: true, xl: false }, false],
    [{ base: false }, false],
    [{ base: false, xs: true }, true],
    [{ base: false, xs: false }, false],
    [{ base: false, xs: false, s: true }, true],
    [{ base: false, xs: false, s: false }, false],
    [{ base: false, xs: false, s: false, m: true }, true],
    [{ base: false, xs: false, s: false, m: false }, false],
    [{ base: false, xs: false, s: false, m: false, l: true }, true],
    [{ base: false, xs: false, s: false, m: false, l: false }, false],
    [{ base: false, xs: false, s: false, m: false, l: false, xl: true }, true],
    [{ base: false, xs: false, s: false, m: false, l: false, xl: false }, false],
  ])('should for fullscreen: %o return: %s', (fullscreen, result) => {
    expect(isFullscreenForXl(fullscreen)).toBe(result);
  });
});
