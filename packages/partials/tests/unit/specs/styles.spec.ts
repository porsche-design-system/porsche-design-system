import { getFontFaceCSS, getPorscheDesignSystemCoreStyles } from '../../../src';

describe('getFontFaceCSS', () => {
  const cdnStyleUrlWithoutHash = `https://cdn.ui.porsche.com/porsche-design-system/styles/font-face.min`;
  const cdnStyleUrlCnWithoutHash = `https://cdn.ui.porsche.cn/porsche-design-system/styles/font-face.min`;

  it('should return link with FONT_FACE_STYLE_CDN_URL', () => {
    const result = getFontFaceCSS();
    expect(result).toContain('<link');
    expect(result).toContain('stylesheet');
    expect(result).toContain(cdnStyleUrlWithoutHash);
  });

  it('should return only href', () => {
    const result = getFontFaceCSS({ withoutTags: true });
    expect(result).not.toContain('<link');
    expect(result).not.toContain('stylsheet');
    expect(result).not.toContain('.cn.');
    expect(result).toContain(cdnStyleUrlWithoutHash);
  });

  it('should return only href with cdn: "auto"', () => {
    const result = getFontFaceCSS({ withoutTags: true, cdn: 'auto' });
    expect(result).not.toContain('<link');
    expect(result).not.toContain('stylsheet');
    expect(result).not.toContain('.cn.');
    expect(result).toContain(cdnStyleUrlWithoutHash);
  });

  it('should be minified', () => {
    const result = getFontFaceCSS();
    expect(result).not.toContain('"');
    expect(result).not.toContain("'");
  });

  describe('option: { cdn: "cn" }', () => {
    it('should return correct url for china cdn', () => {
      const result = getFontFaceCSS({ withoutTags: true, cdn: 'cn' });
      expect(result).not.toContain('<link');
      expect(result).not.toContain('stylsheet');
      expect(result).toContain(cdnStyleUrlCnWithoutHash);
      expect(result).toContain('.cn.');
    });
  });
});

describe('getPorscheDesignSystemCoreStyles', () => {
  it('should return style element with pds components', () => {
    const result = getPorscheDesignSystemCoreStyles();
    expect(result).toContain('<style>');
    expect(result).toContain('p-button');
    expect(result).toContain('p-textarea-wrapper');
  });

  it('should return core styles without style tag', () => {
    const result = getPorscheDesignSystemCoreStyles({ withoutTags: true });
    expect(result).not.toContain('<style>');
    expect(result).toContain('p-button');
    expect(result).toContain('p-textarea-wrapper');
  });

  it('should be minified', () => {
    const result = getPorscheDesignSystemCoreStyles();
    expect(result).not.toContain(' ');
    expect(result).not.toContain('\n');
  });

  it('should add custom prefixes to style names', () => {
    const result = getPorscheDesignSystemCoreStyles({ prefix: 'custom-prefix' });
    expect(result).not.toContain(',p-button');
    expect(result).toContain('custom-prefix-p-textarea-wrapper');
  });
});
