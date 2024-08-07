import * as getOnlyChildOfKindHTMLElementOrThrowUtils from '../../utils/validation/getOnlyChildOfKindHTMLElementOrThrow';
import { Textarea } from './textarea';
import * as formUtils from '../../utils/form/form-utils';
import * as a11yUtils from '../../utils/a11y/a11y';
import * as propertyObserverUtils from '../../utils/property-observer';

jest.mock('../../utils/dom');

describe('componentWillLoad', () => {
  // TODO: prove connection between util actually setting member value
  it('should call hasCounter() with correct parameter and set hasCounter', () => {
    const textarea = document.createElement('textarea');
    jest
      .spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(textarea);

    const spy = jest.spyOn(formUtils, 'hasCounter');
    const component = new Textarea();

    expect(component['hasCounter']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(textarea);
    expect(component['hasCounter']).toBe(true);
  });
});

describe('componentDidRender', () => {
  it('should call addInputEventListenerForCounter() with correct parameters if hasCounter is true and isCounterVisible is false/true', () => {
    const updateCounterSpy = jest.spyOn(formUtils, 'updateCounter');
    const observePropertiesSpy = jest.spyOn(propertyObserverUtils, 'observeProperties');
    const addEventListenerSpy = jest.fn();
    const removeEventListenerSpy = jest.fn();

    const textarea = document.createElement('textarea');
    textarea.addEventListener = addEventListenerSpy;
    textarea.removeEventListener = removeEventListenerSpy;

    const ariaElement = document.createElement('span');
    const counter = document.createElement('span');
    const component = new Textarea();

    component['textarea'] = textarea;
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
    const component = new Textarea();
    const textarea = document.createElement('textarea');
    component['textarea'] = textarea;
    component.label = 'Some label';
    component.message = 'Some message';
    component.state = 'success';

    component.componentDidRender();
    expect(spy).toHaveBeenCalledWith(textarea, { label: 'Some label', message: 'Some message', state: 'success' });
  });
});
