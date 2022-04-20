/**
 * @jest-environment jsdom
 */

describe('in jsdom environment', () => {
  it('should expose componentsReady() and load()', () => {
    const porscheDesignSystem = require('@porsche-design-system/components-js');

    expect(typeof window).toBe('object');
    expect(typeof document).toBe('object');
    expect(typeof porscheDesignSystem.componentsReady).toBe('function');
    expect(typeof porscheDesignSystem.load).toBe('function');
  });
});
