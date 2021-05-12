import {
  getComponentChunkLinks,
  getFontFaceStylesheet,
  getFontLinks,
  getInitialStyles,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-js/partials';

describe('partials', () => {
  describe('getFontFaceStylesheet()', () => {
    it('should be a function', () => {
      expect(typeof getFontFaceStylesheet).toBe('function');
    });
  });

  describe('getInitialStyles()', () => {
    it('should be a function', () => {
      expect(typeof getInitialStyles).toBe('function');
    });
  });

  describe('getFontLinks()', () => {
    it('should be a function', () => {
      expect(typeof getFontLinks).toBe('function');
    });
  });

  describe('getComponentChunkLinks()', () => {
    it('should be a function', () => {
      expect(typeof getComponentChunkLinks).toBe('function');
    });
  });

  describe('getMetaTagsAndIconLinks()', () => {
    it('should be a function', () => {
      expect(typeof getMetaTagsAndIconLinks).toBe('function');
    });
  });
});
