import { warnIfDeprecatedPropIsUsed } from './warnIfDeprecatedPropIsUsed';

const warningMessage =
  '[Porsche Design System] deprecatedProp is deprecated for component "span" and will be removed with next major release.';

class SomeInstance {
  host = document.createElement('span');
  deprecatedProp: string | boolean | number = undefined;
}

describe('warnIfDeprecatedPropIsUsed()', () => {
  it('should throw warning when prop is string', () => {
    const instance = new SomeInstance();
    instance.deprecatedProp = 'something';
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    warnIfDeprecatedPropIsUsed<typeof SomeInstance>(instance, 'deprecatedProp');
    expect(spy).toHaveBeenCalledWith(warningMessage);
  });

  it('should throw warning when prop is false', () => {
    const instance = new SomeInstance();
    instance.deprecatedProp = false;
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    warnIfDeprecatedPropIsUsed<typeof SomeInstance>(instance, 'deprecatedProp');
    expect(spy).toHaveBeenCalledWith(warningMessage);
  });

  it('should throw warning when prop is 0', () => {
    const instance = new SomeInstance();
    instance.deprecatedProp = 0;
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    warnIfDeprecatedPropIsUsed<typeof SomeInstance>(instance, 'deprecatedProp');
    expect(spy).toHaveBeenCalledWith(warningMessage);
  });

  it('should not throw warning when prop is undefined', () => {
    const instance = new SomeInstance();
    instance.deprecatedProp = undefined;
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    warnIfDeprecatedPropIsUsed<typeof SomeInstance>(instance, 'deprecatedProp');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not throw warning when prop is null', () => {
    const instance = new SomeInstance();
    instance.deprecatedProp = null;
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    warnIfDeprecatedPropIsUsed<typeof SomeInstance>(instance, 'deprecatedProp');
    expect(spy).not.toHaveBeenCalled();
  });
});
