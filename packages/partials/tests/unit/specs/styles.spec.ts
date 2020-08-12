import { getFontFaceCSS, getPorscheDesignSystemCoreStyles } from '../../../src';

describe('getFontFaceCSS', () => {
  it('should return link with FONT_FACE_STYLE_CDN_URL', () => {
    expect(getFontFaceCSS()).toContain('<link rel="stylesheet" href="https://');
    expect(getFontFaceCSS()).toContain('font-face.min');
  });
});

describe('getPorscheDesignSystemCoreStyles', () => {
  it('should return style element with pds components', () => {
    expect(getPorscheDesignSystemCoreStyles()).toContain('<style>');
    expect(getPorscheDesignSystemCoreStyles()).toContain('p-button');
    expect(getPorscheDesignSystemCoreStyles()).toContain('p-textarea-wrapper');
  });
});
