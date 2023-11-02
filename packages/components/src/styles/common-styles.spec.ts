import type { JssStyle } from 'jss';
import type { PropertiesHyphen } from 'csstype';
import {
  addImportantToEachRule,
  addImportantToRule,
  focusPseudoJssStyle,
  getBackfaceVisibilityJssStyle,
  getHiddenTextJssStyle,
  getInsetJssStyle,
  getTransition,
  MotionDurationKeyFinal,
  MotionEasingKeyFinal,
  pxToRemWithUnit,
} from './common-styles';

describe('getTransition()', () => {
  it.each<
    [
      keyof PropertiesHyphen,
      MotionDurationKeyFinal | '0s',
      MotionEasingKeyFinal | 'linear' | 'none',
      MotionDurationKeyFinal | '0s',
      string
    ]
  >([
    ['color', undefined, undefined, undefined, 'color var(--p-motion-duration, 0.25s) cubic-bezier(0.25,0.1,0.25,1)'],
    [
      'box-shadow',
      'short',
      'base',
      'short',
      'box-shadow var(--p-motion-duration, 0.25s) cubic-bezier(0.25,0.1,0.25,1) var(--p-motion-duration, 0.25s)',
    ],
    [
      'color',
      'moderate',
      'in',
      'moderate',
      'color var(--p-motion-duration, 0.4s) cubic-bezier(0,0,0.2,1) var(--p-motion-duration, 0.4s)',
    ],
    [
      'box-shadow',
      'long',
      'out',
      'long',
      'box-shadow var(--p-motion-duration, 0.6s) cubic-bezier(0.4,0,0.5,1) var(--p-motion-duration, 0.6s)',
    ],

    [
      'color',
      'veryLong',
      'linear',
      'veryLong',
      'color var(--p-motion-duration, 1.2s) linear var(--p-motion-duration, 1.2s)',
    ],

    ['box-shadow', '0s', 'none', '0s', 'box-shadow var(--p-motion-duration, 0s) var(--p-motion-duration, 0s)'],
  ])(
    'should for cssProperty: %s, duration: %s, ease: %s and delay: %s return %s',
    (cssProperty, duration, ease, delay, expected) => {
      expect(getTransition(cssProperty, duration, ease, delay)).toBe(expected);
    }
  );
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
