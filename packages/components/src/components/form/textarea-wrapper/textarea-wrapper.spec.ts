import * as getOnlyChildOfKindHTMLElementOrThrowUtils from '../../../utils/validation/getOnlyChildOfKindHTMLElementOrThrow';
import { TextareaWrapper } from './textarea-wrapper';
import * as formUtils from '../form-utils';
import * as a11yUtils from '../../../utils/a11y/a11y';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('componentWillLoad', () => {
  // TODO: prove connection between util actually setting member value
  it('should call hasCounter() with correct parameter and set hasCounter', () => {
    const textarea = document.createElement('textarea');
    jest
      .spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(textarea);

    const spy = jest.spyOn(formUtils, 'hasCounter');
    const component = new TextareaWrapper();

    expect(component['hasCounter']).toBe(undefined);
    component.componentWillLoad();

    expect(spy).toBeCalledWith(textarea);
    expect(component['hasCounter']).toBe(true);
  });
});

describe('componentDidLoad', () => {
  it('should call addInputEventListenerForCounter() with correct parameters if hasCounter is true', () => {
    const spy = jest.spyOn(formUtils, 'addInputEventListenerForCounter');

    const textarea = document.createElement('textarea');
    const counter = document.createElement('span');
    const ariaElement = document.createElement('span');

    const component = new TextareaWrapper();
    component['textarea'] = textarea;
    component['counterElement'] = counter;
    component['ariaElement'] = ariaElement;

    component.componentDidLoad();
    expect(spy).not.toBeCalled();

    component['hasCounter'] = true;
    component.componentDidLoad();
    expect(spy).toBeCalledWith(textarea, ariaElement, counter);
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
