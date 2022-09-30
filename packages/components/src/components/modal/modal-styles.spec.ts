import { getComponentCss, getSlottedCss, isFullscreenForXl } from './modal-styles';
import type { BreakpointCustomizable } from '../../types';
import * as focusVisibleFallbackUtils from '../../styles/focus-visible-fallback';
import { getFocusJssStyle } from '../../styles';

describe('getComponentCss()', () => {
  it('should call getFocusVisibleFallback() with correct parameters', () => {
    const spy = jest.spyOn(focusVisibleFallbackUtils, 'getFocusVisibleFallback');
    getComponentCss(true, true, true, true);

    expect(spy).toBeCalledWith(getFocusJssStyle({ color: '#fff' }));
  });

  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false, false],
    [false, true, false, false],
    [false, true, true, false],
    [false, true, true, true],
    [false, false, true, true],
    [false, false, false, true],
    [false, true, false, true],
    [true, false, false, false],
    [true, true, false, false],
    [true, true, true, false],
    [true, true, true, true],
    [true, false, true, true],
    [true, false, false, true],
    [true, true, false, true],
    [true, { base: true, xs: false, s: true, m: false, l: true, xl: false }, false, false],
  ])('should return correct css for open: %s, fullscreen: %o, disableCloseButton: %s and hasHeader: %s', (...args) => {
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

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-modal');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-modal');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
