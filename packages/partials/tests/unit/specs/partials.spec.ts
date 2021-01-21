import { getFontFaceStylesheet, getInitialStyles, getFontPreloadLink } from '../../../src';

describe('getFontFaceStylesheet', () => {
  const cdnStyleUrlWithoutHash = `https://cdn.ui.porsche.com/porsche-design-system/styles/font-face.min`;
  const cdnStyleUrlCnWithoutHash = `https://cdn.ui.porsche.cn/porsche-design-system/styles/font-face.min`;

  it('should return link with FONT_FACE_STYLE_CDN_URL', () => {
    const result = getFontFaceStylesheet();
    expect(result).toContain('<link');
    expect(result).toContain('preconnect');
    expect(result).toContain(cdnStyleUrlWithoutHash);
  });

  it('should return only href', () => {
    const result = getFontFaceStylesheet({ withoutTags: true });
    expect(result).not.toContain('<link');
    expect(result).not.toContain('preconnect');
    expect(result).not.toContain('.cn.');
    expect(result).toContain(cdnStyleUrlWithoutHash);
  });

  it('should return only href with cdn: "auto"', () => {
    const result = getFontFaceStylesheet({ withoutTags: true, cdn: 'auto' });
    expect(result).not.toContain('<link');
    expect(result).not.toContain('preconnect');
    expect(result).not.toContain('.cn.');
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
      expect(result).not.toContain('<link');
      expect(result).not.toContain('preconnect');
      expect(result).toContain(cdnStyleUrlCnWithoutHash);
      expect(result).toContain('.cn.');
    });
  });
});

describe('getInitialStyles', () => {
  it('should return style element with Porsche Design System components', () => {
    const result = getInitialStyles();
    expect(result).toContain('<style>');
    expect(result).toContain('p-button');
    expect(result).toContain('p-textarea-wrapper');
  });

  it('should return core styles without style tag', () => {
    const result = getInitialStyles({ withoutTags: true });
    expect(result).not.toContain('<style>');
    expect(result).toContain('p-button');
    expect(result).toContain('p-textarea-wrapper');
  });

  it('should be minified', () => {
    const result = getInitialStyles();
    expect(result).not.toContain(' ');
    expect(result).not.toContain('\n');
  });

  it('should add custom prefixes to style names', () => {
    const result = getInitialStyles({ prefix: 'custom-prefix' });
    expect(result).not.toContain(',p-button');
    expect(result).toContain('custom-prefix-p-textarea-wrapper');
  });
});

describe('getFontPreloadLink', () => {
  const cdnFontUrlWithoutHash = `https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-`;
  const cdnFontUrlCnWithoutHash = `https://cdn.ui.porsche.cn/porsche-design-system/fonts/porsche-next-w-`;

  describe('url with tag', () => {
    it('should return default link', () => {
      const result = getFontPreloadLink();
      expect(result.startsWith('<link rel=preconnect href=')).toBeTruthy();
      expect(result.endsWith('as=font type=font/woff2 crossorigin>')).toBeTruthy();
      expect(result).toContain(cdnFontUrlWithoutHash + 'la-regular');
    });

    it('should return default China CDN link', () => {
      const result = getFontPreloadLink({ cdn: 'cn' });
      expect(result.startsWith('<link rel=preconnect href=')).toBeTruthy();
      expect(result.endsWith('as=font type=font/woff2 crossorigin>')).toBeTruthy();
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
        const result = getFontPreloadLink({ subset, weight: [weight] });
        expect(result.startsWith('<link rel=preconnect href=')).toBeTruthy();
        expect(result.endsWith('as=font type=font/woff2 crossorigin>')).toBeTruthy();
        expect(result).toContain(cdnFontUrlWithoutHash + expected);
      }
    );

    it('should return multiple links', () => {
      const result = getFontPreloadLink({ weight: ['regular', 'semi-bold'] });
      expect(result.startsWith('<link rel=preconnect href=')).toBeTruthy();
      expect(result.endsWith('as=font type=font/woff2 crossorigin>')).toBeTruthy();
      expect(result).toContain('.woff2 as=font type=font/woff2 crossorigin><link rel=preconnect href=');
      expect(result).toContain(cdnFontUrlWithoutHash + 'la-regular');
      expect(result).toContain(cdnFontUrlWithoutHash + 'la-semi-bold');
    });
  });

  describe('url without tag', () => {
    it('should return default url', () => {
      const result = getFontPreloadLink({ withoutTags: true });
      expect(result.length).toBe(1);
      expect(result[0].startsWith('https://')).toBeTruthy();
      expect(result[0].endsWith('.woff2')).toBeTruthy();
      expect(result[0]).toContain(cdnFontUrlWithoutHash + 'la-regular');
    });

    it('should return default China CDN url', () => {
      const result = getFontPreloadLink({ withoutTags: true, cdn: 'cn' });
      expect(result.length).toBe(1);
      expect(result[0].startsWith('https://')).toBeTruthy();
      expect(result[0].endsWith('.woff2')).toBeTruthy();
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
        const result = getFontPreloadLink({ withoutTags: true, subset, weight: [weight] });
        expect(result.length).toBe(1);
        expect(result[0].startsWith('https://')).toBeTruthy();
        expect(result[0].endsWith('.woff2')).toBeTruthy();
        expect(result[0]).toContain(cdnFontUrlWithoutHash + expected);
      }
    );

    it('should return multiple urls', () => {
      const result = getFontPreloadLink({ withoutTags: true, weight: ['regular', 'semi-bold'] });
      expect(result.length).toBe(2);
      expect(result[0].startsWith('https://')).toBeTruthy();
      expect(result[0].endsWith('.woff2')).toBeTruthy();
      expect(result[0]).toContain(cdnFontUrlWithoutHash + 'la-regular');
      expect(result[1].startsWith('https://')).toBeTruthy();
      expect(result[1].endsWith('.woff2')).toBeTruthy();
      expect(result[1]).toContain(cdnFontUrlWithoutHash + 'la-semi-bold');
    });
  });
});
