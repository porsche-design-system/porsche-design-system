import * as textareaUtils from './textarea-utils';
import { Textarea } from './textarea';
import * as formUtils from '../../utils/form/form-utils';
import * as a11yUtils from '../../utils/a11y/a11y';
import * as propertyObserverUtils from '../../utils/property-observer';

jest.mock('../../utils/dom');

const initComponent = (): Textarea => {
  const component = new Textarea();
  component.host = document.createElement('p-textarea');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('componentWillLoad', () => {
  it('should call hasCounter() with correct parameter and set hasCounter', () => {
    const textarea = document.createElement('textarea');
    jest.spyOn(textareaUtils, 'initNativeTextarea').mockReturnValue(textarea);

    const spy = jest.spyOn(formUtils, 'hasCounter');
    const component = initComponent();

    expect(component['hasCounter']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(textarea);
    expect(component['hasCounter']).toBe(true);
  });

  it('should call initNativeTextarea() with correct parameters', () => {
    const component = initComponent();
    const initNativeSelectSpy = jest.spyOn(textareaUtils, 'initNativeTextarea');
    component.componentWillLoad();
    expect(initNativeSelectSpy).toHaveBeenCalledWith(
      component.host,
      undefined,
      false,
      false,
      '',
      undefined,
      undefined,
      false,
      false,
      undefined,
      '',
      'off',
      undefined,
      undefined
    );
  });
});

describe('componentDidRender', () => {
  it('should call addInputEventListenerForCounter() with correct parameters if hasCounter is true and showCounter is false/true', () => {
    const updateCounterSpy = jest.spyOn(formUtils, 'updateCounter');
    const observePropertiesSpy = jest.spyOn(propertyObserverUtils, 'observeProperties');
    const addEventListenerSpy = jest.fn();
    const removeEventListenerSpy = jest.fn();

    const textarea = document.createElement('textarea');
    textarea.addEventListener = addEventListenerSpy;
    textarea.removeEventListener = removeEventListenerSpy;

    const ariaElement = document.createElement('span');
    const counter = document.createElement('span');
    const component = initComponent();

    component['nativeTextarea'] = textarea;
    component['ariaElement'] = ariaElement;

    component.componentDidRender();

    expect(updateCounterSpy).not.toHaveBeenCalled();
    expect(observePropertiesSpy).not.toHaveBeenCalled();

    component['hasCounter'] = true;
    component['counterElement'] = counter;

    component.componentDidRender();

    expect(updateCounterSpy).toHaveBeenCalledWith(textarea, ariaElement, counter);
    expect(observePropertiesSpy).toHaveBeenCalledWith(textarea, ['value'], expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('input', component['eventListener']);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('input', component['eventListener']);
  });

  it('should call setAriaAttributes() with correct parameters', () => {
    const spy = jest.spyOn(a11yUtils, 'setAriaAttributes');
    const component = initComponent();
    const textarea = document.createElement('textarea');
    component['nativeTextarea'] = textarea;
    component.label = 'Some label';
    component.message = 'Some message';
    component.state = 'success';

    component.componentDidRender();

    expect(spy).toHaveBeenCalledWith(textarea, { label: 'Some label', message: 'Some message', state: 'success' });
  });
});
