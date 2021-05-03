import {
  getComponentChunkLinks,
  getFontFaceStylesheet,
  getFontLinks,
  getInitialStyles,
  getFavTouchThemeMeta,
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

  describe('getFavTouchThemeMeta()', () => {
    it('should be a function', () => {
      expect(typeof getFavTouchThemeMeta).toBe('function');
    });
  });
});
