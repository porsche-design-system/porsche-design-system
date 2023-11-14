import { InputParser } from '../../../../components/scripts/wrapper-generator/InputParser';

describe('InputParser', () => {
  const inputParser = new InputParser();

  describe('getSharedTypes()', () => {
    it('should not contain "HTMLStencilElement"', () => {
      expect(inputParser.getSharedTypes()).not.toContain('interface HTMLStencilElement');
    });

    it('should not contain "EventEmitter"', () => {
      expect(inputParser.getSharedTypes()).not.toContain('interface EventEmitter');
    });

    it('should not contain "ROLLUP_REPLACE_IS_STAGING"', () => {
      expect(inputParser.getSharedTypes()).not.toContain('const ROLLUP_REPLACE_IS_STAGING');
    });

    it('should not contain "Document"', () => {
      expect(inputParser.getSharedTypes()).not.toContain('interface Document');
    });

    it('should not contain global "PORSCHE_DESIGN_SYSTEM_CDN"', () => {
      expect(inputParser.getSharedTypes()).not.toContain('PORSCHE_DESIGN_SYSTEM_CDN: ');
    });

    it('should not contain global "CSSStyleSheet" or "ShadowRoot"', () => {
      expect(inputParser.getSharedTypes()).not.toContain('interface CSSStyleSheet');
      expect(inputParser.getSharedTypes()).not.toContain('interface ShadowRoot');
    });

    it('should clean up "BreakpointCustomizable" string type', () => {
      expect(inputParser.getSharedTypes()).not.toContain(
        'export declare type BreakpointCustomizable<T> = T | BreakpointValues<T> | string;'
      );
    });

    it('should not contain "declare global"', () => {
      expect(inputParser.getSharedTypes()).not.toContain('declare global {');
    });
  });
});
