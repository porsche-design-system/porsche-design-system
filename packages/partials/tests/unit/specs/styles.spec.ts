import { getFontFaceCSS, getPorscheDesignSystemCoreStyles } from '../../../src';

describe('getFontFaceCSS', () => {
  it('should return link with FONT_FACE_STYLE_CDN_URL', () => {
    const result = getFontFaceCSS();
    expect(result).toContain('<link rel="stylesheet" href="https://');
    expect(result).toContain('font-face.min');
  });
  it('should return only href', () => {
    const result = getFontFaceCSS({ withoutTags: true });
    expect(result).not.toContain('<link rel="stylesheet" href="https://');
    expect(result).toContain('font-face.min');
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
});
