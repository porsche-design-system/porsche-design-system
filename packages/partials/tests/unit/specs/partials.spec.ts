import { COMPONENT_CHUNK_NAMES, ComponentChunkName } from '@porsche-design-system/shared';
import { getComponentChunkLinks, getFontFaceStylesheet, getInitialStyles, getFontLinks } from '../../../src';

describe('getFontFaceStylesheet', () => {
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

describe('getFontLinks', () => {
  const cdnFontUrlWithoutHash = 'https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-';
  const cdnFontUrlCnWithoutHash = 'https://cdn.ui.porsche.cn/porsche-design-system/fonts/porsche-next-w-';
  const linkStartsWith = '<link rel=preload href=';
  const linkEndsWith = 'as=font type=font/woff2 crossorigin>';
  const urlStartsWith = 'https://';
  const urlEndsWith = '.woff2';

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
        const result = getFontLinks({ subset, weight: [weight] });
        expect(result.startsWith(linkStartsWith)).toBeTruthy();
        expect(result.endsWith(linkEndsWith)).toBeTruthy();
        expect(result).toContain(cdnFontUrlWithoutHash + expected);
      }
    );

    it('should return multiple links', () => {
      const result = getFontLinks({ weight: ['regular', 'semi-bold'] });
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
    it('should return default url', () => {
      const result = getFontLinks({ withoutTags: true });
      expect(result.length).toBe(1);
      expect(result[0].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[0].endsWith(urlEndsWith)).toBeTruthy();
      expect(result[0]).toContain(cdnFontUrlWithoutHash + 'la-regular');
    });

    it('should return default China CDN url', () => {
      const result = getFontLinks({ withoutTags: true, cdn: 'cn' });
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
        const result = getFontLinks({ withoutTags: true, subset, weight: [weight] });
        expect(result.length).toBe(1);
        expect(result[0].startsWith(urlStartsWith)).toBeTruthy();
        expect(result[0].endsWith(urlEndsWith)).toBeTruthy();
        expect(result[0]).toContain(cdnFontUrlWithoutHash + expected);
      }
    );

    it('should return multiple urls', () => {
      const result = getFontLinks({ withoutTags: true, weight: ['regular', 'semi-bold'] });
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

describe('getComponentChunkLinks', () => {
  const chunkBaseName = 'porsche-design-system';
  const cdnChunkUrlWithoutHash = `https://cdn.ui.porsche.com/porsche-design-system/components/${chunkBaseName}.`;
  const cdnChunkUrlCnWithoutHash = `https://cdn.ui.porsche.cn/porsche-design-system/components/${chunkBaseName}.`;

  it('should throw error on invalid components parameter', () => {
    let error;
    try {
      getComponentChunkLinks({ components: ['some-invalid-component'] as any[] });
    } catch (e) {
      error = e.message;
    }

    expect(error).toContain('The following supplied components are invalid:');
    expect(error).toContain('some-invalid-component');
  });

  describe('url with tag', () => {
    const linkStartsWith = '<link rel=preload href=';
    const linkEndsWithCore = 'as=script crossorigin>';
    const linkEndsWith = 'as=script>';

    it('should return core link by default', () => {
      const result = getComponentChunkLinks();
      expect(result.startsWith(linkStartsWith)).toBeTruthy();
      expect(result.endsWith(linkEndsWithCore)).toBeTruthy();
      expect(result).toContain(cdnChunkUrlWithoutHash + 'v');
    });

    it('should return default core China CDN link', () => {
      const result = getComponentChunkLinks({ cdn: 'cn' });
      expect(result.startsWith(linkStartsWith)).toBeTruthy();
      expect(result.endsWith(linkEndsWithCore)).toBeTruthy();
      expect(result).toContain(cdnChunkUrlCnWithoutHash + 'v');
    });

    it('should return multiple links', () => {
      const result = getComponentChunkLinks({ components: ['button', 'button-pure', 'marque'] });
      expect(result.includes(linkEndsWithCore)).toBeTruthy();
      expect(result.endsWith(linkEndsWith)).toBeTruthy();
      expect(result.match(/><link/g).length).toBe(3);
      expect(result).toContain(cdnChunkUrlWithoutHash + 'v');
    });

    COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
      it(`should return core and chunk link for ['${chunkName}']`, () => {
        const result = getComponentChunkLinks({ components: [chunkName] });
        expect(result.includes(linkEndsWithCore)).toBeTruthy();
        expect(result.endsWith(linkEndsWith)).toBeTruthy();
        expect(result.match(/><link/g).length).toBe(1);
        expect(result).toContain(cdnChunkUrlWithoutHash + 'v');
      });
    });
  });

  describe('url without tag', () => {
    const urlStartsWith = 'https://';
    const urlEndsWith = '.js';

    it('should return core url by default', () => {
      const result = getComponentChunkLinks({ withoutTags: true });
      expect(result.length).toBe(1);
      expect(result[0].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[0].endsWith(urlEndsWith)).toBeTruthy();
      expect(result[0]).toContain(cdnChunkUrlWithoutHash + 'v');
    });

    it('should return default core China CDN url', () => {
      const result = getComponentChunkLinks({ withoutTags: true, cdn: 'cn' });
      expect(result.length).toBe(1);
      expect(result[0].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[0].endsWith(urlEndsWith)).toBeTruthy();
      expect(result[0]).toContain(cdnChunkUrlCnWithoutHash + 'v');
    });

    it('should return multiple urls', () => {
      const result = getComponentChunkLinks({ withoutTags: true, components: ['button', 'button-pure', 'marque'] });
      expect(result.length).toBe(4);
      expect(result[0]).toContain(cdnChunkUrlWithoutHash + 'v');
      expect(result[0].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[0].endsWith(urlEndsWith)).toBeTruthy();
      expect(result[1].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[1].endsWith(urlEndsWith)).toBeTruthy();
    });

    COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
      it(`should return core and chunk url for ['${chunkName}']`, () => {
        const result = getComponentChunkLinks({ withoutTags: true, components: [chunkName] });
        expect(result.length).toBe(2);
        expect(result[0]).toContain(cdnChunkUrlWithoutHash + 'v');
        expect(result[1].match(new RegExp(`${chunkBaseName}\\.${chunkName}\\.`)).length).toBe(1); // verify chunk number
      });
    });
  });
});
