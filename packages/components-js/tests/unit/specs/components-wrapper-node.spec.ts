describe('in node environment', () => {
  it('should expose componentsReady() and load()', () => {
    const porscheDesignSystem = require('@porsche-design-system/components-js');

    expect(typeof global.window).toBe('undefined');
    expect(typeof global.document).toBe('undefined');
    expect(typeof porscheDesignSystem.componentsReady).toBe('function');
    expect(typeof porscheDesignSystem.load).toBe('function');
  });
});
