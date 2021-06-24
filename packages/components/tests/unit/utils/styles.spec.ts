import { getFocusStyles, getHoverStyles, pxToRem, pxToRemWithUnit } from '../../../src/utils';

describe('pxToRem()', () => {
  it.each([
    [0, 0],
    [16, 1],
    [24, 1.5],
    [32, 2],
  ])('should for parameter %s return %s', (input, result) => {
    expect(pxToRem(input)).toBe(result);
  });
});

describe('pxToRemWithUnit()', () => {
  it.each([
    [0, '0rem'],
    [16, '1rem'],
    [24, '1.5rem'],
    [32, '2rem'],
  ])('should for parameter %s return %s', (input: number, result: string) => {
    expect(pxToRemWithUnit(input)).toBe(result);
  });
});

describe('getHoverStyles()', () => {
  it('should return correct default JssStyle', () => {
    expect(getHoverStyles()).toMatchSnapshot();
  });
});

describe('getFocusStyles()', () => {
  it('should return correct default JssStyle', () => {
    expect(getFocusStyles()).toMatchSnapshot();
  });

  it('should return correct JssStyle for custom color', () => {
    expect(getFocusStyles({ color: 'red' })).toMatchSnapshot();
  });

  it('should return correct JssStyle for custom offset', () => {
    expect(getFocusStyles({ offset: 1 })).toMatchSnapshot();
  });
});
