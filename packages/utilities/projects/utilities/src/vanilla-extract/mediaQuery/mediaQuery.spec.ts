import type { Breakpoint } from './breakpointShared';
import { getMediaQueryMin } from './getMediaQueryMin';
import { getMediaQueryMax } from './getMediaQueryMax';
import { getMediaQueryMinMax } from './getMediaQueryMinMax';
import * as fromMediaQuery from './';

it('should provide all exports', () => {
  expect(Object.keys(fromMediaQuery).length).toBe(12);
});

describe('mediaQueryMin()', () => {
  it.each<Breakpoint>(['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'])(
    'should return correct css for breakpoint: %s',
    (min) => {
      expect(getMediaQueryMin(min as any)).toMatchSnapshot();
    }
  );
});

describe('mediaQueryMax()', () => {
  it.each<Exclude<Breakpoint, 'base'>>(['xs', 's', 'm', 'l', 'xl', 'xxl'])(
    'should return correct css for breakpoint: %s',
    (max) => {
      expect(getMediaQueryMax(max as any)).toMatchSnapshot();
    }
  );
});

describe('mediaQueryMinMax()', () => {
  it.each<[Exclude<Breakpoint, 'xxl'>, Exclude<Breakpoint, 'base'>]>([
    ['base', 'xs'],
    ['xs', 's'],
    ['s', 'm'],
    ['m', 'l'],
    ['l', 'xl'],
    ['xl', 'xxl'],
  ])('should return correct css for breakpoint range: %s - %s', (min, max) => {
    expect(getMediaQueryMinMax(min as any, max as any)).toMatchSnapshot();
  });
});
