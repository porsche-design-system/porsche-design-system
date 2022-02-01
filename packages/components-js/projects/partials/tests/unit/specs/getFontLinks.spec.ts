import { getFontLinks } from '../../../src';

describe('getFontLinks()', () => {
  const cdnFontUrlWithoutHash = 'https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-';
  const cdnFontUrlCnWithoutHash = 'https://cdn.ui.porsche.cn/porsche-design-system/fonts/porsche-next-w-';
  const linkStartsWith = '<link rel=preload href=';
  const linkEndsWith = 'as=font type=font/woff2 crossorigin>';
  const urlStartsWith = 'https://';
  const urlEndsWith = '.woff2';

  describe('validation', () => {
    it('should throw error on invalid font weights option', () => {
      let error;
      try {
        getFontLinks({ weights: ['some-invalid-weight'] as any[] });
      } catch (e) {
        error = e.message;
      }

      expect(error).toContain('The following supplied font weights are invalid:');
      expect(error).toContain('some-invalid-weight');
    });

    it('should throw error on invalid font subset option', () => {
      let error;
      try {
        getFontLinks({ subset: 'some-invalid-subset' as any });
      } catch (e) {
        error = e.message;
      }

      expect(error).toContain('The following supplied font subset is invalid:');
      expect(error).toContain('some-invalid-subset');
    });

    it('should throw error on invalid weight options', () => {
      expect(() => getFontLinks({ weight: ['latin'] } as any)).toThrowErrorMatchingInlineSnapshot(
        '"Option \\"weight\\" is not supported, please use \\"weights\\" instead"'
      );
    });
  });

  describe('url with tag', () => {
    it('should return default link', () => {
      const result = getFontLinks();
      expect(result.startsWith(linkStartsWith)).toBeTruthy();
      expect(result.endsWith(linkEndsWith)).toBeTruthy();
      expect(result).toContain(cdnFontUrlWithoutHash + 'la-regular');
    });

    it('should return default China CDN link', () => {
      const result = getFontLinks({ cdn: 'cn' });
      expect(result.startsWith(linkStartsWith)).toBeTruthy();
      expect(result.endsWith(linkEndsWith)).toBeTruthy();
      expect(result).toContain(cdnFontUrlCnWithoutHash + 'la-regular');
    });

    it.each([
      ['latin', 'thin', 'la-thin'],
      ['latin', 'regular', 'la-regular'],
      ['latin', 'semi-bold', 'la-semi-bold'],
      ['latin', 'bold', 'la-bold'],
      ['greek', 'thin', 'gr-thin'],
      ['greek', 'regular', 'gr-regular'],
      ['greek', 'semi-bold', 'gr-semi-bold'],
      ['greek', 'bold', 'gr-bold'],
      ['cyril', 'thin', 'cy-thin'],
      ['cyril', 'regular', 'cy-regular'],
      ['cyril', 'semi-bold', 'cy-semi-bold'],
      ['cyril', 'bold', 'cy-bold'],
    ])(
      'should return %s subset and %s weight link',
      (subset: 'latin' | 'cyril' | 'greek', weight: 'thin' | 'regular' | 'semi-bold' | 'bold', expected) => {
        const result = getFontLinks({ subset, weights: [weight] });
        expect(result.startsWith(linkStartsWith)).toBeTruthy();
        expect(result.endsWith(linkEndsWith)).toBeTruthy();
        expect(result).toContain(cdnFontUrlWithoutHash + expected);
      }
    );

    it('should return multiple links', () => {
      const result = getFontLinks({ weights: ['regular', 'semi-bold'] });
      expect(result.startsWith(linkStartsWith)).toBeTruthy();
      expect(result.endsWith(linkEndsWith)).toBeTruthy();
      expect(result).toContain('><link');
      expect(result).toContain(cdnFontUrlWithoutHash + 'la-regular');
      expect(result).toContain(cdnFontUrlWithoutHash + 'la-semi-bold');
    });

    it('should be minified', () => {
      const result = getFontLinks();
      expect(result).not.toContain('"');
      expect(result).not.toContain("'");
    });
  });

  describe('url without tag', () => {
    let consoleWarnSpy;

    beforeEach(() => (consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => {})));
    afterEach(() => jest.clearAllMocks());

    it('should return default url', () => {
      const result = getFontLinks({ withoutTags: true });

      expect(consoleWarnSpy).toBeCalledWith(
        'The option "{ withoutTags: true }" of partial getFontLinks() is deprecated and will be removed in v3'
      );

      expect(result.length).toBe(1);
      expect(result[0].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[0].endsWith(urlEndsWith)).toBeTruthy();
      expect(result[0]).toContain(cdnFontUrlWithoutHash + 'la-regular');
    });

    it('should return default China CDN url', () => {
      const result = getFontLinks({ withoutTags: true, cdn: 'cn' });

      expect(consoleWarnSpy).toBeCalledWith(
        'The option "{ withoutTags: true }" of partial getFontLinks() is deprecated and will be removed in v3'
      );

      expect(result.length).toBe(1);
      expect(result[0].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[0].endsWith(urlEndsWith)).toBeTruthy();
      expect(result[0]).toContain(cdnFontUrlCnWithoutHash + 'la-regular');
    });

    it.each([
      ['latin', 'thin', 'la-thin'],
      ['latin', 'regular', 'la-regular'],
      ['latin', 'semi-bold', 'la-semi-bold'],
      ['latin', 'bold', 'la-bold'],
      ['greek', 'thin', 'gr-thin'],
      ['greek', 'regular', 'gr-regular'],
      ['greek', 'semi-bold', 'gr-semi-bold'],
      ['greek', 'bold', 'gr-bold'],
      ['cyril', 'thin', 'cy-thin'],
      ['cyril', 'regular', 'cy-regular'],
      ['cyril', 'semi-bold', 'cy-semi-bold'],
      ['cyril', 'bold', 'cy-bold'],
    ])(
      'should return %s subset and %s weight url',
      (subset: 'latin' | 'cyril' | 'greek', weight: 'thin' | 'regular' | 'semi-bold' | 'bold', expected) => {
        const result = getFontLinks({ withoutTags: true, subset, weights: [weight] });

        expect(consoleWarnSpy).toBeCalledWith(
          'The option "{ withoutTags: true }" of partial getFontLinks() is deprecated and will be removed in v3'
        );

        expect(result.length).toBe(1);
        expect(result[0].startsWith(urlStartsWith)).toBeTruthy();
        expect(result[0].endsWith(urlEndsWith)).toBeTruthy();
        expect(result[0]).toContain(cdnFontUrlWithoutHash + expected);
      }
    );

    it('should return multiple urls', () => {
      const result = getFontLinks({ withoutTags: true, weights: ['regular', 'semi-bold'] });

      expect(consoleWarnSpy).toBeCalledWith(
        'The option "{ withoutTags: true }" of partial getFontLinks() is deprecated and will be removed in v3'
      );

      expect(result.length).toBe(2);
      expect(result[0].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[0].endsWith(urlEndsWith)).toBeTruthy();
      expect(result[0]).toContain(cdnFontUrlWithoutHash + 'la-regular');
      expect(result[1].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[1].endsWith(urlEndsWith)).toBeTruthy();
      expect(result[1]).toContain(cdnFontUrlWithoutHash + 'la-semi-bold');
    });
  });
});
