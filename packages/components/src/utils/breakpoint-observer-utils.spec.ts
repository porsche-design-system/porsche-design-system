import type { Breakpoint } from '@porsche-design-system/emotion';
import { breakpoints } from '@porsche-design-system/emotion';
import { vi } from 'vitest';
import type { BreakpointCustomizable } from './breakpoint-customizable';
import { mediaQueryLists, overrideMediaQueryLists } from './breakpoint-observer';
import * as breakpointObserverUtils from './breakpoint-observer-utils';
import { flippedBreakpoint, getCurrentMatchingBreakpointValue, internalBO } from './breakpoint-observer-utils';

it('should match flippedBreakpoint snapshot', () => {
  expect(flippedBreakpoint).toMatchSnapshot();
});

describe('getCurrentBreakpointKey()', () => {
  const originalMediaQueryLists = [...mediaQueryLists];

  afterEach(() => {
    overrideMediaQueryLists(originalMediaQueryLists);
  });

  it.each<[string, Breakpoint]>([
    ['0px', 'base'],
    ['480px', 'xs'],
    ['760px', 's'],
    ['1000px', 'm'],
    ['1300px', 'l'],
    ['1760px', 'xl'],
    ['1920px', 'xxl'],
  ])('should for breakpoint: %s return: %s', (breakpoint, breakpointKey) => {
    const matchingIndex = mediaQueryLists.findIndex((item) => item.media.includes(breakpoint));
    overrideMediaQueryLists(mediaQueryLists.map((item, i) => (i <= matchingIndex ? { ...item, matches: true } : item)));

    expect(internalBO.getCurrentBreakpointKey()).toBe(breakpointKey);
  });
});

describe('getCurrentMatchingBreakpointValue()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const breakpointCustomizableValues: BreakpointCustomizable<Breakpoint>[] = [
    { base: 'base' },
    { base: 'base', xs: 'xs' },
    { base: 'base', xs: 'xs', s: 's' },
    { base: 'base', xs: 'xs', s: 's', m: 'm' },
    { base: 'base', xs: 'xs', s: 's', m: 'm', l: 'l' },
    { base: 'base', xs: 'xs', s: 's', m: 'm', l: 'l', xl: 'xl' },
    { base: 'base', xs: 'xs', s: 's', m: 'm', l: 'l', xl: 'xl', xxl: 'xxl' },
    { base: 'base', s: 's', l: 'l' },
  ];

  // results for values from above for every breakpoint from [base, ...to... , xl]
  const results: [Breakpoint, Breakpoint, Breakpoint, Breakpoint, Breakpoint, Breakpoint, Breakpoint][] = [
    ['base', 'base', 'base', 'base', 'base', 'base', 'base'],
    ['base', 'xs', 'xs', 'xs', 'xs', 'xs', 'xs'],
    ['base', 'xs', 's', 's', 's', 's', 's'],
    ['base', 'xs', 's', 'm', 'm', 'm', 'm'],
    ['base', 'xs', 's', 'm', 'l', 'l', 'l'],
    ['base', 'xs', 's', 'm', 'l', 'xl', 'xl'],
    ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
    ['base', 'base', 's', 's', 'l', 'l', 'l'],
  ];

  // merge it together so that we got a test case for each value on every breakpoint
  const data: [BreakpointCustomizable<Breakpoint>, Breakpoint, Breakpoint][] = breakpointCustomizableValues.flatMap(
    (values, i) =>
      breakpoints.map<[BreakpointCustomizable<Breakpoint>, Breakpoint, Breakpoint]>((bp, j) => [
        values,
        bp,
        results[i][j],
      ])
  );

  it.each<[BreakpointCustomizable<Breakpoint>, Breakpoint, Breakpoint]>(data)(
    'should for breakpointCustomizable: %s and breakpoint: %s return: %s',
    (breakpointCustomizable, breakpoint, result) => {
      vi.spyOn(breakpointObserverUtils.internalBO, 'getCurrentBreakpointKey').mockReturnValue(breakpoint);
      expect(getCurrentMatchingBreakpointValue(breakpointCustomizable)).toBe(result);
    }
  );

  it('should return correct breakpoint value for BreakpointCustomizable<boolean>', () => {
    const value: BreakpointCustomizable<boolean> = { base: true, m: false, xl: true, xxl: false };
    const spy = vi.spyOn(breakpointObserverUtils.internalBO, 'getCurrentBreakpointKey');

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
    spy.mockReturnValue('xxl');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(false);
  });

  it('should return correct breakpoint value for BreakpointCustomizable<number>', () => {
    const value: BreakpointCustomizable<number> = { base: 3, s: 2, m: 1, xl: 5, xxl: 6 };
    const spy = vi.spyOn(breakpointObserverUtils.internalBO, 'getCurrentBreakpointKey');

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
    spy.mockReturnValue('xxl');
    expect(getCurrentMatchingBreakpointValue(value)).toBe(6);
  });
});
