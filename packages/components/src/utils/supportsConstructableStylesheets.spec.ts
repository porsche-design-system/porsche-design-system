import { supportsConstructableStylesheets } from './supportsConstructableStylesheets';

describe('supportsConstructableStylesheets()', () => {
  const originalCSSStyleSheet = global.CSSStyleSheet;

  // runs even when a test fails, so the global can never leak into the next one
  afterEach(() => {
    global.CSSStyleSheet = originalCSSStyleSheet;
  });

  it('should return true if CSSStyleSheet constructor exists', () => {
    // due to polyfill
    expect(supportsConstructableStylesheets()).toBe(true);
  });

  it('should return false if CSSStyleSheet constructor does not exist', () => {
    global.CSSStyleSheet = undefined;
    expect(supportsConstructableStylesheets()).toBe(false);
  });
});
