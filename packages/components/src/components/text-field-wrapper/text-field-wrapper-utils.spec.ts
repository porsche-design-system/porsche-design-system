import * as textFieldWrapperUtils from './text-field-wrapper-utils';
import {
  addInputEventListenerForSearch,
  dispatchInputEvent,
  getInputPaddingLeftOrRight,
  hasCounterAndIsTypeText,
  hasLocateAction,
  hasUnitAndIsTypeTextOrNumber,
  isType,
  setInputStyles,
  TextFieldWrapperUnitPosition,
  throwIfUnitLengthExceeded,
} from './text-field-wrapper-utils';
import * as formUtils from '../../utils/form/form-utils';

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

describe('hasLocateAction()', () => {
  it('should return true for parameter: locate', () => {
    expect(hasLocateAction('locate')).toBe(true);
  });

  it('should return false for other values', () => {
    expect(hasLocateAction('search')).toBe(false);
    expect(hasLocateAction('arrow-head-right')).toBe(false);
  });
});

describe('getInputPaddingLeftOrRight()', () => {
  it.each<[number, TextFieldWrapperUnitPosition, string]>([
    [4, 'prefix', 'calc(4ch + var(--p-internal-text-field-input-padding-end) + 5px)'],
    [8, 'suffix', 'calc(8ch + var(--p-internal-text-field-input-padding-start) + 5px)'],
  ])('should for unitElementTextCount: %s return %s %s', (unitElementTextCount, unitPosition, expected) => {
    expect(getInputPaddingLeftOrRight(unitPosition, unitElementTextCount)).toBe(expected);
  });
});

describe('setInputStyles()', () => {
  it('should do nothing if unitOrCounterElement is undefined', () => {
    const input = getInputElement();
    setInputStyles(input, undefined, 'prefix');

    expect(input.style.cssText).toBe('');
  });

  it('should set inline padding-left var on input', () => {
    const input = getInputElement();
    const unitElement = getCounterElement();
    Object.defineProperty(unitElement, 'offsetWidth', { value: 60 });
    setInputStyles(input, unitElement, 'prefix');

    expect(input.style.cssText).toBe('--p-internal-text-field-input-padding-start: calc(60px - 2px) !important;');
  });

  it('should set inline padding-right var on input', () => {
    const input = getInputElement();
    const unitElement = getCounterElement();
    Object.defineProperty(unitElement, 'offsetWidth', { value: 60 });
    setInputStyles(input, unitElement, 'suffix');

    expect(input.style.cssText).toBe('--p-internal-text-field-input-padding-end: calc(60px - 2px) !important;');
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

    expect(spy).toBeCalledWith(new Event('input', { bubbles: true }));
    expect(spy.mock.calls[0][0].bubbles).toBe(true); // toBeCalledWith matcher doesn't verify value of bubbles
  });
});
