import type { Breakpoint } from './breakpoint';
import { mediaQueryMin } from './mediaQueryMin';
import { mediaQueryMax } from './mediaQueryMax';
import { mediaQueryMinMax } from './mediaQueryMinMax';
import * as fromMediaQuery from './';

it('should provide all exports', () => {
  expect(Object.keys(fromMediaQuery).length).toBe(4);
});

describe('mediaQueryMin()', () => {
  it.each<Breakpoint>(['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'])(
    'should return correct css for breakpoint: %s',
    (min) => {
      expect(mediaQueryMin(min as any)).toMatchSnapshot();
    }
  );
});

describe('mediaQueryMax()', () => {
  it.each<Exclude<Breakpoint, 'base'>>(['xs', 's', 'm', 'l', 'xl', 'xxl'])(
    'should return correct css for breakpoint: %s',
    (max) => {
      expect(mediaQueryMax(max as any)).toMatchSnapshot();
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
    expect(mediaQueryMinMax(min as any, max as any)).toMatchSnapshot();
  });
});
