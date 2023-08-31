import * as pinCodeUtils from './pin-code-utils';
import * as setAttributeUtils from '../../utils/dom/setAttribute';
import * as consoleWarnUtils from '../../utils/log/logger';
import {
  getStylesWithoutSlottedSelector,
  initHiddenInput,
  inputConsistsOfDigits,
  inputIsSingleDigit,
  joinInputValues,
  syncHiddenInput,
  warnIfValueIsNotValid,
} from './pin-code-utils';
import { PinCode } from './pin-code';

describe('getStylesWithoutSlottedSelector()', () => {
  it('should replace "::slotted()" from Styles objects selectors', () => {
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

    expect(getStylesWithoutSlottedSelector(stylesWithSlottedSelector)).toStrictEqual(stylesWithoutSlottedSelector);
  });
});

describe('warnIfValueIsNotValid()', () => {
  it('should call consoleWarn with correct parameters', () => {
    const warningPrefix = '@Prop() "value" on component <p-pin-code>:';
    const spy = jest.spyOn(consoleWarnUtils, 'consoleWarn');
    jest.spyOn(global.console, 'warn').mockImplementation();

    warnIfValueIsNotValid(4);

    expect(spy).toBeCalledWith(
      warningPrefix,
      'Provided pin code has too many characters and was truncated to the max length of 4.'
    );

    warnIfValueIsNotValid();

    expect(spy).toBeCalledWith(
      warningPrefix,
      'Provided pin code contains characters that are not of type number and the value has been reset.'
    );
  });
});

describe('inputIsSingleDigit()', () => {
  it('should return false if the provided string is not a single digit', () => {
    const spy = jest.spyOn(pinCodeUtils, 'inputIsSingleDigit');

    inputIsSingleDigit('12');
    expect(spy).toReturnWith(false);

    inputIsSingleDigit('abc');
    expect(spy).toReturnWith(false);

    inputIsSingleDigit('a');
    expect(spy).toReturnWith(false);

    inputIsSingleDigit('/^');
    expect(spy).toReturnWith(false);

    inputIsSingleDigit('^');
    expect(spy).toReturnWith(false);
  });

  it('should return true if the provided string is a single digit', () => {
    const spy = jest.spyOn(pinCodeUtils, 'inputIsSingleDigit');

    inputIsSingleDigit('1');
    expect(spy).toReturnWith(true);
  });
});

describe('inputConsistsOfDigits()', () => {
  it('should return false if the provided string does not consist digits', () => {
    const spy = jest.spyOn(pinCodeUtils, 'inputConsistsOfDigits');

    inputConsistsOfDigits('1a');
    expect(spy).toReturnWith(false);

    inputConsistsOfDigits('a1');
    expect(spy).toReturnWith(false);

    inputConsistsOfDigits('1a2');
    expect(spy).toReturnWith(false);

    inputConsistsOfDigits('1^');
    expect(spy).toReturnWith(false);

    inputConsistsOfDigits('^2');
    expect(spy).toReturnWith(false);

    inputConsistsOfDigits('1^2');
    expect(spy).toReturnWith(false);
  });

  it('should return true if the provided string does consist digits', () => {
    const spy = jest.spyOn(pinCodeUtils, 'inputConsistsOfDigits');

    inputConsistsOfDigits('1234');
    expect(spy).toReturnWith(true);
  });
});

describe('joinInputValues()', () => {
  it('should return joined value of an array of input elements', () => {
    const arrayOfInputs = Array.from({ length: 4 }, (_, i) => {
      const input = document.createElement('input');
      input.setAttribute('value', `${i}`);
      return input;
    });

    const joinedValue = joinInputValues(arrayOfInputs);

    expect(joinedValue).toBe('0123');
  });
});

describe('initHiddenInput()', () => {
  it('should call syncHiddenInput with correct parameters', () => {
    const spy = jest.spyOn(pinCodeUtils, 'syncHiddenInput');
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');

    const hiddenInput = initHiddenInput(component.host, 'name', '1234', false, false);

    expect(spy).toBeCalledWith(hiddenInput, 'name', '1234', false, false);
  });

  it('should call setAttribute with correct parameters', () => {
    const spy = jest.spyOn(setAttributeUtils, 'setAttribute');
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');

    const hiddenInput = initHiddenInput(component.host, 'name', '1234', false, false);

    expect(spy).toBeCalledTimes(5);
    expect(spy).toBeCalledWith(hiddenInput, 'aria-hidden', 'true');
    expect(spy).toBeCalledWith(hiddenInput, 'slot', 'hidden-input');
    expect(spy).toBeCalledWith(hiddenInput, 'tabindex', '-1');
    expect(spy).toBeCalledWith(hiddenInput, 'name', 'name');
    expect(spy).toBeCalledWith(hiddenInput, 'value', '1234');
  });

  it('should return hidden input element with added attributes and prepend hidden input element to host', () => {
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');

    const hiddenInput = initHiddenInput(component.host, 'name', '1234', false, false);

    expect(component.host.firstChild).toBe(hiddenInput);
  });
});

describe('syncHiddenInput()', () => {
  it('should call setAttribute with correct parameters', () => {
    const spy = jest.spyOn(setAttributeUtils, 'setAttribute');
    const hiddenInput = document.createElement('input');

    syncHiddenInput(hiddenInput, 'updatedName', '4321', false, false);

    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith(hiddenInput, 'name', 'updatedName');
    expect(spy).toBeCalledWith(hiddenInput, 'value', '4321');
  });

  it('should call toggleAttribute with correct parameters and update "required" and "disabled" attributes', () => {
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
