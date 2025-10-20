import { vi } from 'vitest';
import * as formUtils from '../../utils/form/form-utils';
import * as jssUtils from './../../utils/jss';
import * as textFieldWrapperUtils from './text-field-wrapper-utils';
import {
  addCounterCharacterLengthCssVarStyleSheet,
  addInputEventListenerForSearch,
  counterCharacterLengthCssVarStyleSheetMap,
  dispatchInputEvent,
  getInputPaddingLeftOrRight,
  hasCounterAndIsTypeText,
  hasLocateAction,
  hasUnitAndIsTypeTextOrNumber,
  isType,
  throwIfUnitLengthExceeded,
  updateCounterCharacterLengthCssVarStyleSheet,
} from './text-field-wrapper-utils';

class MockHTMLElement {
  constructor() {
    this.shadowRoot = { adoptedStyleSheets: [] } as DocumentOrShadowRoot;
  }
  shadowRoot: DocumentOrShadowRoot;
  getBoundingClientRect() {
    return { height: 100 };
  }
}

const getInputElement = (): HTMLInputElement => {
  const el = document.createElement('input');
  el.id = 'input';
  return el;
};

describe('hasCounterAndIsTypeText()', () => {
  it('should call isType() with correct parameters', () => {
    const inputElement = getInputElement();
    const spy = vi.spyOn(textFieldWrapperUtils, 'isType');
    hasCounterAndIsTypeText(inputElement);

    expect(spy).toHaveBeenCalledWith(inputElement.type, 'text');
  });

  it('should call hasCounter() with correct parameters', () => {
    const inputElement = getInputElement();
    const spy = vi.spyOn(formUtils, 'hasCounter');
    hasCounterAndIsTypeText(inputElement);

    expect(spy).toHaveBeenCalledWith(inputElement);
  });

  it('should for input type="text" with maxLength return true', () => {
    const inputElement = getInputElement();
    vi.spyOn(textFieldWrapperUtils, 'isType').mockReturnValue(true);
    vi.spyOn(formUtils, 'hasCounter').mockReturnValue(true);

    expect(hasCounterAndIsTypeText(inputElement)).toBe(true);
  });

  it('should for input type="text" without maxLength return false', () => {
    const inputElement = getInputElement();
    vi.spyOn(textFieldWrapperUtils, 'isType').mockReturnValue(true);
    vi.spyOn(formUtils, 'hasCounter').mockReturnValue(false);

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
    const spy = vi.spyOn(textFieldWrapperUtils, 'isType').mockReturnValue(false);
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
  it.each<[number, string]>([
    [60, 'calc(60px - 2px)'],
    [40, 'calc(40px - 2px)'],
  ])('should for unitElementWidth: %s return %s', (unitElementWidth, expected) => {
    expect(getInputPaddingLeftOrRight(unitElementWidth)).toBe(expected);
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
    const spy = vi.spyOn(inputElement, 'addEventListener');
    addInputEventListenerForSearch(inputElement, () => {});

    expect(spy).toHaveBeenNthCalledWith(1, 'input', expect.any(Function));
    expect(spy).toHaveBeenNthCalledWith(2, 'keydown', expect.any(Function));
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should on input event call inputChangeCallback()', () => {
    const inputElement = getInputElement();
    const callback = vi.fn();
    addInputEventListenerForSearch(inputElement, callback);

    inputElement.dispatchEvent(new Event('input'));
    expect(callback).toHaveBeenCalledWith(expect.any(Boolean));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should if input.value is not empty on keydown event for Escape key, call event.preventDefault(), reset input.value, call dispatchInputEvent() with correct parameter', () => {
    const inputElement = getInputElement();
    inputElement.value = 'search-term';
    addInputEventListenerForSearch(inputElement, vi.fn());

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    const spyPreventDefault = vi.spyOn(event, 'preventDefault');
    const spyDispatchInputEvent = vi.spyOn(textFieldWrapperUtils, 'dispatchInputEvent');
    inputElement.dispatchEvent(event);

    expect(spyPreventDefault).toHaveBeenCalledWith();
    expect(inputElement.value).toBe('');
    expect(spyDispatchInputEvent).toHaveBeenCalledWith(event.target);
  });

  it('should if input.value is empty on keydown event for Escape key not call event.preventDefault(), not reset input.value and not call dispatchInputEvent()', () => {
    const inputElement = getInputElement();
    inputElement.value = '';
    addInputEventListenerForSearch(inputElement, vi.fn());

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    const spyPreventDefault = vi.spyOn(event, 'preventDefault');
    const spyDispatchInputEvent = vi.spyOn(textFieldWrapperUtils, 'dispatchInputEvent');
    inputElement.dispatchEvent(event);

    expect(spyPreventDefault).not.toHaveBeenCalled();
    expect(inputElement.value).toBe('');
    expect(spyDispatchInputEvent).not.toHaveBeenCalled();
  });

  it('should on keydown event for other keys than Escape, not call event.preventDefault(), not reset input.value and not call dispatchInputEvent()', () => {
    const inputElement = getInputElement();
    inputElement.value = 'search-term';
    addInputEventListenerForSearch(inputElement, vi.fn());

    const event1 = new KeyboardEvent('keydown', { key: 'A' });
    const event2 = new KeyboardEvent('keydown', { key: 'Enter' });
    const spyPreventDefaultEvent1 = vi.spyOn(event1, 'preventDefault');
    const spyPreventDefaultEvent2 = vi.spyOn(event2, 'preventDefault');
    const spyDispatchInputEvent = vi.spyOn(textFieldWrapperUtils, 'dispatchInputEvent');

    inputElement.dispatchEvent(event1);
    inputElement.dispatchEvent(event2);

    expect(spyPreventDefaultEvent1).not.toHaveBeenCalled();
    expect(spyPreventDefaultEvent2).not.toHaveBeenCalled();
    expect(inputElement.value).toBe('search-term');
    expect(spyDispatchInputEvent).not.toHaveBeenCalled();
  });
});

describe('dispatchInputEvent()', () => {
  it('should call element.dispatchEvent() with correct parameters', () => {
    const inputElement = getInputElement();
    const spy = vi.spyOn(inputElement, 'dispatchEvent');
    dispatchInputEvent(inputElement);

    expect(spy).toHaveBeenCalledWith(new Event('input', { bubbles: true }));
    expect(spy.mock.calls[0][0].bubbles).toBe(true); // .toHaveBeenCalledWith( matcher doesn't verify value of bubbles
  });
});

describe('addCounterCharacterLengthCssVarStyleSheet()', () => {
  let host: any;
  const stylesheetMock = {
    replaceSync: vi.fn(),
    insertRule: vi.fn(),
    deleteRule: vi.fn(),
    cssRules: [],
  } as unknown as CSSStyleSheet;

  beforeEach(() => {
    global.CSSStyleSheet = vi.fn().mockImplementation(() => {
      return stylesheetMock;
    });
    host = new MockHTMLElement();
  });

  it('should not do anything if getHasConstructableStylesheetSupport() returns false', () => {
    const getHasConstructableStylesheetSupportSpy = vi
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(false);

    addCounterCharacterLengthCssVarStyleSheet(host);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(counterCharacterLengthCssVarStyleSheetMap.get(host)).toBeUndefined();
  });

  it('should create new stylesheet and push it into host.adoptedStyleSheets and update --p-internal-counter-character-length var', () => {
    const getHasConstructableStylesheetSupportSpy = vi
      .spyOn(jssUtils, 'getHasConstructableStylesheetSupport')
      .mockReturnValueOnce(true);
    const updateCounterCharacterLengthCssVarStyleSheet = vi.spyOn(
      textFieldWrapperUtils,
      'updateCounterCharacterLengthCssVarStyleSheet'
    );

    addCounterCharacterLengthCssVarStyleSheet(host);

    expect(getHasConstructableStylesheetSupportSpy).toHaveBeenCalled();
    expect(counterCharacterLengthCssVarStyleSheetMap.get(host)).toBe(stylesheetMock);
    expect(host.shadowRoot.adoptedStyleSheets).toStrictEqual([stylesheetMock]);
    expect(updateCounterCharacterLengthCssVarStyleSheet).toHaveBeenCalledWith(host, 0);
  });
});

describe('updateCounterCharacterLengthCssVarStyleSheet()', () => {
  let host: any;
  const stylesheetMock = {
    replaceSync: vi.fn(),
    insertRule: vi.fn(),
    deleteRule: vi.fn(),
    cssRules: [],
  } as unknown as CSSStyleSheet;

  beforeEach(() => {
    host = new MockHTMLElement();
    global.CSSStyleSheet = vi.fn().mockImplementation(() => {
      return stylesheetMock;
    });
  });

  it('should update stylesheet correctly', () => {
    counterCharacterLengthCssVarStyleSheetMap.set(host, stylesheetMock);
    const replaceSyncSpy = vi.spyOn(stylesheetMock, 'replaceSync');

    updateCounterCharacterLengthCssVarStyleSheet(host, 10);

    expect(replaceSyncSpy).toHaveBeenCalledWith(':host{--p-internal-counter-character-length:10}');
  });
});
