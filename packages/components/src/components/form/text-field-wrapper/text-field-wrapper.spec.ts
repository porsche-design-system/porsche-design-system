import * as textFieldWrapperUtils from './text-field-wrapper-utils';
import { TextFieldWrapper } from './text-field-wrapper';
import * as a11yUtils from '../../../utils/a11y/a11y';
import * as getOnlyChildOfKindHTMLElementOrThrowUtils from '../../../utils/validation/getOnlyChildOfKindHTMLElementOrThrow';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('componentWillLoad', () => {
  it('should call isType() with correct parameters and set isSearch', () => {
    const input = document.createElement('input');
    jest
      .spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(input);

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
    jest
      .spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(input);

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

  it('should set isClearable based on input.value', () => {
    const input = document.createElement('input');
    jest
      .spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(input);

    const component = new TextFieldWrapper();
    expect(component['isClearable']).toBe(false);

    input.value = 'search';
    component.componentWillLoad();
    expect(component['isClearable']).toBe(true);

    input.value = '';
    component.componentWillLoad();
    expect(component['isClearable']).toBe(false);
  });

  // TODO: prove connection between util actually setting member value
  it('should call hasCounterAndIsTypeText() with correct parameter and set hasCounter', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 20;
    jest
      .spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(input);

    const spy = jest.spyOn(textFieldWrapperUtils, 'hasCounterAndIsTypeText');
    const component = new TextFieldWrapper();

    expect(component['hasCounter']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toBeCalledWith(input);
    expect(component['hasCounter']).toBe(true);
  });

  // TODO: prove connection between util actually setting member value
  it('should not call hasUnitAndIsTypeTextOrNumber() when counter and unit is set and counter is visible', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 50;
    jest
      .spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(input);

    const spy = jest.spyOn(textFieldWrapperUtils, 'hasUnitAndIsTypeTextOrNumber');
    const component = new TextFieldWrapper();
    component.unit = 'EUR';

    expect(component['hasUnit']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).not.toBeCalled();
    expect(component['hasUnit']).toBe(false);
  });

  // TODO: prove connection between util actually setting member value
  it('should call hasUnitAndIsTypeTextOrNumber() with correct parameters when counter and unit is set and counter is not visible', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 50;
    jest
      .spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(input);

    const spy = jest.spyOn(textFieldWrapperUtils, 'hasUnitAndIsTypeTextOrNumber');
    const component = new TextFieldWrapper();
    component.unit = 'EUR';
    component.showCharacterCount = false;

    expect(component['hasUnit']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toBeCalledWith(input, 'EUR');
    expect(component['hasUnit']).toBe(true);
  });

  // TODO: prove connection between util actually setting member value
  it.each<string>(['text', 'number'])(
    'should call hasUnitAndIsTypeTextOrNumber() and set hasUnit when input type="%s"',
    (type) => {
      const input = document.createElement('input');
      input.type = type;
      if (type === 'text') {
        Object.defineProperty(input, 'maxLength', { value: -1 }); // jsdom defaults to 524288 which is 512 KB
      }

      jest
        .spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow')
        .mockReturnValue(input);

      const spy = jest.spyOn(textFieldWrapperUtils, 'hasUnitAndIsTypeTextOrNumber');
      const component = new TextFieldWrapper();
      component.unit = 'EUR';

      expect(component['hasUnit']).toBe(undefined);
      component.componentWillLoad();

      expect(spy).toBeCalledWith(input, 'EUR');
      expect(component['hasUnit']).toBe(true);
    }
  );
});

describe('componentWillRender', () => {
  it('should call throwIfUnitLengthExceeded() with correct parameter', () => {
    const component = new TextFieldWrapper();
    const spy = jest.spyOn(textFieldWrapperUtils, 'throwIfUnitLengthExceeded');
    component.unit = '123456';

    try {
      component.componentWillRender();
    } catch (e) {}

    expect(spy).toBeCalledWith('123456');
  });
});

describe('componentDidLoad', () => {
  it('should call addInputEventListenerForCounter() with correct parameters if hasCounter is true and isCounterVisible is false', () => {
    const spy = jest.spyOn(textFieldWrapperUtils, 'addInputEventListenerForCounter');

    const input = document.createElement('input');
    input.type = 'text';
    const ariaElement = document.createElement('span');

    const component = new TextFieldWrapper();
    component['input'] = input;
    component['ariaElement'] = ariaElement;

    component.componentDidLoad();
    expect(spy).not.toBeCalled();

    component['hasCounter'] = true;

    component.componentDidLoad();
    expect(spy).toBeCalledWith(input, ariaElement, undefined, component['setInputStyles']);
  });

  it('should call addInputEventListenerForCounter() if hasCounter is true and isCounterVisible is true', () => {
    const spy = jest.spyOn(textFieldWrapperUtils, 'addInputEventListenerForCounter');

    const input = document.createElement('input');
    input.type = 'text';
    const counter = document.createElement('span');
    const ariaElement = document.createElement('span');

    const component = new TextFieldWrapper();
    component['input'] = input;
    component['unitOrCounterElement'] = counter;
    component['ariaElement'] = ariaElement;

    component.componentDidLoad();
    expect(spy).not.toBeCalled();

    component['hasCounter'] = true;
    component['isCounterVisible'] = true;
    component.componentDidLoad();
    expect(spy).toBeCalledWith(input, ariaElement, counter, component['setInputStyles']);
  });

  it('should call addInputEventListenerForSearch() based on isSearch with correct parameters', () => {
    const spy = jest.spyOn(textFieldWrapperUtils, 'addInputEventListenerForSearch');
    const input = document.createElement('input');
    const component = new TextFieldWrapper();
    component['input'] = input;
    component['isSearch'] = true;
    component.componentDidLoad();
    expect(spy).toBeCalledWith(input, expect.any(Function));
    component['isSearch'] = false;
    component.componentDidLoad();
    expect(spy).toBeCalledTimes(1);
  });
});

describe('componentDidRender', () => {
  it('should call setInputStyles()', () => {
    const component = new TextFieldWrapper();
    const spy = jest.spyOn(textFieldWrapperUtils, 'setInputStyles');

    component.componentDidRender();
    expect(spy).toBeCalledTimes(1);
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
    expect(spy).toBeCalledWith(input, { label: 'Some label', message: 'Some message', state: 'success' });
  });
});
