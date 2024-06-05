import { InputParser } from '../../../../components/scripts/wrapper-generator/InputParser';

describe('InputParser', () => {
  const inputParser = new InputParser();
  const sharedTypes = inputParser.getSharedTypes();

  describe('getSharedTypes()', () => {
    it('should not contain "HTMLStencilElement"', () => {
      expect(sharedTypes).not.toContain('interface HTMLStencilElement');
    });

    it('should not contain "EventEmitter"', () => {
      expect(sharedTypes).not.toContain('interface EventEmitter');
    });

    it('should not contain "ROLLUP_REPLACE_IS_STAGING"', () => {
      expect(sharedTypes).not.toContain('const ROLLUP_REPLACE_IS_STAGING');
    });

    it('should not contain "Document"', () => {
      expect(sharedTypes).not.toContain('interface Document');
    });

    it('should not contain global "PORSCHE_DESIGN_SYSTEM_CDN"', () => {
      expect(sharedTypes).not.toContain('PORSCHE_DESIGN_SYSTEM_CDN: ');
    });

    it('should not contain global "CSSStyleSheet" or "ShadowRoot"', () => {
      expect(sharedTypes).not.toContain('interface CSSStyleSheet');
      expect(sharedTypes).not.toContain('interface ShadowRoot');
    });

    it('should clean up "BreakpointCustomizable" string type', () => {
      expect(sharedTypes).toContain('export type BreakpointCustomizable<T> = T | BreakpointValues<T>;');
    });

    it('should clean up "SelectedAriaAttributes" string type', () => {
      expect(sharedTypes).toContain(
        'export type SelectedAriaAttributes<T extends keyof AriaAttributes> = Pick<AriaAttributes, T>;'
      );
    });

    it('should clean up "CarouselInternationalization" string type', () => {
      expect(sharedTypes).toContain(
        'export type CarouselInternationalization = Partial<Record<"prev" | "next" | "first" | "last" | "slideLabel" | "slide", string>>'
      );
    });

    it('should clean up "PaginationInternationalization" string type', () => {
      expect(sharedTypes).toContain(
        'export type PaginationInternationalization = Partial<Record<"root" | "prev" | "next" | "page", string>>'
      );
    });

    it('should clean up "ScrollerScrollToPosition" string type', () => {
      expect(sharedTypes).toContain(
        'export type ScrollerScrollToPosition = {\n' + '\tscrollPosition: number;\n' + '\tisSmooth?: boolean;\n' + '}'
      );
    });

    it('should not contain "declare global"', () => {
      expect(sharedTypes).not.toContain('declare global {');
    });
  });
});
