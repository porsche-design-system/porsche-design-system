import type { Breakpoint } from './breakpoint';
import { mediaQueryMin, mediaQueryMax, mediaQueryMinMax } from './mediaQuery';

describe('mediaQueryMin()', () => {
  it.each<Breakpoint>(['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'])(
    'should return correct css for breakpoint: %s',
    (min) => {
      expect(mediaQueryMin(min as any)).toMatchSnapshot();
    }
  );
});

describe('mediaQueryMax()', () => {
  it.each<Exclude<Breakpoint, 'xxs'>>(['xs', 's', 'm', 'l', 'xl', 'xxl'])(
    'should return correct css for breakpoint: %s',
    (max) => {
      expect(mediaQueryMax(max as any)).toMatchSnapshot();
    }
  );
});

describe('mediaQueryMinMax()', () => {
  it.each<[Exclude<Breakpoint, 'xxl'>, Exclude<Breakpoint, 'xxs'>]>([
    ['xxs', 'xs'],
    ['xs', 's'],
    ['s', 'm'],
    ['m', 'l'],
    ['l', 'xl'],
    ['xl', 'xxl'],
  ])('should return correct css for breakpoint range: %s - %s', (min, max) => {
    expect(mediaQueryMinMax(min as any, max as any)).toMatchSnapshot();
  });
});
