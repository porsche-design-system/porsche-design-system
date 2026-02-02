import { describe, expect, it } from 'vitest';
import * as fromMediaQuery from './';
import type { Breakpoint } from './breakpointShared';
import { getMediaQueryMax } from './getMediaQueryMax';
import { getMediaQueryMin } from './getMediaQueryMin';
import { getMediaQueryMinMax } from './getMediaQueryMinMax';

it('should provide all exports', () => {
  expect(Object.keys(fromMediaQuery).length).toBe(12);
});

describe('mediaQueryMin()', () => {
  it.each<Breakpoint>(['xs', 'sm', 'md', 'lg', 'xl', '2xl'])('should return correct css for breakpoint: %s', (min) => {
    expect(getMediaQueryMin(min as any)).toMatchSnapshot();
  });
});

describe('mediaQueryMax()', () => {
  it.each<Exclude<Breakpoint, 'base'>>(['xs', 'sm', 'md', 'lg', 'xl', '2xl'])(
    'should return correct css for breakpoint: %s',
    (max) => {
      expect(getMediaQueryMax(max as any)).toMatchSnapshot();
    }
  );
});

describe('mediaQueryMinMax()', () => {
  it.each<[Exclude<Breakpoint, 'xxl'>, Exclude<Breakpoint, 'base'>]>([
    ['xs', 'sm'],
    ['sm', 'md'],
    ['md', 'lg'],
    ['lg', 'xl'],
    ['xl', '2xl'],
  ])('should return correct css for breakpoint range: %s - %s', (min, max) => {
    expect(getMediaQueryMinMax(min as any, max as any)).toMatchSnapshot();
  });
});
