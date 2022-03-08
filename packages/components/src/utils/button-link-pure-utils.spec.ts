import { hasVisibleIcon, hasSlottedSubline, warnIfParentIsPTextAndIconIsNone } from './button-link-pure-utils';

describe('hasVisibleIcon()', () => {
  it('should return true if called with valid iconName', () => {
    expect(hasVisibleIcon('highway')).toBe(true);
  });

  it('should return false if iconName = none', () => {
    expect(hasVisibleIcon('none')).toBe(false);
  });
});

describe('hasSlottedSubline()', () => {
  it('should return true with slotted subline', () => {
    const host = document.createElement('p-link-pure');
    const paragraph = document.createElement('p');
    paragraph.slot = 'subline';
    host.appendChild(paragraph);

    expect(hasSlottedSubline(host)).toBe(true);
  });

  it('should return false without subline', () => {
    const host = document.createElement('p-link-pure');
    expect(hasSlottedSubline(host)).toBe(false);
  });
});

describe('warnIfParentIsPTextAndIconIsNone()', () => {
  it('should print warning if parent is p-text and icon is none', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    const parent = document.createElement('p-text');
    const child = document.createElement('button');
    parent.appendChild(child);

    warnIfParentIsPTextAndIconIsNone(child, 'none');
    expect(spy).toBeCalledTimes(1);
  });

  it('should not warn if iconName !== "none"', () => {
    const spy = jest.spyOn(global.console, 'warn');
    const parent = document.createElement('p-text');
    const child = document.createElement('button');
    parent.appendChild(child);

    warnIfParentIsPTextAndIconIsNone(child, 'highway');

    expect(spy).toBeCalledTimes(0);
  });

  it('should not warn if parent element is !== "p-text"', () => {
    const spy = jest.spyOn(global.console, 'warn');
    const child = document.createElement('button');

    warnIfParentIsPTextAndIconIsNone(child, 'none');
    expect(spy).toBeCalledTimes(0);
  });
});
