import * as pinCodeUtils from './pin-code-utils';
import * as setAttributesUtils from '../../utils/dom/setAttributes';
import * as getTagNameWithoutPrefixUtils from '../../utils/tag-name';
import * as consoleWarnUtils from '../../utils/log/logger';
import {
  removeSlottedSelector,
  initHiddenInput,
  hasInputOnlyDigitsOrWhitespaces,
  isInputSingleDigit,
  getConcatenatedInputValues,
  syncHiddenInput,
  warnAboutTransformedValue,
  getSanitisedValue,
  removeStyles,
  removeWhiteSpaces,
} from './pin-code-utils';
import { PinCode } from './pin-code';

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
    const warningPrefix = `Property value of component p-pin-code:`;
    const spyGetTagNameWithoutPrefix = jest.spyOn(getTagNameWithoutPrefixUtils, 'getTagNameWithoutPrefix');
    const spyConsoleWarn = jest.spyOn(consoleWarnUtils, 'consoleWarn').mockImplementation();

    warnAboutTransformedValue(host, 4);

    expect(spyGetTagNameWithoutPrefix).toBeCalledTimes(1);
    expect(spyGetTagNameWithoutPrefix).toBeCalledWith(host);
    expect(spyConsoleWarn).toBeCalledWith(
      warningPrefix,
      'Provided value has too many characters and was truncated to the max length of 4.'
    );

    warnAboutTransformedValue(host);

    expect(spyGetTagNameWithoutPrefix).toBeCalledTimes(2);
    expect(spyGetTagNameWithoutPrefix).toBeCalledWith(host);
    expect(spyConsoleWarn).toBeCalledWith(
      warningPrefix,
      'Provided value contains characters that are not of type number, the value was therefore reset.'
    );
  });
});

describe('isInputSingleDigit()', () => {
  it.each<[string]>([['12'], ['abc'], ['a'], ['/^'], ['^'], [null], [undefined]])(
    'should return false for value: %s',
    (value) => {
      const isSingleDigit = isInputSingleDigit(value);

      expect(isSingleDigit).toBe(false);
    }
  );

  it('should return true if the provided string is a single digit', () => {
    const isSingleDigit = isInputSingleDigit('1');

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
    const spy = jest.spyOn(pinCodeUtils, 'warnAboutTransformedValue');

    const sanitisedValue = getSanitisedValue(component.host, component.value, 4);

    expect(spy).not.toBeCalled();
    expect(sanitisedValue).toBe('1234');
  });

  it('should reset prop value and call warnAboutTransformedValue() if value does not consist of digits/whitespaces', () => {
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');
    component.value = '1a&^b';
    const spy = jest.spyOn(pinCodeUtils, 'warnAboutTransformedValue');

    const sanitisedValue = getSanitisedValue(component.host, component.value, 4);

    expect(spy).toBeCalledWith(component.host);
    expect(sanitisedValue).toBe('');
  });

  it('shouldslice prop value and call warnAboutTransformedValue() with correct parameters if value.length is longer then prop length', () => {
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');
    component.value = '12345678';
    const spy = jest.spyOn(pinCodeUtils, 'warnAboutTransformedValue');

    const sanitisedValue = getSanitisedValue(component.host, component.value, 4);

    expect(sanitisedValue).toBe('1234');
    expect(spy).toBeCalledWith(component.host, 4);
  });
});

describe('removeWhiteSpaces()', () => {
  it('should remove whitespaces from pin code value', () => {
    const pinCode = ' 1 2 4 ';

    const sanitisedValue = removeWhiteSpaces(pinCode);

    expect(sanitisedValue).toBe('124');
  });
});

describe('initHiddenInput()', () => {
  it('should call syncHiddenInput() with correct parameters', () => {
    const spy = jest.spyOn(pinCodeUtils, 'syncHiddenInput');
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');

    const hiddenInput = initHiddenInput(component.host, 'name', '1234', false, false);

    expect(spy).toBeCalledWith(hiddenInput, 'name', '1234', false, false);
  });

  it('should call setAttributes() with correct parameters', () => {
    const spy = jest.spyOn(setAttributesUtils, 'setAttributes');
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');

    const hiddenInput = initHiddenInput(component.host, 'name', '1234', false, false);

    expect(spy).toBeCalledTimes(2); // it is also called in syncHiddenInput()
    expect(spy).toBeCalledWith(hiddenInput, { 'aria-hidden': 'true', slot: 'hidden-input', tabindex: '-1' });
    expect(spy).toBeCalledWith(hiddenInput, { name: 'name', value: '1234' });
  });

  it('should return hidden input element with added attributes and prepend hidden input element to host', () => {
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');

    const hiddenInput = initHiddenInput(component.host, 'name', '1234', false, false);

    expect(component.host.firstChild).toBe(hiddenInput);
  });
});

describe('syncHiddenInput()', () => {
  it('should call removeWhiteSpaces() with correct parameters', () => {
    const spy = jest.spyOn(pinCodeUtils, 'removeWhiteSpaces');
    const hiddenInput = document.createElement('input');

    syncHiddenInput(hiddenInput, 'updatedName', '432 1', false, false);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('432 1');
  });

  it('should call setAttributes() with correct parameters', () => {
    const spy = jest.spyOn(setAttributesUtils, 'setAttributes');
    const hiddenInput = document.createElement('input');

    syncHiddenInput(hiddenInput, 'updatedName', '4321', false, false);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(hiddenInput, { name: 'updatedName', value: '4321' });
  });

  it('should call setAttributes() with correct parameters when name=undefined', () => {
    const spy = jest.spyOn(setAttributesUtils, 'setAttributes');
    const hiddenInput = document.createElement('input');

    syncHiddenInput(hiddenInput, undefined, '4321', false, false);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(hiddenInput, { value: '4321' });
  });

  it('should call toggleAttribute() with correct parameters and update "required" and "disabled" attributes', () => {
    const hiddenInput = document.createElement('input');
    const spy = jest.spyOn(hiddenInput, 'toggleAttribute');

    syncHiddenInput(hiddenInput, 'updatedName', '4321', true, true);

    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith('disabled', true);
    expect(spy).toBeCalledWith('required', true);

    expect(hiddenInput.disabled).toBe(true);
    expect(hiddenInput.required).toBe(true);

    syncHiddenInput(hiddenInput, 'updatedName', '4321', false, false);

    expect(hiddenInput.disabled).toBe(false);
    expect(hiddenInput.required).toBe(false);
  });
});
