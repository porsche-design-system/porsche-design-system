import * as pinCodeUtils from './pin-code-utils';
import * as setAttributesUtils from '../../utils/dom/setAttributes';
import * as getTagNameWithoutPrefixUtils from '../../utils/tag-name';
import * as consoleWarnUtils from '../../utils/log/logger';
import {
  removeSlottedSelector,
  initHiddenInput,
  hasInputOnlyDigitsOrWhitespaces,
  isInputSingleDigit,
  getInputValue,
  syncHiddenInput,
  warnIfInitialValueIsTransformed,
  getSanitisedValue,
  removeHoverStyles,
  removeReadonlyStyles,
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

describe('removeHoverStyles()', () => {
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

    expect(removeHoverStyles(stylesWithMediaHover)).toEqual(stylesWithoutMediaHover);
  });
});

describe('removeReadonlyStyles()', () => {
  it('should remove @media(hover:hover) styles from Styles object', () => {
    const stylesWithMediaHover = {
      label: {
        display: 'block',
        'input[readonly]': {
          '::slotted(input:not(:disabled):not(:focus):not([readonly]):hover)': {
            border: '2px',
          },
        },
      },
      input: {
        display: 'none',
      },
      'input[readonly]': {
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

    expect(removeReadonlyStyles(stylesWithMediaHover)).toEqual(stylesWithoutMediaHover);
  });
});

describe('warnIfInitialValueIsTransformed()', () => {
  it('should call getTagNameWithoutPrefix() and consoleWarn() with correct parameters', () => {
    const host = document.createElement('p-pin-code');
    const warningPrefix = `Property value on component p-pin-code:`;
    const spyGetTagNameWithoutPrefix = jest.spyOn(getTagNameWithoutPrefixUtils, 'getTagNameWithoutPrefix');
    const spyConsoleWarn = jest.spyOn(consoleWarnUtils, 'consoleWarn').mockImplementation();

    warnIfInitialValueIsTransformed(host, 4);

    expect(spyGetTagNameWithoutPrefix).toBeCalledTimes(1);
    expect(spyGetTagNameWithoutPrefix).toBeCalledWith(host);
    expect(spyConsoleWarn).toBeCalledWith(
      warningPrefix,
      'Provided value has too many characters and was truncated to the max length of 4.'
    );

    warnIfInitialValueIsTransformed(host);

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
      const input = isInputSingleDigit(value);

      expect(input).toBeFalsy();
    }
  );

  it('should return true if the provided string is a single digit', () => {
    const input = isInputSingleDigit('1');

    expect(input).toBeTruthy();
  });
});

describe('hasInputOnlyDigitsOrWhitespaces()', () => {
  it.each<[string]>([['1a'], ['a 1'], ['1a2'], ['1^'], ['^ 2'], ['1^2']])(
    'should return false for value: %s',
    (value) => {
      expect(hasInputOnlyDigitsOrWhitespaces(value)).toBeFalsy();
    }
  );

  it.each<[string]>([['1234'], [' 234'], ['1 34'], ['12 4'], ['123 ']])('should return true for value: %s', (value) => {
    expect(hasInputOnlyDigitsOrWhitespaces(value)).toBeTruthy();
  });
});

describe('getInputValue()', () => {
  it('should return joined values of an array of input elements', () => {
    const arrayOfInputs = Array.from({ length: 4 }, (_, i) => {
      const input = document.createElement('input');
      input.setAttribute('value', `${i}`);
      return input;
    });

    const joinedValue = getInputValue(arrayOfInputs);

    expect(joinedValue).toStrictEqual('0123');
  });
});

describe('getSanitisedValue()', () => {
  it('should return pin code value if already optimal', () => {
    const pinCode = '1234';

    const optimizedValue = getSanitisedValue(pinCode, 4);

    expect(optimizedValue).toBe('1234');
  });

  it('should remove whitespaces from pin code value', () => {
    const pinCode = ' 1 2 3 4 ';

    const optimizedValue = getSanitisedValue(pinCode, 4);

    expect(optimizedValue).toBe('1234');
  });

  it('should shorten pin code value if value is too long', () => {
    const pinCode = ' 12345678';

    const optimizedValue = getSanitisedValue(pinCode, 4);

    expect(optimizedValue).toBe('1234');
  });

  it('should not shorten pin code value if parameter length is not provided', () => {
    const pinCode = ' 12345678';

    const optimizedValue = getSanitisedValue(pinCode);

    expect(optimizedValue).toBe('12345678');
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
  it('should call setAttributes() with correct parameters', () => {
    const spy = jest.spyOn(setAttributesUtils, 'setAttributes');
    const hiddenInput = document.createElement('input');

    syncHiddenInput(hiddenInput, 'updatedName', '4321', false, false);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(hiddenInput, { name: 'updatedName', value: '4321' });
  });

  it('should call toggleAttribute() with correct parameters and update "required" and "disabled" attributes', () => {
    const hiddenInput = document.createElement('input');
    const spy = jest.spyOn(hiddenInput, 'toggleAttribute');

    syncHiddenInput(hiddenInput, 'updatedName', '4321', true, true);

    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith('disabled', true);
    expect(spy).toBeCalledWith('required', true);

    expect(hiddenInput.disabled).toBeTruthy();
    expect(hiddenInput.required).toBeTruthy();

    syncHiddenInput(hiddenInput, 'updatedName', '4321', false, false);

    expect(hiddenInput.disabled).toBeFalsy();
    expect(hiddenInput.required).toBeFalsy();
  });
});
