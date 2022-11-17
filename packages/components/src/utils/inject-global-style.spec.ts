import { injectGlobalStyle } from './inject-global-style';
import { FONT_FACE_CDN_URL } from '@porsche-design-system/styles';

beforeEach(() => {
  document.head.innerHTML = ''; // reset between tests
  jest.spyOn(global.console, 'warn').mockImplementation(); // to suppress logs
});

describe('if global styles are missing', () => {
  it('should call document.head.querySelector()', () => {
    const spy = jest.spyOn(document.head, 'querySelector');
    injectGlobalStyle();

    expect(spy).toBeCalledTimes(1);
  });

  it('should call console.warn()', () => {
    const spy = jest.spyOn(global.console, 'warn');
    injectGlobalStyle();

    expect(spy).toBeCalledTimes(1);
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
});

describe('if global styles are there', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link href="${FONT_FACE_CDN_URL}">
<style pds-initial-styles>some styles..</style>`;
  });

  it('should call document.head.querySelector()', () => {
    const spy = jest.spyOn(document.head, 'querySelector');
    injectGlobalStyle();

    expect(spy).toBeCalledTimes(1);
  });

  it('should not call console.warn()', () => {
    const spy = jest.spyOn(global.console, 'warn');
    injectGlobalStyle();

    expect(spy).not.toBeCalled();
  });
});
