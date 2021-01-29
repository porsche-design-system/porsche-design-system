import {
  getComponentChunks,
  getFontFaceStylesheet,
  getInitialStyles,
} from '@porsche-design-system/components-react/partials';

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

  describe('getComponentChunks()', () => {
    it('should be a function', () => {
      expect(typeof getComponentChunks).toBe('function');
    });
  });
});
