import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  addImportantToRule,
  focusPseudoJssStyle,
  getBackdropJssStyle,
  getBackfaceVisibilityJssStyle,
  getHiddenTextJssStyle,
  getInsetJssStyle,
  getTransition,
  type MotionDurationKey,
  motionEasingMap,
  pxToRemWithUnit,
} from './common-styles';
import type { PropertiesHyphen } from 'csstype';

describe('getTransition()', () => {
  it.each<
    [
      ReturnType<typeof getTransition>,
      keyof PropertiesHyphen,
      MotionDurationKey,
      keyof typeof motionEasingMap,
      MotionDurationKey,
    ]
  >([
    [
      'color var(--p-transition-duration, 0.25s) cubic-bezier(0.25,0.1,0.25,1)',
      'color',
      undefined,
      undefined,
      undefined,
    ],
    [
      'box-shadow var(--p-transition-duration, 0.25s) cubic-bezier(0.25,0.1,0.25,1) var(--p-transition-duration, 0.25s)',
      'box-shadow',
      'short',
      'base',
      'short',
    ],
    [
      'color var(--p-transition-duration, 0.4s) cubic-bezier(0,0,0.2,1) var(--p-transition-duration, 0.4s)',
      'color',
      'moderate',
      'in',
      'moderate',
    ],
    [
      'box-shadow var(--p-transition-duration, 0.6s) cubic-bezier(0.4,0,0.5,1) var(--p-transition-duration, 0.6s)',
      'box-shadow',
      'long',
      'out',
      'long',
    ],
    [
      'color var(--p-transition-duration, 1.2s) linear var(--p-transition-duration, 1.2s)',
      'color',
      'veryLong',
      'linear',
      'veryLong',
    ],
  ])('should for : %o return: %s', (result, ...args) => {
    expect(getTransition(...args)).toMatchSnapshot(result);
  });
});

describe('pxToRemWithUnit()', () => {
  it.each([
    [undefined, NaN + 'rem'],
    [null, '0rem'],
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
    fontSize: null,
    margin: 0,
    content: '""',
  };

  it('should add !important to each rule', () => {
    expect(addImportantToEachRule(input)).toMatchSnapshot();
  });

  it('should have no mutation on input', () => {
    expect(addImportantToEachRule(input)).not.toEqual(input);
  });
});

describe('getInsetJssStyle()', () => {
  it.each<Parameters<typeof getInsetJssStyle>>([[undefined], ['auto'], [2], [-1]])(
    'should return correct JssStyle for parameter: %o',
    (value) => {
      expect(getInsetJssStyle(value)).toMatchSnapshot();
    }
  );
});

describe('focusPseudoJssStyle', () => {
  it('should return correct jss style', () => {
    expect(focusPseudoJssStyle).toMatchSnapshot();
  });
});

describe('getHiddenTextStyles()', () => {
  it.each<[boolean, JssStyle]>([
    [true, undefined],
    [false, undefined],
    [true, { width: 'fit-content' }],
    [false, { width: 'fit-content' }],
  ])('should return correct JssStyle for isHidden: %s and shownStyles: %s', (isHidden, shownStyles) => {
    expect(getHiddenTextJssStyle(isHidden, shownStyles)).toMatchSnapshot();
  });
});

describe('getBackfaceVisibilityJssStyle()', () => {
  it('should return correct styles', () => {
    expect(getBackfaceVisibilityJssStyle()).toMatchSnapshot();
  });
});

describe('getBackdropJssStyle()', () => {
  it.each<Parameters<typeof getBackdropJssStyle>>([
    [true, 9999, 'light', 'short'],
    [false, 9999, 'dark', 'moderate'],
    [true, 9999, 'light', 'long'],
    [false, 9999, 'dark', 'veryLong'],
  ])('should return correct JssStyle for isVisible: %s, zIndex: %s, theme: %s and duration: %s', (...args) => {
    expect(getBackdropJssStyle(...args)).toMatchSnapshot();
  });
});
