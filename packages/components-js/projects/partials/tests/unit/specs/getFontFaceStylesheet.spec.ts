import { getFontFaceStylesheet } from '../../../src';

describe('getFontFaceStylesheet()', () => {
  const cdnStyleUrlWithoutHash = `https://cdn.ui.porsche.com/porsche-design-system/styles/font-face.min`;
  const cdnStyleUrlCnWithoutHash = `https://cdn.ui.porsche.cn/porsche-design-system/styles/font-face.min`;
  const linkStartsWith = '<link rel=stylesheet href=';
  const linkEndsWith = 'type=text/css crossorigin>';
  const urlStartsWith = 'https://';
  const urlEndsWith = '.css';

  it('should return link with FONT_FACE_STYLE_CDN_URL', () => {
    const result = getFontFaceStylesheet();
    expect(result.startsWith(linkStartsWith)).toBeTruthy();
    expect(result.endsWith(linkEndsWith)).toBeTruthy();
    expect(result).toContain(cdnStyleUrlWithoutHash);
  });

  it('should return only href', () => {
    const result = getFontFaceStylesheet({ withoutTags: true });
    expect(result.startsWith(urlStartsWith)).toBeTruthy();
    expect(result.endsWith(urlEndsWith)).toBeTruthy();
    expect(result).toContain(cdnStyleUrlWithoutHash);
  });

  it('should return only href with cdn: "auto"', () => {
    const result = getFontFaceStylesheet({ withoutTags: true, cdn: 'auto' });
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
      expect(result.startsWith(urlStartsWith)).toBeTruthy();
      expect(result.endsWith(urlEndsWith)).toBeTruthy();
      expect(result).toContain(cdnStyleUrlCnWithoutHash);
    });
  });
});
