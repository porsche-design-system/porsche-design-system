import { getComponentCss, isFullscreenForXl } from './modal-styles';
import type { BreakpointCustomizable } from '../../../types';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false],
    [false, true],
    [true, false],
    [true, true],
    [true, { base: true, xs: false, s: true, m: false, l: true, xl: false }],
  ])('should return correct css for open: %s and fullscreen: %o', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
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
