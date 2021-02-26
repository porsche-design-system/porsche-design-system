/**
 * @jest-environment node
 */

describe('components-wrapper build', () => {
  it('should not throw exception in node environment', () => {
    require('@porsche-design-system/components-js');
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
  });
});
