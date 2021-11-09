import type { GetFocusSlottedPseudoStylesOptions, GetFocusStylesOptions, JssStyle } from './';
import {
  addImportantToEachRule,
  addImportantToRule,
  getBaseSlottedStyles,
  getFocusSlottedPseudoStyles,
  getFocusStyles,
  getFormTextHiddenJssStyle,
  getHoverStyles,
  getNotificationHostStyles,
  getNotificationIconAndContentStyles,
  getRequiredStyles,
  getStateMessageStyles,
  getTextHiddenJssStyle,
  getTransition,
  mediaQuery,
  pxToRem,
  pxToRemWithUnit,
} from './';
import type { PropertiesHyphen } from 'csstype';
import type { FormState, Theme } from '../types';

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

describe('getFocusStyles()', () => {
  it.each<GetFocusStylesOptions>([
    {},
    { color: 'red' },
    { offset: 1 },
    { color: 'deeppink', offset: 1, pseudo: '::before' },
    { color: 'deeppink', offset: 2, pseudo: '::after' },
    { color: 'deeppink', offset: 3 },
  ])('should return correct JssStyle for params: %o', (params) => {
    expect(getFocusStyles(params)).toMatchSnapshot();
  });
});

describe('getFocusSlottedPseudoStyles()', () => {
  it.each<GetFocusSlottedPseudoStylesOptions>([{}, { color: 'red' }, { offset: 1 }])(
    'should return correct JssStyle for params: %o',
    (params) => {
      expect(getFocusSlottedPseudoStyles()).toMatchSnapshot();
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

  it('should return correct styles without dark theme', () => {
    expect(getBaseSlottedStyles({ withDarkTheme: false })).toMatchSnapshot();
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

describe('getRequiredStyles()', () => {
  it.each<Theme>(['light', 'dark'])('should return correct styles for theme: %s', (theme) => {
    expect(getRequiredStyles(theme)).toMatchSnapshot();
  });
});

describe('getStateMessageStyles()', () => {
  it.each<[Theme, FormState]>([
    ['light', 'none'],
    ['light', 'success'],
    ['light', 'error'],
    ['dark', 'none'],
    ['dark', 'success'],
    ['dark', 'error'],
  ])('should return correct JssStyle for theme: %s and state: %s', (theme, state) => {
    expect(getStateMessageStyles(theme, state)).toMatchSnapshot();
  });
});

describe('getNotificationHostStyles()', () => {
  it.each<[string, string, string]>([['red', 'blue', '@media (min-width: 760px)']])(
    'should return correct JssStyle for backgroundColor: %s, borderColor and mediaQueryS: %s',
    (backgroundColor, borderColor, mediaQueryS) => {
      expect(getNotificationHostStyles(backgroundColor, borderColor, mediaQueryS)).toMatchSnapshot();
    }
  );
});

describe('getNotificationIconAndContentStyles()', () => {
  it.each<[string, string]>([['@media (min-width: 760px)', 'blue']])(
    'should return correct JssStyle for mediaQuery S and iconColor: %s',
    (mediaQueryS, iconColor) => {
      expect(getNotificationIconAndContentStyles(mediaQueryS, iconColor)).toMatchSnapshot();
    }
  );
});
