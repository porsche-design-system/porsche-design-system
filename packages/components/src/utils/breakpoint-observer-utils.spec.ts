import {
  flippedBreakpoint,
  getCurrentBreakpointKey,
  getCurrentMatchingBreakpointValue,
} from './breakpoint-observer-utils';
import * as breakpointObserverUtils from './breakpoint-observer-utils';
import { mediaQueryLists, overrideMediaQueryLists } from './breakpoint-observer';
import type { BreakpointCustomizable, BreakpointKey } from './breakpoint-customizable';
import { BREAKPOINTS } from './breakpoint-customizable';

it('should match flippedBreakpoint snapshot', () => {
  expect(flippedBreakpoint).toMatchSnapshot();
});

describe('getCurrentBreakpointKey()', () => {
  const originalMediaQueryLists = [...mediaQueryLists];

  afterEach(() => {
    overrideMediaQueryLists(originalMediaQueryLists);
  });

  it.each<[string, BreakpointKey]>([
    ['0px', 'base'],
    ['480px', 'xs'],
    ['760px', 's'],
    ['1000px', 'm'],
    ['1300px', 'l'],
    ['1760px', 'xl'],
  ])('should for breakpoint: %s return: %s', (breakpoint, breakpointKey) => {
    const matchingIndex = mediaQueryLists.findIndex((item) => item.media.includes(breakpoint));
    overrideMediaQueryLists(mediaQueryLists.map((item, i) => (i <= matchingIndex ? { ...item, matches: true } : item)));

    expect(getCurrentBreakpointKey()).toBe(breakpointKey);
  });
});

describe('getCurrentMatchingBreakpointValue()', () => {
  const breakpointCustomizableValues: BreakpointCustomizable<BreakpointKey>[] = [
    { base: 'base' },
    { base: 'base', xs: 'xs' },
    { base: 'base', xs: 'xs', s: 's' },
    { base: 'base', xs: 'xs', s: 's', m: 'm' },
    { base: 'base', xs: 'xs', s: 's', m: 'm', l: 'l' },
    { base: 'base', xs: 'xs', s: 's', m: 'm', l: 'l', xl: 'xl' },
    { base: 'base', s: 's', l: 'l' },
  ];

  // results for values from above for every breakpoint from [base, ...to... , xl]
  const results: [BreakpointKey, BreakpointKey, BreakpointKey, BreakpointKey, BreakpointKey, BreakpointKey][] = [
    ['base', 'base', 'base', 'base', 'base', 'base'],
    ['base', 'xs', 'xs', 'xs', 'xs', 'xs'],
    ['base', 'xs', 's', 's', 's', 's'],
    ['base', 'xs', 's', 'm', 'm', 'm'],
    ['base', 'xs', 's', 'm', 'l', 'l'],
    ['base', 'xs', 's', 'm', 'l', 'xl'],
    ['base', 'base', 's', 's', 'l', 'l'],
  ];

  // merge it together so that we got a test case for each value on every breakpoint
  const data: [BreakpointCustomizable<BreakpointKey>, BreakpointKey, BreakpointKey][] = breakpointCustomizableValues
    .map((values, i) =>
      BREAKPOINTS.map<[BreakpointCustomizable<BreakpointKey>, BreakpointKey, BreakpointKey]>((bp, j) => [
        values,
        bp,
        results[i][j],
      ])
    )
    .flat();

  it.each<[BreakpointCustomizable<BreakpointKey>, BreakpointKey, BreakpointKey]>(data)(
    'should for breakpointCustomizable: %s and breakpoint: %s return: %s',
    (breakpointCustomizable, breakpoint, result) => {
      jest.spyOn(breakpointObserverUtils, 'getCurrentBreakpointKey').mockReturnValue(breakpoint);
      expect(getCurrentMatchingBreakpointValue(breakpointCustomizable)).toBe(result);
    }
  );

  it('should return correct breakpoint value for BreakpointCustomizable<boolean>', () => {
    const value: BreakpointCustomizable<boolean> = { base: true, m: false, xl: true };
    const spy = jest.spyOn(breakpointObserverUtils, 'getCurrentBreakpointKey');

    spy.mockReturnValue('base');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(true);
    spy.mockReturnValue('xs');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(true);
    spy.mockReturnValue('s');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(true);
    spy.mockReturnValue('m');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(false);
    spy.mockReturnValue('l');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(false);
    spy.mockReturnValue('xl');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(true);
  });

  it('should return correct breakpoint value for BreakpointCustomizable<number>', () => {
    const value: BreakpointCustomizable<number> = { base: 3, s: 2, m: 1, xl: 5 };
    const spy = jest.spyOn(breakpointObserverUtils, 'getCurrentBreakpointKey');

    spy.mockReturnValue('base');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(3);
    spy.mockReturnValue('xs');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(3);
    spy.mockReturnValue('s');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(2);
    spy.mockReturnValue('m');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(1);
    spy.mockReturnValue('l');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(1);
    spy.mockReturnValue('xl');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(5);
  });
});
