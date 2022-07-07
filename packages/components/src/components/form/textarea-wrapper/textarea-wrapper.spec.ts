import * as getDirectAndOnlyChildOfKindHTMLElementOrThrowUtils from '../../../utils/validation/getDirectAndOnlyChildOfKindHTMLElementOrThrow';
import { TextareaWrapper } from './textarea-wrapper';
import * as textFieldWrapperUtils from '../text-field-wrapper/text-field-wrapper-utils';
import * as a11yUtils from '../../../utils/a11y/a11y';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('componentWillLoad', () => {
  it('should call hasCounter() with correct parameter and set hasCounter', () => {
    const textarea = document.createElement('textarea');
    jest
      .spyOn(getDirectAndOnlyChildOfKindHTMLElementOrThrowUtils, 'getDirectAndOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(textarea);

    const spy = jest.spyOn(textFieldWrapperUtils, 'hasCounter');
    const component = new TextareaWrapper();
    component['textarea'] = textarea;

    expect(component['hasCounter']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toBeCalledWith(textarea);
    expect(component['hasCounter']).toBe(true);
  });
});

describe('componentDidLoad', () => {
  it('should call addInputEventListener() with correct parameters if hasCounter is true', () => {
    const addInputEventListenerSpy = jest.spyOn(textFieldWrapperUtils, 'addInputEventListener');

    const textarea = document.createElement('textarea');
    const counter = document.createElement('span');
    const ariaElement = document.createElement('span');

    const component = new TextareaWrapper();
    component['textarea'] = textarea;
    component['counterElement'] = counter;
    component['ariaElement'] = ariaElement;

    component.componentDidLoad();
    expect(addInputEventListenerSpy).not.toBeCalled();

    component['hasCounter'] = true;
    component.componentDidLoad();
    expect(addInputEventListenerSpy).toBeCalledWith(textarea, ariaElement, counter);
  });
});

describe('componentDidRender', () => {
  it('should call setAriaAttributes() with correct parameters', () => {
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
