import { warnIfDeprecatedPropIsUsed } from './warnIfDeprecatedPropIsUsed';

const warningMessage =
  '[Porsche Design System] deprecatedProp is deprecated for component "div" and will be removed with next major release.';

describe('with host element and property', () => {
  it('should throw warning', () => {
    const host = document.createElement('div');
    host['deprecatedProp'] = 'testPropValue';
    jest.spyOn(console, 'warn').mockImplementation();
    warnIfDeprecatedPropIsUsed(host, 'deprecatedProp');
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(warningMessage));
  });
});
