import { injectGlobalStyle } from './inject-global-style';
import { FONT_FACE_CDN_URL } from '@porsche-design-system/styles';

beforeEach(() => {
  document.head.innerHTML = ''; // reset between tests
  jest.spyOn(global.console, 'warn').mockImplementation(); // to suppress logs
});

describe('if global styles are missing', () => {
  it.each<[string, string]>([
    ['staging', 'http://localhost:3001/styles/font-face.min.css'],
    ['production', FONT_FACE_CDN_URL],
  ])(
    'should call document.head.querySelector() with correct parameters when ROLLUP_REPLACE_IS_STAGING is %s',
    (rollupReplaceIsStaging, parameter) => {
      // @ts-ignore
      ROLLUP_REPLACE_IS_STAGING = rollupReplaceIsStaging;
      const spy = jest.spyOn(document.head, 'querySelector');
      injectGlobalStyle();

      expect(spy).toBeCalledWith(`link[href="${parameter}"]`);
    }
  );

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

  it.each<[string, string]>([
    ['staging', 'http://localhost:3001/styles/font-face.min.css'],
    ['production', FONT_FACE_CDN_URL],
  ])(
    'should call document.head.querySelector() with correct parameters when ROLLUP_REPLACE_IS_STAGING is %s',
    (rollupReplaceIsStaging, parameter) => {
      // @ts-ignore
      ROLLUP_REPLACE_IS_STAGING = rollupReplaceIsStaging;
      const spy = jest.spyOn(document.head, 'querySelector');
      injectGlobalStyle();

      expect(spy).toBeCalledWith(`link[href="${parameter}"]`);
    }
  );
});
