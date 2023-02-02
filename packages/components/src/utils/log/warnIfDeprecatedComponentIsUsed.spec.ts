import { warnIfDeprecatedComponentIsUsed } from './warnIfDeprecatedComponentIsUsed';

const warningMessage =
  '[Porsche Design System] Component "div" is deprecated and will be removed with next major release. Use some other component instead.';

describe('with host element', () => {
  it('should throw warning', () => {
    const host = document.createElement('div');
    jest.spyOn(console, 'warn').mockImplementation();
    warnIfDeprecatedComponentIsUsed(host, 'Use some other component instead.');
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(warningMessage));
  });
});
