import { injectGlobalStyle } from './inject-global-style';
import { FONT_FACE_CDN_URL } from '@porsche-design-system/styles';
import { TAG_NAMES } from '@porsche-design-system/shared';

beforeEach(() => {
  document.head.innerHTML = ''; // reset between tests
  jest.spyOn(console, 'warn').mockImplementation(); // to suppress logs
});

describe('if global styles are missing', () => {
  it('should call document.head.querySelector() twice', () => {
    const spy = jest.spyOn(document.head, 'querySelector');
    injectGlobalStyle();

    expect(spy).toBeCalledTimes(2);
  });

  it('should call console.warn() twice', () => {
    const spy = jest.spyOn(console, 'warn');
    injectGlobalStyle();

    expect(spy).toBeCalledTimes(2);
  });

  it('should inject font-face.min.css', () => {
    const selector = `link[href="${FONT_FACE_CDN_URL}"]`;
    expect(document.head.querySelector(selector)).toBeNull();
    injectGlobalStyle();

    const linkEl: HTMLLinkElement = document.head.querySelector(selector);
    expect(linkEl).not.toBeNull();
    expect(linkEl.href).toBe(FONT_FACE_CDN_URL);
    expect(linkEl.type).toBe('text/css');
    expect(linkEl.rel).toBe('stylesheet');
  });

  it('should inject initial styles', () => {
    const selector = 'style[pds-initial-styles]';
    expect(document.head.querySelector(selector)).toBeNull();
    injectGlobalStyle();

    const styleEl: HTMLStyleElement = document.head.querySelector(selector);
    expect(styleEl).not.toBeNull();
    expect(styleEl.innerText).toBe(TAG_NAMES.join(',') + '{visibility:hidden}.hydrated{visibility:inherit}');
  });
});

describe('if global styles are there', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link href="${FONT_FACE_CDN_URL}">
<style pds-initial-styles>some styles..</style>`;
  });

  it('should call document.head.querySelector() twice', () => {
    const spy = jest.spyOn(document.head, 'querySelector');
    injectGlobalStyle();

    expect(spy).toBeCalledTimes(2);
  });

  it('should not call console.warn()', () => {
    const spy = jest.spyOn(console, 'warn');
    injectGlobalStyle();

    expect(spy).not.toBeCalled();
  });
});
