import { injectGlobalStyle } from './inject-global-style';
import { FONT_FACE_CDN_URL } from '@porsche-design-system/styles';

beforeEach(() => {
  document.head.innerHTML = ''; // reset between tests
  jest.spyOn(global.console, 'warn').mockImplementation(); // to suppress logs
});

describe('injectGlobalStyle()', () => {
  it('should inject font-face.min.css', () => {
    const selector = `link[href="${FONT_FACE_CDN_URL}"]`;
    expect(document.head.querySelector(selector)).toBeNull();
    injectGlobalStyle(FONT_FACE_CDN_URL);

    const linkEl: HTMLLinkElement = document.head.querySelector(selector);
    expect(linkEl).not.toBeNull();
    expect(linkEl.href).toBe(FONT_FACE_CDN_URL);
    expect(linkEl.type).toBe('text/css');
    expect(linkEl.rel).toBe('stylesheet');
  });
});
