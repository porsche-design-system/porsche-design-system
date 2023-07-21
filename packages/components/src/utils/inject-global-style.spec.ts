import { injectGlobalStyle } from './inject-global-style';
import { FONT_FACE_CDN_URL } from '@porsche-design-system/styles';

beforeEach(() => {
  document.head.innerHTML = ''; // reset between tests
  jest.spyOn(global.console, 'warn').mockImplementation(); // to suppress logs
});

describe('if global styles are missing', () => {
  describe('for ROLLUP_REPLACE_IS_STAGING="production"', () => {
    beforeEach(() => {
      // @ts-ignore
      ROLLUP_REPLACE_IS_STAGING = 'production';
    });

    it('should call document.head.querySelector() with correct parameters', () => {
      const spy = jest.spyOn(document.head, 'querySelector');
      injectGlobalStyle();

      expect(spy).toBeCalledWith(`link[href='${FONT_FACE_CDN_URL}']`);
    });

    it('should inject font-face.min.css', () => {
      const selector = `link[href='${FONT_FACE_CDN_URL}']`;
      expect(document.head.querySelector(selector)).toBeNull();
      injectGlobalStyle();

      const linkEl: HTMLLinkElement = document.head.querySelector(selector);
      expect(linkEl).not.toBeNull();
      expect(linkEl.href).toBe(FONT_FACE_CDN_URL);
      expect(linkEl.type).toBe('text/css');
      expect(linkEl.rel).toBe('stylesheet');
    });
  });

  describe('for ROLLUP_REPLACE_IS_STAGING="staging"', () => {
    beforeEach(() => {
      // @ts-ignore
      ROLLUP_REPLACE_IS_STAGING = 'staging';
    });

    it('should not call document.head.querySelector() when ROLLUP_REPLACE_IS_STAGING="staging"', () => {
      const spy = jest.spyOn(document.head, 'querySelector');
      injectGlobalStyle();

      expect(spy).not.toBeCalled();
    });
  });
});

describe('if global styles are there', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link href="${FONT_FACE_CDN_URL}">
<style pds-initial-styles>some styles..</style>`;
  });

  describe('for ROLLUP_REPLACE_IS_STAGING="production"', () => {
    beforeEach(() => {
      // @ts-ignore
      ROLLUP_REPLACE_IS_STAGING = 'production';
    });

    it('should call document.head.querySelector() with correct parameters when ROLLUP_REPLACE_IS_STAGING is %s', () => {
      const spy = jest.spyOn(document.head, 'querySelector');
      injectGlobalStyle();

      expect(spy).toBeCalledWith(`link[href='${FONT_FACE_CDN_URL}']`);
    });
  });

  describe('for ROLLUP_REPLACE_IS_STAGING="staging"', () => {
    beforeEach(() => {
      // @ts-ignore
      ROLLUP_REPLACE_IS_STAGING = 'staging';
    });

    it('should not call document.head.querySelector() when ROLLUP_REPLACE_IS_STAGING="staging"', () => {
      const spy = jest.spyOn(document.head, 'querySelector');
      injectGlobalStyle();

      expect(spy).not.toBeCalled();
    });
  });
});
