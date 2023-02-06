import { hasVisibleIcon, warnIfParentIsPTextAndIconIsNone } from './button-link-pure-utils';

describe('hasVisibleIcon()', () => {
  it('should return true if called with valid iconName', () => {
    expect(hasVisibleIcon('highway', '')).toBe(true);
  });

  it('should return true if called with custom icon name', () => {
    expect(hasVisibleIcon('none', 'custom-icon.svg')).toBe(true);
  });

  it('should return false if iconName = none && iconSource = ""', () => {
    expect(hasVisibleIcon('none', '')).toBe(false);
  });
});

describe('warnIfParentIsPTextAndIconIsNone()', () => {
  it('should print warning if parent is p-text and iconName === "none" & iconSource = ""', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    const parent = document.createElement('p-text');
    const child = document.createElement('button');
    parent.appendChild(child);

    warnIfParentIsPTextAndIconIsNone(child, 'none', '');
    expect(spy).toBeCalledTimes(1);
  });

  it('should not warn if iconName !== "none"', () => {
    const spy = jest.spyOn(global.console, 'warn');
    const parent = document.createElement('p-text');
    const child = document.createElement('button');
    parent.appendChild(child);

    warnIfParentIsPTextAndIconIsNone(child, 'highway', '');
    expect(spy).not.toBeCalled();
  });

  it('should not warn if iconName === "none" but iconSource !== ""', () => {
    const spy = jest.spyOn(global.console, 'warn');
    const parent = document.createElement('p-text');
    const child = document.createElement('button');
    parent.appendChild(child);

    warnIfParentIsPTextAndIconIsNone(child, 'none', 'custom.svg');
    expect(spy).not.toBeCalled();
  });

  it('should not warn if parent element is !== "p-text"', () => {
    const spy = jest.spyOn(global.console, 'warn');
    const child = document.createElement('button');

    warnIfParentIsPTextAndIconIsNone(child, 'none', '');
    expect(spy).not.toBeCalled();
  });
});
