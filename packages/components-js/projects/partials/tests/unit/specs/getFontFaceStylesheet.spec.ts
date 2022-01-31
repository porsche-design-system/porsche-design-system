import { getFontFaceStylesheet } from '../../../src';

describe('getFontFaceStylesheet()', () => {
  const cdnStyleUrlWithoutHash = `https://cdn.ui.porsche.com/porsche-design-system/styles/font-face.min`;
  const cdnStyleUrlCnWithoutHash = `https://cdn.ui.porsche.cn/porsche-design-system/styles/font-face.min`;
  const linkStartsWith = '<link rel=preconnect href=';
  const linkEndsWith = 'type=text/css crossorigin>';
  const linkStylesheet = '<link rel=stylesheet href=';
  const linkDnsPrefetch = '<link rel=dns-prefetch href=';
  const urlStartsWith = 'https://';
  const urlEndsWith = '.css';

  let consoleWarnSpy;

  beforeEach(() => (consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => {})));
  afterEach(() => jest.clearAllMocks());

  it('should return links with preconnect, dns-prefetch and FONT_FACE_STYLE_CDN_URL', () => {
    const result = getFontFaceStylesheet();

    expect(result.startsWith(linkStartsWith)).toBeTruthy();
    expect(result.match(/><link/g).length).toBe(2);
    expect(result.endsWith(linkEndsWith)).toBeTruthy();
    expect(result).toContain(linkStylesheet);
    expect(result).toContain(linkDnsPrefetch);
    expect(result).toContain(cdnStyleUrlWithoutHash);
  });

  it('should return only href', () => {
    const result = getFontFaceStylesheet({ withoutTags: true });

    expect(consoleWarnSpy).toBeCalledWith(
      'The option "{ withoutTags: true }" of partial getFontFaceStylesheet() is deprecated and will be removed in v3'
    );

    expect(result.startsWith(urlStartsWith)).toBeTruthy();
    expect(result.endsWith(urlEndsWith)).toBeTruthy();
    expect(result).toContain(cdnStyleUrlWithoutHash);
  });

  it('should return only href with cdn: "auto"', () => {
    const result = getFontFaceStylesheet({ withoutTags: true, cdn: 'auto' });

    expect(consoleWarnSpy).toBeCalledWith(
      'The option "{ withoutTags: true }" of partial getFontFaceStylesheet() is deprecated and will be removed in v3'
    );

    expect(result.startsWith(urlStartsWith)).toBeTruthy();
    expect(result.endsWith(urlEndsWith)).toBeTruthy();
    expect(result).toContain(cdnStyleUrlWithoutHash);
  });

  it('should be minified', () => {
    const result = getFontFaceStylesheet();
    expect(result).not.toContain('"');
    expect(result).not.toContain("'");
  });

  describe('option: { cdn: "cn" }', () => {
    it('should return correct url for china cdn', () => {
      const result = getFontFaceStylesheet({ withoutTags: true, cdn: 'cn' });

      expect(consoleWarnSpy).toBeCalledWith(
        'The option "{ withoutTags: true }" of partial getFontFaceStylesheet() is deprecated and will be removed in v3'
      );

      expect(result.startsWith(urlStartsWith)).toBeTruthy();
      expect(result.endsWith(urlEndsWith)).toBeTruthy();
      expect(result).toContain(cdnStyleUrlCnWithoutHash);
    });
  });
});
