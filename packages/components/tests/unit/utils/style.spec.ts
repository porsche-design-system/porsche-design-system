import { pxToRem } from '../../../src/utils';

describe('pxToRem()', () => {
  it.each([
    [0, 0],
    [undefined, NaN],
    [null, 0],
    [16, 1],
    [24, 1.5],
    [32, 2],
    [36, 2.25],
  ])('should for %s return %s', (input, expected) => {
    expect(pxToRem(input)).toBe(expected);
  });
});
