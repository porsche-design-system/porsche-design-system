import {
  addImportantToEachRule,
  addImportantToRule,
  getFocusStyles,
  getHoverStyles,
  JssStyle,
  pxToRem,
  pxToRemWithUnit,
  getBaseSlottedStyles,
  getTransition,
  getFocusPseudoStyles,
  mediaQuery,
  getTextHiddenJssStyle,
  getFormTextHiddenJssStyle,
} from './';
import type { PropertiesHyphen } from 'csstype';
import { Theme } from '../types';
import { breakpoint } from '@porsche-design-system/utilities';

describe('getTransition()', () => {
  it.each<[keyof PropertiesHyphen, string]>([
    ['color', 'color var(--p-transition-duration, .24s) ease'],
    ['box-shadow', 'box-shadow var(--p-transition-duration, .24s) ease'],
  ])('should for %o return %o', (cssProperty, expected) => {
    expect(getTransition(cssProperty)).toBe(expected);
  });
});

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
  it.each<Theme>(['light', 'dark'])('should return correct JssStyle for theme: %o', (theme) => {
    expect(getHoverStyles({ theme })).toMatchSnapshot();
  });
});

type FocusStylesParams = {
  color?: string;
  offset?: number;
};

describe('getFocusStyles()', () => {
  it.each<FocusStylesParams>([{}, { color: 'red' }, { offset: 1 }])(
    'should return correct JssStyle for params: %o',
    (params) => {
      expect(getFocusStyles(params)).toMatchSnapshot();
    }
  );
});

describe('getFocusPseudoStyles()', () => {
  it.each<FocusStylesParams>([{}, { color: 'red' }, { offset: 1 }])(
    'should return correct JssStyle for params: %o',
    (params) => {
      expect(getFocusPseudoStyles()).toMatchSnapshot();
    }
  );
});

describe('mediaQuery()', () => {
  it('should return correct media query', () => {
    expect(mediaQuery('m')).toBe('@media (min-width: 1000px)');
  });
});

describe('getBaseSlottedStyles()', () => {
  it('should return correct styles', () => {
    expect(getBaseSlottedStyles()).toMatchSnapshot();
  });
});

describe('getTextHiddenJssStyle()', () => {
  it.each<boolean>([true, false])('should return correct JssStyle for isHidden: %o', (isHidden) => {
    expect(getTextHiddenJssStyle(isHidden)).toMatchSnapshot();
  });
});

describe('getFormTextHiddenJssStyle()', () => {
  it.each<[boolean, boolean]>([
    [true, true],
    [true, false],
    [false, true],
    [false, false],
  ])('should return correct JssStyle for isHidden: %o and isCheckboxOrRadio: %o', (isHidden, isCheckboxOrRadio) => {
    expect(getFormTextHiddenJssStyle(isHidden, isCheckboxOrRadio)).toMatchSnapshot();
  });
});
