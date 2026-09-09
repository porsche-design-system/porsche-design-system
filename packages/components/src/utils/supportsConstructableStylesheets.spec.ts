import { supportsConstructableStylesheets } from './supportsConstructableStylesheets';

describe('supportsConstructableStylesheets()', () => {
  it('should return true if CSSStyleSheet constructor exists', () => {
    // due to polyfill
    expect(supportsConstructableStylesheets()).toBe(true);
  });

  it('should return false if CSSStyleSheet constructor does not exist', () => {
    const globalCSSStyleSheet = global.CSSStyleSheet;
    global.CSSStyleSheet = undefined;
    expect(supportsConstructableStylesheets()).toBe(false);
    global.CSSStyleSheet = globalCSSStyleSheet;
  });
});
