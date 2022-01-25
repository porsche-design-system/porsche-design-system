import * as domUtils from '../../../utils/dom';
import * as textFieldWrapperUtils from './text-field-wrapper-utils';
import { TextFieldWrapper } from './text-field-wrapper';
import * as attributeObserverUtils from '../../../utils/attribute-observer';
import * as a11yUtils from '../../../utils/a11y';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('connectedCallback', () => {
  it('should call observeAttributes()', () => {
    const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
    const component = new TextFieldWrapper();
    component.connectedCallback();

    expect(spy).toBeCalledWith(undefined, ['disabled', 'readonly', 'required'], expect.anything());
  });
});

describe('componentWillLoad', () => {
  it('should call getHTMLElementAndThrowIfUndefined()', () => {
    const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
    const component = new TextFieldWrapper();
    try {
      component.componentWillLoad();
    } catch (e) {}

    const selector = ['text', 'number', 'email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password']
      .map((type) => `input[type=${type}]`)
      .join(',');

    expect(spy).toBeCalledWith(undefined, selector);
  });

  it('should call observeAttributes()', () => {
    const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
    const component = new TextFieldWrapper();
    try {
      component.componentWillLoad();
    } catch (e) {}

    expect(spy).toBeCalledWith(undefined, ['disabled', 'readonly', 'required'], expect.anything());
  });

  it('should call hasCounterAndIsTypeText() and set hasCounter', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 20;
    jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined').mockImplementation(() => input);

    const spy = jest.spyOn(textFieldWrapperUtils, 'hasCounterAndIsTypeText');
    const component = new TextFieldWrapper();
    component['input'] = input;

    expect(component['hasCounter']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toBeCalledWith(input);
    expect(component['hasCounter']).toBe(true);
  });

  it('should call hasUnitAndIsTypeNumber() and set hasUnit', () => {
    const input = document.createElement('input');
    input.type = 'number';
    jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined').mockImplementation(() => input);

    const spy = jest.spyOn(textFieldWrapperUtils, 'hasUnitAndIsTypeNumber');
    const component = new TextFieldWrapper();
    component.unit = 'EUR';
    component['input'] = input;

    expect(component['hasUnit']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toBeCalledWith(input, 'EUR');
    expect(component['hasUnit']).toBe(true);
  });
});

describe('componentWillRender', () => {
  it('should call throwIfUnitLengthExceeded()', () => {
    const component = new TextFieldWrapper();
    const spy = jest.spyOn(textFieldWrapperUtils, 'throwIfUnitLengthExceeded');
    component.unit = '123456';

    try {
      component.componentWillRender();
    } catch (e) {}

    expect(spy).toBeCalledWith('123456');
  });
});

describe('componentDidRender', () => {
  it('should call setInputStyles()', () => {
    const component = new TextFieldWrapper();
    const spy = jest.spyOn(textFieldWrapperUtils, 'setInputStyles');

    component.componentDidRender();
    expect(spy).toBeCalledTimes(1);
  });

  it('should call setAriaAttributes()', () => {
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

describe('componentDidLoad', () => {
  it('should call addInputEventListener(), setCounterInnerHtml() and setCharacterCountInnerHtml() if hasCounter is true', () => {
    const addInputEventListenerSpy = jest.spyOn(textFieldWrapperUtils, 'addInputEventListener');
    const setCounterInnerHtmlSpy = jest.spyOn(textFieldWrapperUtils, 'setCounterInnerHtml');
    const setCharacterCountInnerHtmlSpy = jest.spyOn(textFieldWrapperUtils, 'setCharacterCountInnerHtml');

    const input = document.createElement('input');
    input.type = 'text';
    const counter = document.createElement('span');
    const characterCount = document.createElement('span');

    const component = new TextFieldWrapper();
    component['input'] = input;
    component['unitOrCounterElement'] = counter;
    component['characterCountElement'] = characterCount;

    component.componentDidLoad();
    expect(addInputEventListenerSpy).toHaveBeenCalledTimes(0);
    expect(setCounterInnerHtmlSpy).toHaveBeenCalledTimes(0);
    expect(setCharacterCountInnerHtmlSpy).toHaveBeenCalledTimes(0);

    component['hasCounter'] = true;
    component.componentDidLoad();
    expect(addInputEventListenerSpy).toHaveBeenCalledWith(input, counter, characterCount, component['setInputStyles']);
    expect(setCounterInnerHtmlSpy).toHaveBeenCalledWith(input, counter);
    expect(setCharacterCountInnerHtmlSpy).toHaveBeenCalledWith(input, characterCount);
  });
});

describe('disconnectedCallback', () => {
  it('should call unobserveAttributes()', () => {
    const spy = jest.spyOn(attributeObserverUtils, 'unobserveAttributes');
    const component = new TextFieldWrapper();
    component.disconnectedCallback();

    expect(spy).toBeCalledWith(undefined);
  });
});
