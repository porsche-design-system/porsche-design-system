import { vi } from 'vitest';
import { getCachedMinifiedCss, MAX_ENTRIES_PER_STYLE_FUNCTION } from '../../../src/getCachedMinifiedCss';

declare global {
  var PORSCHE_DESIGN_SYSTEM_CDN_URL: string | undefined;
}

// a new css string on every call, so that a cache hit is visible as an unchanged return value
const createGetCss = () => {
  let calls = 0;
  return vi.fn((..._args: unknown[]) => `css ${++calls}`);
};

describe('getCachedMinifiedCss()', () => {
  afterEach(() => {
    delete globalThis.PORSCHE_DESIGN_SYSTEM_CDN_URL;
  });

  it('should return the minified css of the style function', () => {
    const getCss = () => ':host {\n  display: block;\n}';

    expect(getCachedMinifiedCss(getCss)).toBe(':host{display:block}');
  });

  it('should call the style function once for equal arguments, incl. equal breakpoint objects', () => {
    const getCss = createGetCss();

    const css = getCachedMinifiedCss(getCss, 'car', { base: true, m: false });

    expect(getCachedMinifiedCss(getCss, 'car', { base: true, m: false })).toBe(css);
    expect(getCss).toHaveBeenCalledTimes(1);
  });

  it.each<{ description: string; args1: unknown[]; args2: unknown[] }>([
    { description: 'undefined and null', args1: [undefined], args2: [null] },
    {
      description: 'undefined and null between arguments',
      args1: ['sm', undefined, 'primary'],
      args2: ['sm', null, 'primary'],
    },
    {
      description: 'a breakpoint with undefined and a missing one',
      args1: [{ base: true, m: undefined }],
      args2: [{ base: true }],
    },
    {
      description: 'breakpoint objects with different values',
      args1: [{ base: true, m: false }],
      args2: [{ base: true, m: true }],
    },
    { description: 'a boolean and a string', args1: [true], args2: ['true'] },
    { description: 'a number and a string', args1: [1], args2: ['1'] },
  ])('should call the style function separately for $description', ({ args1, args2 }) => {
    const getCss = createGetCss();

    expect(getCachedMinifiedCss(getCss, ...args1)).not.toBe(getCachedMinifiedCss(getCss, ...args2));
  });

  it('should not share css between style functions called with equal arguments', () => {
    expect(getCachedMinifiedCss((_name: string) => 'icon', 'car')).toBe('icon');
    expect(getCachedMinifiedCss((_name: string) => 'link', 'car')).toBe('link');
  });

  it('should call the style function again when the CDN base URL changed', () => {
    const getCss = createGetCss();

    globalThis.PORSCHE_DESIGN_SYSTEM_CDN_URL = 'https://cdn.ui.porsche.com';
    const cssCom = getCachedMinifiedCss(getCss, 'car');
    globalThis.PORSCHE_DESIGN_SYSTEM_CDN_URL = 'https://cdn.ui.porsche.cn';
    const cssCn = getCachedMinifiedCss(getCss, 'car');

    expect(cssCn).not.toBe(cssCom);
    globalThis.PORSCHE_DESIGN_SYSTEM_CDN_URL = 'https://cdn.ui.porsche.com';
    expect(getCachedMinifiedCss(getCss, 'car')).toBe(cssCom);
  });

  it(`should keep at most ${MAX_ENTRIES_PER_STYLE_FUNCTION} entries per style function and evict the least recently used one`, () => {
    const getCss = createGetCss();
    const keys = Array.from({ length: MAX_ENTRIES_PER_STYLE_FUNCTION }, (_, i) => i);

    keys.forEach((key) => getCachedMinifiedCss(getCss, key));
    getCss.mockClear();
    keys.forEach((key) => getCachedMinifiedCss(getCss, key));
    expect(getCss).not.toHaveBeenCalled();

    getCachedMinifiedCss(getCss, 0); // 1 becomes the least recently used
    getCachedMinifiedCss(getCss, MAX_ENTRIES_PER_STYLE_FUNCTION);
    getCss.mockClear();

    getCachedMinifiedCss(getCss, 0);
    expect(getCss).not.toHaveBeenCalled();
    getCachedMinifiedCss(getCss, 1);
    expect(getCss).toHaveBeenCalledWith(1);
  });
});
