import {
  getInputPadding,
  setInputStyles,
  hasCounter,
  throwIfUnitLengthExceeded,
  TextFieldWrapperUnitPosition,
  hasCounterAndIsTypeText,
  setCounterInnerHtml,
  addInputEventListenerForCounter,
  setAriaElementInnerHtml,
  hasUnitAndIsTypeTextOrNumber,
} from './text-field-wrapper-utils';
import * as textFieldWrapperUtils from './text-field-wrapper-utils';
import { FormState } from '../../../types';

const getInputElement = (): HTMLInputElement => {
  const el = document.createElement('input');
  el.id = 'input';
  return el;
};
const getCounterElement = (): HTMLSpanElement => {
  const el = document.createElement('span');
  el.id = 'counter';
  return el;
};

const getAriaElement = (): HTMLSpanElement => {
  const el = document.createElement('span');
  el.id = 'ariaElement';
  return el;
};

describe('hasCounter()', () => {
  it('should for defined maxLength return true', () => {
    const inputElement = getInputElement();
    inputElement.maxLength = 20;
    expect(hasCounter(inputElement)).toBe(true);
  });

  it('should for undefined maxLength return false', () => {
    const inputElement = getInputElement();
    Object.defineProperty(inputElement, 'maxLength', { value: -1 }); // jsdom defaults to 524288 which is 512 KB
    expect(hasCounter(inputElement)).toBe(false);
  });
});

describe('hasCounterAndIsTypeText()', () => {
  it('should for input type="text" with maxLength return true', () => {
    const inputElement = getInputElement();
    inputElement.type = 'text';
    inputElement.maxLength = 20;
    expect(hasCounterAndIsTypeText(inputElement)).toBe(true);
  });

  it('should for input type="text" without maxLength return false', () => {
    const inputElement = getInputElement();
    inputElement.type = 'text';
    Object.defineProperty(inputElement, 'maxLength', { value: -1 }); // jsdom defaults to 524288 which is 512 KB
    expect(hasCounterAndIsTypeText(inputElement)).toBe(false);
  });

  it.each<string>(['number', 'email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password'])(
    'should for input type="%s" with maxLength return false',
    (type) => {
      const inputElement = getInputElement();
      inputElement.type = type;
      inputElement.maxLength = 20;
      expect(hasCounterAndIsTypeText(inputElement)).toBe(false);
    }
  );
});

describe('hasUnitAndIsTypeTextOrNumber()', () => {
  it.each<string>(['text', 'number'])('should for input type="%s" and unit="EUR" return true', (type) => {
    const inputElement = getInputElement();
    inputElement.type = type;
    expect(hasUnitAndIsTypeTextOrNumber(inputElement, 'EUR')).toBe(true);
  });

  it.each<string>(['text', 'number'])('should for input type="%s" and unit="" return false', (type) => {
    const inputElement = getInputElement();
    inputElement.type = type;
    expect(hasUnitAndIsTypeTextOrNumber(inputElement, '')).toBe(false);
  });

  it.each<string>(['email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password'])(
    'should for input type="%s" and unit="EUR" return false',
    (type) => {
      const inputElement = getInputElement();
      inputElement.type = type;
      expect(hasUnitAndIsTypeTextOrNumber(inputElement, 'EUR')).toBe(false);
    }
  );
});

describe('setCounterInnerHtml()', () => {
  it('should set correct character count as innerText on element ', () => {
    const counterElement = getCounterElement();
    const inputElement = getInputElement();

    inputElement.maxLength = 20;
    inputElement.value = 'some';
    setCounterInnerHtml(inputElement, counterElement);
    expect(counterElement.innerText).toBe('4/20');

    inputElement.maxLength = 25;
    inputElement.value = 'Hi';
    setCounterInnerHtml(inputElement, counterElement);
    expect(counterElement.innerText).toBe('2/25');
  });
});

describe('setAriaElementInnerHtml()', () => {
  const getAccessibilityMessage = (remainingCharacter: number, maxCharacter: number) =>
    `You have ${remainingCharacter} out of ${maxCharacter} characters left`;

  it('should set correct character count text for screenreader as innerText on element ', () => {
    const ariaElement = getAriaElement();
    const inputElement = getInputElement();

    inputElement.maxLength = 20;
    inputElement.value = 'some';
    setAriaElementInnerHtml(inputElement, ariaElement);
    expect(ariaElement.innerText).toBe(getAccessibilityMessage(16, 20));

    inputElement.maxLength = 25;
    inputElement.value = 'Hi';
    setAriaElementInnerHtml(inputElement, ariaElement);
    expect(ariaElement.innerText).toBe(getAccessibilityMessage(23, 25));
  });
});

describe('getInputPadding()', () => {
  it.each<[TextFieldWrapperUnitPosition, FormState, string]>([
    ['prefix', 'none', '0.6875rem 0.6875rem 0.6875rem 3.75rem'],
    ['prefix', 'success', '0.625rem 0.625rem 0.625rem 3.75rem'],
    ['suffix', 'none', '0.6875rem 3.75rem 0.6875rem 0.6875rem'],
    ['suffix', 'success', '0.625rem 3.75rem 0.625rem 0.625rem'],
  ])('should for unitPosition: %s and state: %s return %s', (unitPosition, state, expected) => {
    expect(getInputPadding(60, unitPosition, state)).toBe(expected);
  });
});

describe('setInputStyles()', () => {
  it('should do nothing if unitOrCounterElement is undefined', () => {
    const input = getInputElement();
    setInputStyles(input, undefined, 'prefix', 'none');

    expect(input.style.cssText).toBe('');
  });

  it('should set inline padding on input', () => {
    const input = getInputElement();
    const unitElement = getCounterElement();
    Object.defineProperty(unitElement, 'offsetWidth', { value: 60 });
    setInputStyles(input, unitElement, 'prefix', 'none');

    expect(input.style.cssText).toBe('padding: 0.6875rem 0.6875rem 0.6875rem 3.75rem !important;');
  });
});

describe('throwIfUnitLengthExceeded()', () => {
  it('should throw error if unit length > 5', () => {
    expect(() => throwIfUnitLengthExceeded('123456')).toThrow();
  });

  it('should not throw error if unit length <= 5', () => {
    expect(() => throwIfUnitLengthExceeded('12345')).not.toThrow();
    expect(() => throwIfUnitLengthExceeded('1')).not.toThrow();
    expect(() => throwIfUnitLengthExceeded('')).not.toThrow();
  });
});

describe('addInputEventListener()', () => {
  it('should register event listener on element', () => {
    const inputElement = getInputElement();
    const counterElement = getCounterElement();
    const ariaElement = getAriaElement();
    const spy = jest.spyOn(inputElement, 'addEventListener');

    addInputEventListenerForCounter(inputElement, ariaElement, counterElement);
    expect(spy).toBeCalledWith('input', expect.anything());
  });

  it('should register event listener on element without error when no counterElement is provided', () => {
    const inputElement = getInputElement();
    const ariaElement = getAriaElement();
    const spy = jest.spyOn(inputElement, 'addEventListener');
    let error = undefined;
    try {
      addInputEventListenerForCounter(inputElement, ariaElement);
    } catch (e) {
      error = e;
    }
    expect(error).toBeUndefined();
    expect(spy).toBeCalledWith('input', expect.anything());
  });

  it('should initially call setCounterInnerHtml() and setAriaElementInnerHtml()', () => {
    const inputElement = getInputElement();
    const counterElement = getCounterElement();
    const ariaElement = getAriaElement();

    const setCounterInnerHtmlSpy = jest.spyOn(textFieldWrapperUtils, 'setCounterInnerHtml');
    const setAriaElementInnerHtmlSpy = jest.spyOn(textFieldWrapperUtils, 'setAriaElementInnerHtml');
    addInputEventListenerForCounter(inputElement, ariaElement, counterElement);

    expect(setCounterInnerHtmlSpy).toBeCalledWith(inputElement, counterElement);
    expect(setCounterInnerHtmlSpy).toBeCalledTimes(1);

    expect(setAriaElementInnerHtmlSpy).toBeCalledWith(inputElement, ariaElement);
    expect(setAriaElementInnerHtmlSpy).toBeCalledTimes(1);
  });

  it('should on input event call setCounterInnerHtml() and setAriaElementInnerHtml()', () => {
    const inputElement = getInputElement();
    const counterElement = getCounterElement();
    const ariaElement = getAriaElement();

    const setCounterInnerHtmlSpy = jest.spyOn(textFieldWrapperUtils, 'setCounterInnerHtml');
    const setAriaElementInnerHtmlSpy = jest.spyOn(textFieldWrapperUtils, 'setAriaElementInnerHtml');
    addInputEventListenerForCounter(inputElement, ariaElement, counterElement);

    inputElement.dispatchEvent(new Event('input'));
    expect(setCounterInnerHtmlSpy).toBeCalledWith(inputElement, counterElement);
    expect(setCounterInnerHtmlSpy).toBeCalledTimes(2);

    expect(setAriaElementInnerHtmlSpy).toBeCalledWith(inputElement, ariaElement);
    expect(setAriaElementInnerHtmlSpy).toBeCalledTimes(2);
  });

  it('should on input event call inputChangeCallback() if supplied', () => {
    const inputElement = getInputElement();
    const counterElement = getCounterElement();
    const ariaElement = getAriaElement();
    const callback = jest.fn();
    addInputEventListenerForCounter(inputElement, ariaElement, counterElement, callback);

    inputElement.dispatchEvent(new Event('input'));
    expect(callback).toBeCalledTimes(1);
  });
});
