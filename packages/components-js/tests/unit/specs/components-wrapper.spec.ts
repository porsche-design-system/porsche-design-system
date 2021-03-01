import { JSDOM, DOMWindow } from 'jsdom';

interface Global extends NodeJS.Global {
  document: Document;
  window: DOMWindow;
}

declare var global: Global;

describe('components-wrapper', () => {
  describe('in jsdom environment', () => {
    beforeAll(() => {
      const dom = new JSDOM('<html><body></body></html>');
      global.document = dom.window.document;
      global.window = dom.window;
    });

    afterAll(() => {
      delete global.document;
      delete global.window;
    });

    it('should expose componentsReady() and load()', () => {
      const porscheDesignSystem = require('@porsche-design-system/components-js');

      expect(typeof global.window).toBe('object');
      expect(typeof global.document).toBe('object');
      expect(typeof porscheDesignSystem.componentsReady).toBe('function');
      expect(typeof porscheDesignSystem.load).toBe('function');
    });
  });

  describe('in node environment', () => {
    it('should expose componentsReady() and load()', () => {
      const porscheDesignSystem = require('@porsche-design-system/components-js');

      expect(typeof global.window).toBe('undefined');
      expect(typeof global.document).toBe('undefined');
      expect(typeof porscheDesignSystem.componentsReady).toBe('function');
      expect(typeof porscheDesignSystem.load).toBe('function');
    });
  });
});
