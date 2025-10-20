import { vi } from 'vitest';
import * as consoleWarnUtils from '../../utils/log/logger';
import * as getTagNameWithoutPrefixUtils from '../../utils/tag-name';
import { PinCode } from './pin-code';
import * as pinCodeUtils from './pin-code-utils';
import {
  getConcatenatedInputValues,
  getSanitisedValue,
  hasInputOnlyDigitsOrWhitespaces,
  isCurrentInput,
  isInputOnlyDigits,
  removeSlottedSelector,
  removeStyles,
  removeWhiteSpaces,
  warnAboutTransformedValue,
} from './pin-code-utils';

describe('removeSlottedSelector()', () => {
  it('should remove ::slotted() selector from Styles object keys', () => {
    const stylesWithSlottedSelector = {
      '::slotted(input)': {
        display: 'none',
      },
      '@media(hover:hover)': {
        '::slotted(input:not(:disabled):not(:focus):not([readonly]):hover)': {
          border: '2px',
        },
      },
    };

    const stylesWithoutSlottedSelector = {
      input: {
        display: 'none',
      },
      '@media(hover:hover)': {
        'input:not(:disabled):not(:focus):not([readonly]):hover': {
          border: '2px',
        },
      },
    };

    expect(removeSlottedSelector(stylesWithSlottedSelector)).toStrictEqual(stylesWithoutSlottedSelector);
  });
});

describe('removeStyles()', () => {
  it('should remove @media(hover:hover) styles from Styles object', () => {
    const stylesWithMediaHover = {
      label: {
        display: 'block',
        '@media(hover:hover)': {
          '::slotted(input:not(:disabled):not(:focus):not([readonly]):hover)': {
            border: '2px',
          },
        },
      },
      input: {
        display: 'none',
      },
      '@media(hover:hover)': {
        '::slotted(input:not(:disabled):not(:focus):not([readonly]):hover)': {
          border: '2px',
        },
      },
    };

    const stylesWithoutMediaHover = {
      label: {
        display: 'block',
      },
      input: {
        display: 'none',
      },
    };

    expect(removeStyles('@media(hover:hover)', stylesWithMediaHover)).toStrictEqual(stylesWithoutMediaHover);
  });

  it('should remove input[readonly] styles from Styles object', () => {
    const stylesWithReadonly = {
      label: {
        display: 'block',
        'input[readonly]': {
          'input:not(:disabled)': {
            border: '2px',
          },
        },
      },
      input: {
        display: 'none',
      },
      'input[readonly]': {
        'input:not(:disabled)': {
          border: '2px',
        },
      },
    };

    const stylesWithoutReadonly = {
      label: {
        display: 'block',
      },
      input: {
        display: 'none',
      },
    };

    expect(removeStyles('input[readonly]', stylesWithReadonly)).toStrictEqual(stylesWithoutReadonly);
  });
});

describe('warnAboutTransformedValue()', () => {
  it('should call getTagNameWithoutPrefix() and consoleWarn() with correct parameters', () => {
    const host = document.createElement('p-pin-code');
    const warningPrefix = 'Property value of component p-pin-code:';
    const spyGetTagNameWithoutPrefix = vi.spyOn(getTagNameWithoutPrefixUtils, 'getTagNameWithoutPrefix');
    const spyConsoleWarn = vi.spyOn(consoleWarnUtils, 'consoleWarn').mockImplementation();

    warnAboutTransformedValue(host, 4);

    expect(spyGetTagNameWithoutPrefix).toHaveBeenCalledTimes(1);
    expect(spyGetTagNameWithoutPrefix).toHaveBeenCalledWith(host);
    expect(spyConsoleWarn).toHaveBeenCalledWith(
      warningPrefix,
      'Provided value has too many characters and was truncated to the max length of 4.'
    );

    warnAboutTransformedValue(host);

    expect(spyGetTagNameWithoutPrefix).toHaveBeenCalledTimes(2);
    expect(spyGetTagNameWithoutPrefix).toHaveBeenCalledWith(host);
    expect(spyConsoleWarn).toHaveBeenCalledWith(
      warningPrefix,
      'Provided value contains characters that are not of type number, the value was therefore reset.'
    );
  });
});

describe('isInputOnlyDigits()', () => {
  it.each<[string]>([['abc'], ['a'], ['/^'], ['^'], [null], [undefined]])(
    'should return false for value: %s',
    (value) => {
      const isSingleDigit = isInputOnlyDigits(value);

      expect(isSingleDigit).toBe(false);
    }
  );

  it.each<[string]>([['1'], ['12'], ['123']])('should return true for value: %s', (value) => {
    const isSingleDigit = isInputOnlyDigits(value);

    expect(isSingleDigit).toBe(true);
  });
});

describe('hasInputOnlyDigitsOrWhitespaces()', () => {
  it.each<[string]>([['1a'], ['a 1'], ['1a2'], ['1^'], ['^ 2'], ['1^2']])(
    'should return false for value: %s',
    (value) => {
      const hasOnlyDigitsOrWhitespaces = hasInputOnlyDigitsOrWhitespaces(value);

      expect(hasOnlyDigitsOrWhitespaces).toBe(false);
    }
  );

  it.each<[string]>([['1234'], [' 234'], ['1 34'], ['12 4'], ['123 ']])('should return true for value: %s', (value) => {
    const hasOnlyDigitsOrWhitespaces = hasInputOnlyDigitsOrWhitespaces(value);

    expect(hasOnlyDigitsOrWhitespaces).toBe(true);
  });
});

describe('getConcatenatedInputValues()', () => {
  it('should return concatenated values of an array of input elements', () => {
    const arrayOfInputs = Array.from({ length: 4 }, (_, i) => {
      const input = document.createElement('input');
      input.setAttribute('value', `${i}`);
      return input;
    });

    const concatenatedValue = getConcatenatedInputValues(arrayOfInputs);

    expect(concatenatedValue).toStrictEqual('0123');
  });
});

describe('getSanitisedValue()', () => {
  it('should not slice or reset prop value and not call warnAboutTransformedValue() if value already sanitised', () => {
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');
    component.value = '1234';
    const spy = vi.spyOn(pinCodeUtils, 'warnAboutTransformedValue');

    const sanitisedValue = getSanitisedValue(component.host, component.value, 4);

    expect(spy).not.toHaveBeenCalled();
    expect(sanitisedValue).toBe('1234');
  });

  it('should reset prop value and call warnAboutTransformedValue() if value does not consist of digits/whitespaces', () => {
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');
    component.value = '1a&^b';
    const spy = vi.spyOn(pinCodeUtils, 'warnAboutTransformedValue');

    const sanitisedValue = getSanitisedValue(component.host, component.value, 4);

    expect(spy).toHaveBeenCalledWith(component.host);
    expect(sanitisedValue).toBe('');
  });

  it('shouldslice prop value and call warnAboutTransformedValue() with correct parameters if value.length is longer then prop length', () => {
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');
    component.value = '12345678';
    const spy = vi.spyOn(pinCodeUtils, 'warnAboutTransformedValue');

    const sanitisedValue = getSanitisedValue(component.host, component.value, 4);

    expect(sanitisedValue).toBe('1234');
    expect(spy).toHaveBeenCalledWith(component.host, 4);
  });
});

describe('removeWhiteSpaces()', () => {
  it('should remove whitespaces from pin code value', () => {
    const pinCode = ' 1 2 4 ';

    const sanitisedValue = removeWhiteSpaces(pinCode);

    expect(sanitisedValue).toBe('124');
  });
});

describe('isCurrentInput()', () => {
  it.each<[...Parameters<typeof isCurrentInput>, ReturnType<typeof isCurrentInput>]>([
    [0, '', 4, true], // No value entered at all: set current-input id on the first input element
    [1, '', 4, false],
    [2, '', 4, false],
    [3, '', 4, false],
    [0, ' 2  ', 4, true], // Some value is entered: set current-input id on the first input element which does not have a value
    [1, ' 2  ', 4, false],
    [2, ' 2  ', 4, false],
    [3, ' 2  ', 4, false],
    [0, '1   ', 4, false], // Some value is entered: set current-input id on the first input element which does not have a value
    [1, '1   ', 4, true],
    [2, '1   ', 4, false],
    [3, '1   ', 4, false],
    [0, '1 3 ', 4, false], // Some value is entered: set current-input id on the first input element which does not have a value
    [1, '1 3 ', 4, true],
    [2, '1 3 ', 4, false],
    [3, '1 3 ', 4, false],
    [0, '123 56', 6, false], // Some value is entered: set current-input id on the first input element which does not have a value
    [1, '123 56', 6, false],
    [2, '123 56', 6, false],
    [3, '123 56', 6, true],
    [4, '123 56', 6, false],
    [5, '123 56', 6, false],
    [0, '1234', 4, false], // All inputs have some value: set current-input id on the last input element
    [1, '1234', 4, false],
    [2, '1234', 4, false],
    [3, '1234', 4, true],
  ])("should for index: %d, value: %s and length: %d' return: %s", (index, value, length, expected) => {
    const result = isCurrentInput(index, value, length);
    expect(result).toBe(expected);
  });
});
