import * as domUtils from '../../../utils/dom';
import { TextareaWrapper } from './textarea-wrapper';
import * as attributeObserverUtils from '../../../utils/attribute-observer';
import * as textFieldWrapperUtils from '../text-field-wrapper/text-field-wrapper-utils';
import * as a11yUtils from '../../../utils/a11y';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('connectedCallback', () => {
  it('should call observeAttributes()', () => {
    const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
    const component = new TextareaWrapper();
    component.connectedCallback();

    expect(spy).toBeCalledWith(undefined, ['disabled', 'readonly', 'required'], expect.anything());
  });
});

describe('componentWillLoad', () => {
  it('should call getHTMLElementAndThrowIfUndefined()', () => {
    const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
    const component = new TextareaWrapper();

    try {
      component.componentWillLoad();
    } catch (e) {}

    expect(spy).toBeCalledWith(undefined, 'textarea');
  });

  it('should call observeAttributes()', () => {
    const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
    const component = new TextareaWrapper();

    try {
      component.componentWillLoad();
    } catch (e) {}

    expect(spy).toBeCalledWith(undefined, ['disabled', 'readonly', 'required'], expect.anything());
  });

  it('should call hasCounter() and set hasCounter', () => {
    const textarea = document.createElement('textarea');
    jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined').mockImplementation(() => textarea);

    const spy = jest.spyOn(textFieldWrapperUtils, 'hasCounter');
    const component = new TextareaWrapper();
    component['textarea'] = textarea;

    expect(component['hasCounter']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toBeCalledWith(textarea);
    expect(component['hasCounter']).toBe(true);
  });
});

describe('componentDidRender', () => {
  it('should call setAriaAttributes()', () => {
    const spy = jest.spyOn(a11yUtils, 'setAriaAttributes');
    const component = new TextareaWrapper();
    const textarea = document.createElement('textarea');
    component['textarea'] = textarea;
    component.label = 'Some label';
    component.message = 'Some message';
    component.state = 'success';

    component.componentDidRender();
    expect(spy).toBeCalledWith(textarea, { label: 'Some label', message: 'Some message', state: 'success' });
  });
});

describe('componentDidLoad', () => {
  it('should call addInputEventListener(), setCounterInnerHtml() and setCharacterCountInnerHtml() if hasCounter is true', () => {
    const addInputEventListenerSpy = jest.spyOn(textFieldWrapperUtils, 'addInputEventListener');
    const setCounterInnerHtmlSpy = jest.spyOn(textFieldWrapperUtils, 'setCounterInnerHtml');
    const setCharacterCountInnerHtmlSpy = jest.spyOn(textFieldWrapperUtils, 'setCharacterCountInnerHtml');

    const textarea = document.createElement('textarea');
    const counter = document.createElement('span');
    const characterCount = document.createElement('span');

    const component = new TextareaWrapper();
    component['textarea'] = textarea;
    component['counterElement'] = counter;
    component['characterCountElement'] = characterCount;

    component.componentDidLoad();
    expect(addInputEventListenerSpy).toHaveBeenCalledTimes(0);
    expect(setCounterInnerHtmlSpy).toHaveBeenCalledTimes(0);
    expect(setCharacterCountInnerHtmlSpy).toHaveBeenCalledTimes(0);

    component['hasCounter'] = true;
    component.componentDidLoad();
    expect(addInputEventListenerSpy).toHaveBeenCalledWith(textarea, counter, characterCount);
    expect(setCounterInnerHtmlSpy).toHaveBeenCalledWith(textarea, counter);
    expect(setCharacterCountInnerHtmlSpy).toHaveBeenCalledWith(textarea, characterCount);
  });
});

describe('disconnectedCallback', () => {
  it('should call unobserveAttributes()', () => {
    const spy = jest.spyOn(attributeObserverUtils, 'unobserveAttributes');
    const component = new TextareaWrapper();
    component.disconnectedCallback();

    expect(spy).toBeCalledWith(undefined);
  });
});
