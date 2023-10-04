import { getComponentCss, isFullscreenForXl } from './modal-styles';
import type { BreakpointCustomizable } from '../../types';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, true, false, false, 'light'],
    [false, true, true, false, false, 'dark'],
    [false, true, false, false, false, 'light'],
    [false, true, false, true, false, 'dark'],
    [false, false, false, true, false, 'light'],
    [false, false, true, true, false, 'dark'],
    [false, true, true, true, false, 'light'],
    [true, false, true, false, false, 'dark'],
    [true, true, true, false, false, 'light'],
    [true, true, false, false, false, 'dark'],
    [true, true, false, true, false, 'light'],
    [true, false, false, true, false, 'dark'],
    [true, false, true, true, false, 'light'],
    [true, true, true, true, false, 'dark'],
    [true, { base: true, xs: false, s: true, m: false, l: true, xl: false }, true, false, false, 'light'],
    [true, false, false, true, true, 'dark'],
    [true, false, false, false, true, 'light'],
  ])(
    'should return correct css for open: %s, fullscreen: %o, dismissButton: %s, hasHeader: %s, hasFooter: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
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
