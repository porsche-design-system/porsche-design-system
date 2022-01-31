import { breakpoint, mediaQueryMin, mediaQueryMax, mediaQueryMinMax } from './media-query';

it('should contain correct values for breakpoint', () => {
  expect(breakpoint).toMatchSnapshot();
});

describe('mediaQueryMin()', () => {
  it.each<Parameters<typeof mediaQueryMin>>([['xxs'], ['xs'], ['s'], ['m'], ['l'], ['xl'], ['xxl']])(
    'should return correct css for minBreakpoint: %s',
    (...args) => {
      expect(mediaQueryMin(...args)).toMatchSnapshot();
    }
  );
});

describe('mediaQueryMax()', () => {
  it.each<Parameters<typeof mediaQueryMax>>([['xs'], ['s'], ['m'], ['l'], ['xl'], ['xxl']])(
    'should return correct css for maxBreakpoint: %s',
    (...args) => {
      expect(mediaQueryMax(...args)).toMatchSnapshot();
    }
  );
});

describe('mediaQueryMinMax()', () => {
  it.each<Parameters<typeof mediaQueryMinMax>>([
    ['xxs', 'xs'],
    ['xs', 's'],
    ['s', 'm'],
    ['m', 'l'],
    ['l', 'xl'],
    ['xl', 'xxl'],
  ])('should return correct css for maxBreakpoint: %s', (...args) => {
    expect(mediaQueryMinMax(...args)).toMatchSnapshot();
  });
});
