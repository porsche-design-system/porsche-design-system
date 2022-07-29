import {
  getInputPadding,
  setInputStyles,
  throwIfUnitLengthExceeded,
  TextFieldWrapperUnitPosition,
  hasCounterAndIsTypeText,
  hasUnitAndIsTypeTextOrNumber,
  isWithinForm,
  isType,
  addInputEventListenerForSearch,
  dispatchInputEvent,
} from './text-field-wrapper-utils';
import * as textFieldWrapperUtils from './text-field-wrapper-utils';
import * as formUtils from '../form-utils';
import * as getClosestHTMLElementUtils from '../../../utils/dom/getClosestHTMLElement';
import type { FormState } from '../form-state';

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

describe('hasCounterAndIsTypeText()', () => {
  it('should call isType() with correct parameters', () => {
    const inputElement = getInputElement();
    const spy = jest.spyOn(textFieldWrapperUtils, 'isType');
    hasCounterAndIsTypeText(inputElement);

    expect(spy).toBeCalledWith(inputElement.type, 'text');
  });

  it('should call hasCounter() with correct parameters', () => {
    const inputElement = getInputElement();
    const spy = jest.spyOn(formUtils, 'hasCounter');
    hasCounterAndIsTypeText(inputElement);

    expect(spy).toBeCalledWith(inputElement);
  });

  it('should for input type="text" with maxLength return true', () => {
    const inputElement = getInputElement();
    jest.spyOn(textFieldWrapperUtils, 'isType').mockReturnValue(true);
    jest.spyOn(formUtils, 'hasCounter').mockReturnValue(true);

    expect(hasCounterAndIsTypeText(inputElement)).toBe(true);
  });

  it('should for input type="text" without maxLength return false', () => {
    const inputElement = getInputElement();
    jest.spyOn(textFieldWrapperUtils, 'isType').mockReturnValue(true);
    jest.spyOn(formUtils, 'hasCounter').mockReturnValue(false);

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
  it('should call isType() with correct parameters', () => {
    const inputElement = getInputElement();
    const spy = jest.spyOn(textFieldWrapperUtils, 'isType').mockReturnValue(false);
    hasUnitAndIsTypeTextOrNumber(inputElement, 'EUR');

    expect(spy).toHaveBeenNthCalledWith(1, inputElement.type, 'text');
    expect(spy).toHaveBeenNthCalledWith(2, inputElement.type, 'number');
  });

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

describe('isWithinForm()', () => {
  it('should call getClosestHTMLElement()', () => {
    const spy = jest.spyOn(getClosestHTMLElementUtils, 'getClosestHTMLElement');
    const el = document.createElement('input');
    isWithinForm(el);

    expect(spy).toBeCalledWith(el, 'form');
  });

  it('should return true or false based on result of getClosestHTMLElement()', () => {
    const spy = jest.spyOn(getClosestHTMLElementUtils, 'getClosestHTMLElement');
    const el = document.createElement('input');

    spy.mockReturnValue(null);
    expect(isWithinForm(el)).toBe(false);

    spy.mockReturnValue(document.createElement('form'));
    expect(isWithinForm(el)).toBe(true);
  });
});

describe('isType()', () => {
  it('should return true for equal parameters', () => {
    expect(isType('text', 'text')).toBe(true);
    expect(isType('number', 'number')).toBe(true);
    expect(isType('password', 'password')).toBe(true);
  });

  it('should return false for unequal parameters', () => {
    expect(isType('password', 'search')).toBe(false);
    expect(isType('text', 'search')).toBe(false);
    expect(isType('password', 'number')).toBe(false);
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

describe('addInputEventListenerForSearch()', () => {
  it('should register event listeners on element', () => {
    const inputElement = getInputElement();
    const spy = jest.spyOn(inputElement, 'addEventListener');
    addInputEventListenerForSearch(inputElement, () => {});

    expect(spy).toHaveBeenNthCalledWith(1, 'input', expect.any(Function));
    expect(spy).toHaveBeenNthCalledWith(2, 'keydown', expect.any(Function));
    expect(spy).toBeCalledTimes(2);
  });

  it('should on input event call inputChangeCallback()', () => {
    const inputElement = getInputElement();
    const callback = jest.fn();
    addInputEventListenerForSearch(inputElement, callback);

    inputElement.dispatchEvent(new Event('input'));
    expect(callback).toBeCalledWith(expect.any(Boolean));
    expect(callback).toBeCalledTimes(1);
  });

  it('should if input.value is not empty on keydown event for Escape key, call event.preventDefault(), reset input.value, call dispatchInputEvent() with correct parameter', () => {
    const inputElement = getInputElement();
    inputElement.value = 'search-term';
    addInputEventListenerForSearch(inputElement, jest.fn());

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    const spyPreventDefault = jest.spyOn(event, 'preventDefault');
    const spyDispatchInputEvent = jest.spyOn(textFieldWrapperUtils, 'dispatchInputEvent');
    inputElement.dispatchEvent(event);

    expect(spyPreventDefault).toBeCalledWith();
    expect(inputElement.value).toBe('');
    expect(spyDispatchInputEvent).toBeCalledWith(event.target);
  });

  it('should if input.value is empty on keydown event for Escape key not call event.preventDefault(), not reset input.value and not call dispatchInputEvent()', () => {
    const inputElement = getInputElement();
    inputElement.value = '';
    addInputEventListenerForSearch(inputElement, jest.fn());

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    const spyPreventDefault = jest.spyOn(event, 'preventDefault');
    const spyDispatchInputEvent = jest.spyOn(textFieldWrapperUtils, 'dispatchInputEvent');
    inputElement.dispatchEvent(event);

    expect(spyPreventDefault).not.toBeCalled();
    expect(inputElement.value).toBe('');
    expect(spyDispatchInputEvent).not.toBeCalled();
  });

  it('should on keydown event for other keys than Escape, not call event.preventDefault(), not reset input.value and not call dispatchInputEvent()', () => {
    const inputElement = getInputElement();
    inputElement.value = 'search-term';
    addInputEventListenerForSearch(inputElement, jest.fn());

    const event1 = new KeyboardEvent('keydown', { key: 'A' });
    const event2 = new KeyboardEvent('keydown', { key: 'Enter' });
    const spyPreventDefaultEvent1 = jest.spyOn(event1, 'preventDefault');
    const spyPreventDefaultEvent2 = jest.spyOn(event2, 'preventDefault');
    const spyDispatchInputEvent = jest.spyOn(textFieldWrapperUtils, 'dispatchInputEvent');

    inputElement.dispatchEvent(event1);
    inputElement.dispatchEvent(event2);

    expect(spyPreventDefaultEvent1).not.toBeCalled();
    expect(spyPreventDefaultEvent2).not.toBeCalled();
    expect(inputElement.value).toBe('search-term');
    expect(spyDispatchInputEvent).not.toBeCalled();
  });
});

describe('dispatchInputEvent()', () => {
  it('should call element.dispatchEvent() with correct parameters', () => {
    const inputElement = getInputElement();
    const spy = jest.spyOn(inputElement, 'dispatchEvent');
    dispatchInputEvent(inputElement);

    expect(spy).toBeCalledWith(expect.any(Event));
  });
});
