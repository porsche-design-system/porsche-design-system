import { breakpoint, mediaQueryMin, mediaQueryMax, mediaQueryMinMax, Breakpoint } from './media-query';

it('should contain correct values for breakpoint', () => {
  expect(breakpoint).toMatchSnapshot();
});

describe('mediaQueryMin()', () => {
  it.each<Breakpoint>(['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'])(
    'should return correct css for minBreakpoint: %s',
    (min) => {
      expect(mediaQueryMin(min as any)).toMatchSnapshot();
    }
  );
});

describe('mediaQueryMax()', () => {
  it.each<Exclude<Breakpoint, 'xxs'>>(['xs', 's', 'm', 'l', 'xl', 'xxl'])(
    'should return correct css for maxBreakpoint: %s',
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
  ])('should return correct css for maxBreakpoint: %s', (min, max) => {
    expect(mediaQueryMinMax(min as any, max as any)).toMatchSnapshot();
  });
});
