import * as textFieldWrapperUtils from './text-field-wrapper-utils';
import { TextFieldWrapper } from './text-field-wrapper';
import * as a11yUtils from '../../utils/a11y/a11y';
import * as getOnlyChildOfKindHTMLElementOrThrowUtils from '../../utils/validation/getOnlyChildOfKindHTMLElementOrThrow';
import * as propertyObserverUtils from '../../utils/property-observer';
import * as isWithinFormUtils from '../../utils/form/isWithinForm';
import * as formUtils from '../../utils/form/form-utils';

jest.mock('../../utils/dom');

const mockGetOnlyChildOfKindHTMLElementOrThrow = (input: HTMLInputElement) =>
  jest.spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow').mockReturnValue(input);

describe('componentWillLoad', () => {
  it('should call isType() with correct parameters and set isSearch', () => {
    const input = document.createElement('input');
    mockGetOnlyChildOfKindHTMLElementOrThrow(input);

    const component = new TextFieldWrapper();
    const spy = jest.spyOn(textFieldWrapperUtils, 'isType');

    expect(component['isSearch']).toBe(undefined);

    spy.mockReturnValue(true);
    component.componentWillLoad();
    expect(spy).toHaveBeenNthCalledWith(1, input.type, 'search');
    expect(component['isSearch']).toBe(true);

    spy.mockReturnValue(false);
    component.componentWillLoad();
    expect(component['isSearch']).toBe(false);
  });

  it('should call isType() with correct parameters and set isPassword', () => {
    const input = document.createElement('input');
    mockGetOnlyChildOfKindHTMLElementOrThrow(input);

    const component = new TextFieldWrapper();
    const spy = jest.spyOn(textFieldWrapperUtils, 'isType');

    expect(component['isPassword']).toBe(undefined);

    spy.mockReturnValue(true);
    component.componentWillLoad();
    expect(spy).toHaveBeenNthCalledWith(2, input.type, 'password');
    expect(component['isPassword']).toBe(true);

    spy.mockReturnValue(false);
    component.componentWillLoad();
    expect(component['isPassword']).toBe(false);
  });

  it('should call isWithinForm() and set isWithinForm', () => {
    const input = document.createElement('input');
    mockGetOnlyChildOfKindHTMLElementOrThrow(input);

    const component = new TextFieldWrapper();
    const spy = jest.spyOn(isWithinFormUtils, 'isWithinForm');

    expect(component['isWithinForm']).toBe(undefined);

    spy.mockReturnValue(true);
    component.componentWillLoad();
    expect(component['isWithinForm']).toBe(true);

    spy.mockReturnValue(false);
    component.componentWillLoad();
    expect(component['isWithinForm']).toBe(false);
  });

  it('should call hasLocateAction() with correct parameter and set hasAction', () => {
    const input = document.createElement('input');
    mockGetOnlyChildOfKindHTMLElementOrThrow(input);

    const component = new TextFieldWrapper();
    const spy = jest.spyOn(textFieldWrapperUtils, 'hasLocateAction');

    expect(component['hasAction']).toBe(undefined);

    spy.mockReturnValue(true);
    component.componentWillLoad();
    expect(component['hasAction']).toBe(true);

    spy.mockReturnValue(false);
    component.componentWillLoad();
    expect(component['hasAction']).toBe(false);
  });

  it('should not set isClearable when isSearch is false', () => {
    const input = document.createElement('input');
    input.value = 'search';
    mockGetOnlyChildOfKindHTMLElementOrThrow(input);

    // sets value of this.isSearch
    jest.spyOn(textFieldWrapperUtils, 'isType').mockReturnValue(false);

    const component = new TextFieldWrapper();
    expect(component['isClearable']).toBe(false);

    component.componentWillLoad();
    expect(component['isClearable']).toBe(false);
  });

  it('should set isClearable based on input.value when isSearch is true', () => {
    const input = document.createElement('input');
    mockGetOnlyChildOfKindHTMLElementOrThrow(input);

    // sets value of this.isSearch
    jest.spyOn(textFieldWrapperUtils, 'isType').mockReturnValue(true);

    const component = new TextFieldWrapper();
    expect(component['isClearable']).toBe(false);

    input.value = 'search';
    component.componentWillLoad();
    expect(component['isClearable']).toBe(true);

    input.value = '';
    component.componentWillLoad();
    expect(component['isClearable']).toBe(false);
  });

  it('should call observeProperties() with correct parameters when isSearch is true', () => {
    const input = document.createElement('input');
    mockGetOnlyChildOfKindHTMLElementOrThrow(input);

    // sets value of this.isSearch
    jest.spyOn(textFieldWrapperUtils, 'isType').mockReturnValue(true);
    const spy = jest.spyOn(propertyObserverUtils, 'observeProperties');

    const component = new TextFieldWrapper();
    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(component['input'], ['value'], expect.any(Function));
  });

  it('should call hasCounterAndIsTypeText() with correct parameter and set hasCounter', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 20;
    mockGetOnlyChildOfKindHTMLElementOrThrow(input);

    // mock return value once to prove connection between util actually setting hasCounter
    const spy = jest.spyOn(textFieldWrapperUtils, 'hasCounterAndIsTypeText').mockReturnValueOnce(false);
    const component = new TextFieldWrapper();

    expect(component['hasCounter']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(input);
    expect(component['hasCounter']).toBe(false);

    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(input);
    expect(component['hasCounter']).toBe(true);
  });

  it('should not call hasUnitAndIsTypeTextOrNumber() when counter and unit is set and counter is visible', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 50;
    mockGetOnlyChildOfKindHTMLElementOrThrow(input);

    const spy = jest.spyOn(textFieldWrapperUtils, 'hasUnitAndIsTypeTextOrNumber');
    const component = new TextFieldWrapper();
    component.unit = 'EUR';

    expect(component['hasUnit']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).not.toHaveBeenCalled();
    expect(component['hasUnit']).toBe(false);
  });

  it('should call hasUnitAndIsTypeTextOrNumber() with correct parameters when counter and unit is set and counter is not visible', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 50;
    mockGetOnlyChildOfKindHTMLElementOrThrow(input);

    // mock return value once to prove connection between util actually setting hasCounter
    const spy = jest.spyOn(textFieldWrapperUtils, 'hasUnitAndIsTypeTextOrNumber').mockReturnValueOnce(false);
    const component = new TextFieldWrapper();
    component.unit = 'EUR';
    component.showCharacterCount = false;

    expect(component['hasUnit']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(input, 'EUR');
    expect(component['hasUnit']).toBe(false);

    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(input, 'EUR');
    expect(component['hasUnit']).toBe(true);
  });

  it.each<string>(['text', 'number'])(
    'should call hasUnitAndIsTypeTextOrNumber() and set hasUnit when input type="%s"',
    (type) => {
      const input = document.createElement('input');
      input.type = type;
      if (type === 'text') {
        Object.defineProperty(input, 'maxLength', { value: -1 }); // jsdom defaults to 524288 which is 512 KB
      }
      mockGetOnlyChildOfKindHTMLElementOrThrow(input);

      // mock return value once to prove connection between util actually setting hasCounter
      const spy = jest.spyOn(textFieldWrapperUtils, 'hasUnitAndIsTypeTextOrNumber').mockReturnValueOnce(false);
      const component = new TextFieldWrapper();
      component.unit = 'EUR';

      expect(component['hasUnit']).toBe(undefined);
      component.componentWillLoad();

      expect(spy).toHaveBeenCalledWith(input, 'EUR');
      expect(component['hasUnit']).toBe(false);

      component.componentWillLoad();

      expect(spy).toHaveBeenCalledWith(input, 'EUR');
      expect(component['hasUnit']).toBe(true);
    }
  );
});

describe('render', () => {
  it('should call throwIfUnitLengthExceeded() with correct parameter', () => {
    const spy = jest.spyOn(textFieldWrapperUtils, 'throwIfUnitLengthExceeded');
    const component = new TextFieldWrapper();
    component.unit = '123456';

    try {
      component.render();
    } catch {}

    expect(spy).toHaveBeenCalledWith('123456');
  });
});

describe('componentDidLoad', () => {
  it('should call addInputEventListenerForSearch() based on isSearch with correct parameters', () => {
    const spy = jest.spyOn(textFieldWrapperUtils, 'addInputEventListenerForSearch');
    const input = document.createElement('input');
    const component = new TextFieldWrapper();
    component['input'] = input;
    component['isSearch'] = true;
    component.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(input, expect.any(Function));
    component['isSearch'] = false;
    component.componentDidLoad();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('componentDidRender', () => {
  it('should call addInputEventListenerForCounter() with correct parameters if hasCounter is true and isCounterVisible is false/true', () => {
    const updateCounterSpy = jest.spyOn(formUtils, 'updateCounter');
    const observePropertiesSpy = jest.spyOn(propertyObserverUtils, 'observeProperties');
    const addCounterCharacterLengthCssVarStyleSheetSpy = jest.spyOn(
      textFieldWrapperUtils,
      'addCounterCharacterLengthCssVarStyleSheet'
    );
    const updateCounterCharacterLengthCssVarStyleSheetSpy = jest.spyOn(
      textFieldWrapperUtils,
      'updateCounterCharacterLengthCssVarStyleSheet'
    );
    const addEventListenerSpy = jest.fn();
    const removeEventListenerSpy = jest.fn();

    const input = document.createElement('input');
    input.type = 'text';
    input.addEventListener = addEventListenerSpy;
    input.removeEventListener = removeEventListenerSpy;

    const ariaElement = document.createElement('span');
    const component = new TextFieldWrapper();
    component.host = document.createElement('p-flyout');
    component.host.attachShadow({ mode: 'open' });

    component['input'] = input;
    component['ariaElement'] = ariaElement;

    component.componentDidRender();

    expect(updateCounterSpy).not.toHaveBeenCalled();
    expect(observePropertiesSpy).not.toHaveBeenCalled();
    expect(updateCounterCharacterLengthCssVarStyleSheetSpy).not.toHaveBeenCalled();
    expect(addCounterCharacterLengthCssVarStyleSheetSpy).not.toHaveBeenCalled();

    component['hasCounter'] = true;

    component.componentDidRender();

    expect(updateCounterSpy).toHaveBeenCalledWith(input, ariaElement, undefined);
    expect(observePropertiesSpy).toHaveBeenCalledWith(input, ['value'], expect.any(Function));
    expect(addCounterCharacterLengthCssVarStyleSheetSpy).not.toHaveBeenCalled();
    expect(updateCounterCharacterLengthCssVarStyleSheetSpy).not.toHaveBeenCalled();
    expect(addEventListenerSpy).toHaveBeenCalledWith('input', component['eventListener']);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('input', component['eventListener']);

    const counter = document.createElement('span');

    component['unitOrCounterElement'] = counter;
    component['isCounterVisible'] = true;

    component.componentDidRender();

    expect(updateCounterSpy).toHaveBeenCalledWith(input, ariaElement, counter);
    expect(observePropertiesSpy).toHaveBeenCalledWith(input, ['value'], expect.any(Function));
    expect(updateCounterCharacterLengthCssVarStyleSheetSpy).toHaveBeenCalledWith(
      component.host,
      counter.innerText.length
    );
    expect(addCounterCharacterLengthCssVarStyleSheetSpy).toHaveBeenCalledWith(component.host);
    expect(addEventListenerSpy).toHaveBeenCalledWith('input', component['eventListener']);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('input', component['eventListener']);
  });

  it('should call setAriaAttributes() with correct parameters', () => {
    const spy = jest.spyOn(a11yUtils, 'setAriaAttributes');
    const component = new TextFieldWrapper();
    const input = document.createElement('input');
    input.type = 'text';
    component['input'] = input;
    component.label = 'Some label';
    component.message = 'Some message';
    component.state = 'success';

    component.componentDidRender();
    expect(spy).toHaveBeenCalledWith(input, { label: 'Some label', message: 'Some message', state: 'success' });
  });
});

describe('onClear()', () => {
  it('should call this.onLabelClick(), clear input.value and call dispatchInputEvent() with correct parameters', () => {
    const component = new TextFieldWrapper();
    const spyDispatchInputEvent = jest.spyOn(textFieldWrapperUtils, 'dispatchInputEvent');
    const spyOnLabelClick = jest.spyOn(component, 'onLabelClick' as any);
    const input = document.createElement('input');
    input.value = 'search-term';
    component['input'] = input;
    component['onClear']();

    expect(spyOnLabelClick).toHaveBeenCalledWith();
    expect(input.value).toBe('');
    expect(spyDispatchInputEvent).toHaveBeenCalledWith(input);
    expect(spyDispatchInputEvent).toHaveBeenCalledTimes(1);
  });
});
