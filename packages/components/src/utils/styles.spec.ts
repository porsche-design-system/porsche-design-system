import {
  addImportantToEachRule,
  addImportantToRule,
  getFocusStyles,
  getHoverStyles,
  JssStyle,
  pxToRem,
  pxToRemWithUnit,
  getBaseSlottedStyles,
} from './';

describe('pxToRem()', () => {
  it.each([
    [0, 0],
    [undefined, NaN],
    [null, 0],
    [16, 1],
    [24, 1.5],
    [32, 2],
    [36, 2.25],
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

describe('addImportantToRule()', () => {
  it.each([
    [0, '0 !important'],
    ['value', 'value !important'],
    [true, 'true !important'],
    [null, 'null !important'],
    [undefined, 'undefined !important'],
  ])('should add !important to %s', (input, result) => {
    expect(addImportantToRule(input)).toBe(result);
  });
});

describe('addImportantToEachRule()', () => {
  const input: JssStyle = {
    display: 'block',
    color: 'red',
    '&:hover': {
      color: 'blue',
      '&:focus': {
        color: 'orange',
      },
    },
  };

  it('should add !important to each rule', () => {
    expect(addImportantToEachRule(input)).toMatchSnapshot();
  });
});

describe('getHoverStyles()', () => {
  it('should return correct default JssStyle', () => {
    expect(getHoverStyles()).toMatchSnapshot();
  });

  it('should return correct default JssStyle for dark theme', () => {
    expect(getHoverStyles({ theme: 'dark' })).toMatchSnapshot();
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

describe('getBaseSlottedStyles()', () => {
  it('should return correct styles', () => {
    expect(getBaseSlottedStyles()).toMatchSnapshot();
  });
});
