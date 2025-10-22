import { FONT_FACE_CDN_FILE_CN, FONT_FACE_CDN_FILE_COM } from '@porsche-design-system/assets';
import { vi } from 'vitest';
import * as getCDNBaseURLUtils from './getCDNBaseURL';
import { injectGlobalStyle } from './inject-global-style';

beforeEach(() => {
  document.head.innerHTML = ''; // reset between tests
  vi.spyOn(global.console, 'warn').mockImplementation(() => null); // to suppress logs
});

describe('if global styles are missing', () => {
  describe('for ROLLUP_REPLACE_IS_STAGING="production"', () => {
    beforeEach(() => {
      // @ts-expect-error
      ROLLUP_REPLACE_IS_STAGING = 'production';
    });

    it('should call document.head.querySelector() with correct parameters', () => {
      const spy = vi.spyOn(document.head, 'querySelector');
      injectGlobalStyle();

      expect(spy).toHaveBeenCalledWith(
        `link[href='https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}'],style[data-pds-font-face-styles=""]`
      );

      vi.spyOn(getCDNBaseURLUtils, 'getCDNBaseURL').mockReturnValue('https://cdn.ui.porsche.cn/porsche-design-system');
      injectGlobalStyle();
      expect(spy).toHaveBeenCalledWith(
        `link[href='https://cdn.ui.porsche.cn/porsche-design-system/styles/${FONT_FACE_CDN_FILE_CN}'],style[data-pds-font-face-styles=""]`
      );
    });

    it('should inject font-face.css', () => {
      const selector = `link[href='https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}']`;
      expect(document.head.querySelector(selector)).toBeNull();
      injectGlobalStyle();

      const linkEl: HTMLLinkElement = document.head.querySelector(selector);
      expect(linkEl).not.toBeNull();
      expect(linkEl.href).toBe(`https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}`);
      expect(linkEl.type).toBe('text/css');
      expect(linkEl.rel).toBe('stylesheet');
    });
  });

  describe('for ROLLUP_REPLACE_IS_STAGING="staging"', () => {
    beforeEach(() => {
      // @ts-expect-error
      ROLLUP_REPLACE_IS_STAGING = 'staging';
    });

    it('should not call document.head.querySelector() when ROLLUP_REPLACE_IS_STAGING="staging"', () => {
      const spy = vi.spyOn(document.head, 'querySelector');
      injectGlobalStyle();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});

describe('if global styles are there (link)', () => {
  beforeEach(() => {
    document.head.innerHTML = `<link href="https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}">`;
  });

  describe('for ROLLUP_REPLACE_IS_STAGING="production"', () => {
    beforeEach(() => {
      // @ts-expect-error
      ROLLUP_REPLACE_IS_STAGING = 'production';
    });

    it('should call document.head.querySelector() with correct parameters when ROLLUP_REPLACE_IS_STAGING is %s', () => {
      const spy = vi.spyOn(document.head, 'querySelector');
      injectGlobalStyle();

      expect(spy).toHaveBeenCalledWith(
        `link[href='https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}'],style[data-pds-font-face-styles=""]`
      );
    });
  });

  describe('for ROLLUP_REPLACE_IS_STAGING="staging"', () => {
    beforeEach(() => {
      // @ts-expect-error
      ROLLUP_REPLACE_IS_STAGING = 'staging';
    });

    it('should not call document.head.querySelector() when ROLLUP_REPLACE_IS_STAGING="staging"', () => {
      const spy = vi.spyOn(document.head, 'querySelector');
      injectGlobalStyle();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});

describe('if global styles are there (inline style)', () => {
  beforeEach(() => {
    document.head.innerHTML = '<style data-pds-font-face-styles></style>';
  });

  describe('for ROLLUP_REPLACE_IS_STAGING="production"', () => {
    beforeEach(() => {
      // @ts-expect-error
      ROLLUP_REPLACE_IS_STAGING = 'production';
    });

    it('should call document.head.querySelector() with correct parameters when ROLLUP_REPLACE_IS_STAGING is %s', () => {
      const spy = vi.spyOn(document.head, 'querySelector');
      injectGlobalStyle();

      expect(spy).toHaveBeenCalledWith(
        `link[href='https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}'],style[data-pds-font-face-styles=""]`
      );
    });
  });

  describe('for ROLLUP_REPLACE_IS_STAGING="staging"', () => {
    beforeEach(() => {
      // @ts-expect-error
      ROLLUP_REPLACE_IS_STAGING = 'staging';
    });

    it('should not call document.head.querySelector() when ROLLUP_REPLACE_IS_STAGING="staging"', () => {
      const spy = vi.spyOn(document.head, 'querySelector');
      injectGlobalStyle();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
