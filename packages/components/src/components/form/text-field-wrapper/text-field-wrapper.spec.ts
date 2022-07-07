import * as textFieldWrapperUtils from './text-field-wrapper-utils';
import { TextFieldWrapper } from './text-field-wrapper';
import * as a11yUtils from '../../../utils/a11y/a11y';
import * as getDirectAndOnlyChildOfKindHTMLElementOrThrowUtils from '../../../utils/validation/getDirectAndOnlyChildOfKindHTMLElementOrThrow';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('componentWillLoad', () => {
  it('should call hasCounterAndIsTypeText() with correct parameter and set hasCounter', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 20;
    jest
      .spyOn(getDirectAndOnlyChildOfKindHTMLElementOrThrowUtils, 'getDirectAndOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(input);

    const spy = jest.spyOn(textFieldWrapperUtils, 'hasCounterAndIsTypeText');
    const component = new TextFieldWrapper();
    component['input'] = input;

    expect(component['hasCounter']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toBeCalledWith(input);
    expect(component['hasCounter']).toBe(true);
  });

  it('should not call hasUnitAndIsTypeTextOrNumber() when counter and unit is set and counter is visible', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 50;
    jest
      .spyOn(getDirectAndOnlyChildOfKindHTMLElementOrThrowUtils, 'getDirectAndOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(input);

    const spy = jest.spyOn(textFieldWrapperUtils, 'hasUnitAndIsTypeTextOrNumber');
    const component = new TextFieldWrapper();
    component.unit = 'EUR';
    component['input'] = input;

    expect(component['hasUnit']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).not.toBeCalled();
    expect(component['hasUnit']).toBe(false);
  });

  it('should call hasUnitAndIsTypeTextOrNumber() with correct parameters when counter and unit is set and counter is not visible', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 50;
    jest
      .spyOn(getDirectAndOnlyChildOfKindHTMLElementOrThrowUtils, 'getDirectAndOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(input);

    const spy = jest.spyOn(textFieldWrapperUtils, 'hasUnitAndIsTypeTextOrNumber');
    const component = new TextFieldWrapper();
    const unit = 'EUR';
    component.unit = unit;
    component.showCharacterCount = false;
    component['input'] = input;

    expect(component['hasUnit']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toBeCalledWith(input, unit);
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

      jest
        .spyOn(getDirectAndOnlyChildOfKindHTMLElementOrThrowUtils, 'getDirectAndOnlyChildOfKindHTMLElementOrThrow')
        .mockReturnValue(input);

      const spy = jest.spyOn(textFieldWrapperUtils, 'hasUnitAndIsTypeTextOrNumber');
      const component = new TextFieldWrapper();
      component.unit = 'EUR';
      component['input'] = input;

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
  it('should call addInputEventListener() with correct parameters if hasCounter is true and isCounterVisible is false', () => {
    const addInputEventListenerSpy = jest.spyOn(textFieldWrapperUtils, 'addInputEventListener');

    const input = document.createElement('input');
    input.type = 'text';
    const ariaElement = document.createElement('span');

    const component = new TextFieldWrapper();
    component['input'] = input;
    component['ariaElement'] = ariaElement;

    component.componentDidLoad();
    expect(addInputEventListenerSpy).not.toBeCalled();

    component['hasCounter'] = true;

    component.componentDidLoad();
    expect(addInputEventListenerSpy).toBeCalledWith(input, ariaElement, undefined, component['setInputStyles']);
  });
  it('should call addInputEventListener() if hasCounter is true and isCounterVisible is true', () => {
    const addInputEventListenerSpy = jest.spyOn(textFieldWrapperUtils, 'addInputEventListener');

    const input = document.createElement('input');
    input.type = 'text';
    const counter = document.createElement('span');
    const ariaElement = document.createElement('span');

    const component = new TextFieldWrapper();
    component['input'] = input;
    component['unitOrCounterElement'] = counter;
    component['ariaElement'] = ariaElement;

    component.componentDidLoad();
    expect(addInputEventListenerSpy).not.toBeCalled();

    component['hasCounter'] = true;
    component['isCounterVisible'] = true;
    component.componentDidLoad();
    expect(addInputEventListenerSpy).toBeCalledWith(input, ariaElement, counter, component['setInputStyles']);
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
