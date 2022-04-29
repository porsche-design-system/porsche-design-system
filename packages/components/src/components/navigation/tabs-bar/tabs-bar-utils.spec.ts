import {
  addEnableTransitionClass,
  getTransformationToActive,
  getTransformationToInactive,
  removeEnableTransitionClass,
  sanitizeActiveTabIndex,
  determineEnableTransitionClass,
} from './tabs-bar-utils';

const enableTransitionClass = 'bar--enable-transition';

describe('sanitizeActiveTabIndex()', () => {
  it.each([
    [undefined, 0, undefined],
    [null, 0, undefined],
    ['asd', 0, undefined],
    [2, 0, undefined],
    [-5, 2, undefined],
    [5, 2, undefined],
    [3, 5, 3],
  ])('should for index %s and tabElementsCount %s return %s', (index, tabElementsCount, expected) => {
    expect(sanitizeActiveTabIndex(index as number, tabElementsCount)).toBe(expected);
  });
});

describe('getTransformationToInactive()', () => {
  it.each([
    [{}, 'transform: translate3d(0rem,0,0); width: 0;'],
    [{ offsetWidth: 0 }, 'transform: translate3d(0rem,0,0); width: 0;'],
    [{ offsetLeft: 0 }, 'transform: translate3d(0rem,0,0); width: 0;'],
    [{ offsetWidth: 0, offsetLeft: 0 }, 'transform: translate3d(0rem,0,0); width: 0;'],
    [{ offsetWidth: 15, offsetLeft: 30 }, 'transform: translate3d(2.34375rem,0,0); width: 0;'],
    [{ offsetWidth: 15, offsetLeft: 0 }, 'transform: translate3d(0.46875rem,0,0); width: 0;'],
  ])('should for %s return %s', (elementOffset, expected) => {
    expect(getTransformationToInactive(elementOffset as HTMLElement)).toBe(expected);
  });
});

describe('getTransformationToActive()', () => {
  it.each([
    [{}, 'transform: translate3d(0rem,0,0); width: 0rem;'],
    [{ offsetWidth: 0 }, 'transform: translate3d(0rem,0,0); width: 0rem;'],
    [{ offsetLeft: 0 }, 'transform: translate3d(0rem,0,0); width: 0rem;'],
    [{ offsetWidth: 0, offsetLeft: 0 }, 'transform: translate3d(0rem,0,0); width: 0rem;'],
    [{ offsetWidth: 15, offsetLeft: 30 }, 'transform: translate3d(1.875rem,0,0); width: 0.9375rem;'],
    [{ offsetWidth: 15, offsetLeft: 0 }, 'transform: translate3d(0rem,0,0); width: 0.9375rem;'],
  ])('should for %s return %s', (elementOffset, expected) => {
    expect(getTransformationToActive(elementOffset as HTMLElement)).toBe(expected);
  });
});

describe('addEnableTransitionClass()', () => {
  it('should add "bar--enable-transition" class', () => {
    const div = document.createElement('div');
    expect(div.classList.contains(enableTransitionClass)).toBe(false);

    addEnableTransitionClass(div);
    expect(div.classList.contains(enableTransitionClass)).toBe(true);
  });

  it('should add only one "bar--enable-transition" class', () => {
    const div = document.createElement('div');
    expect(div.className).toBe('');
    addEnableTransitionClass(div);
    expect(div.className).toBe(enableTransitionClass);
    addEnableTransitionClass(div);
    expect(div.className).toBe(enableTransitionClass);
  });
});

describe('removeEnableTransitionClass()', () => {
  it('should remove "bar--enable-transition" class', () => {
    const div = document.createElement('div');
    addEnableTransitionClass(div);
    expect(div.classList.contains(enableTransitionClass)).toBe(true);

    removeEnableTransitionClass(div);
    expect(div.classList.contains(enableTransitionClass)).toBe(false);
  });
});

describe('determineEnableTransitionClass()', () => {
  it('should remove "bar--enable-transition" class if activeTabIndex is defined and prevActiveTabIndex is undefined', () => {
    const div = document.createElement('div');
    addEnableTransitionClass(div);
    expect(div.classList.contains(enableTransitionClass)).toBe(true);

    determineEnableTransitionClass(0, undefined, div);
    expect(div.classList.contains(enableTransitionClass)).toBe(false);
  });

  it('should add "bar--enable-transition" class if activeTabIndex is undefined', () => {
    const div = document.createElement('div');
    expect(div.classList.contains(enableTransitionClass)).toBe(false);

    determineEnableTransitionClass(undefined, 0, div);
    expect(div.classList.contains(enableTransitionClass)).toBe(true);
  });
});
