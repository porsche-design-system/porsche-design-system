import { injectGlobalStyle } from './inject-global-style';
import { FONT_FACE_CDN_FILE_COM, FONT_FACE_CDN_FILE_CN } from '@porsche-design-system/styles';
import * as getCDNBaseURLUtils from './getCDNBaseURL';

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

      expect(spy).toBeCalledWith(
        `link[href='https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}']`
      );

      jest
        .spyOn(getCDNBaseURLUtils, 'getCDNBaseURL')
        .mockReturnValue('https://cdn.ui.porsche.cn/porsche-design-system');
      injectGlobalStyle();
      expect(spy).toBeCalledWith(
        `link[href='https://cdn.ui.porsche.cn/porsche-design-system/styles/${FONT_FACE_CDN_FILE_CN}']`
      );
    });

    it('should inject font-face.min.css', () => {
      const selector = `link[href='https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}']`;
      expect(document.head.querySelector(selector)).toBeNull();
      injectGlobalStyle();

      const linkEl: HTMLLinkElement = document.head.querySelector(selector);
      expect(linkEl).not.toBeNull();
      expect(linkEl.href).toBe('https://cdn.ui.porsche.com/porsche-design-system/styles/' + FONT_FACE_CDN_FILE_COM);
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
    document.head.innerHTML = `<link href="https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}">
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

      expect(spy).toBeCalledWith(
        `link[href='https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}']`
      );
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
