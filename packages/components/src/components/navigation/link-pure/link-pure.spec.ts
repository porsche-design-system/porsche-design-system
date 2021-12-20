import { LinkPure } from './link-pure';
import * as transitionListenerUtils from '../../../utils/transition-listener';
import * as linkValidationUtils from '../link-validation';
import * as jssUtils from '../../../utils/jss';
import * as focusHandling from '../../../utils/focus-handling';
import * as slottedStylesUtils from '../../../utils/slotted-styles';

jest.mock('../../../utils/focus-handling');

describe('connectedCallback()', () => {
  it('should call attachSlottedCss() ', () => {
    const spy = jest.spyOn(slottedStylesUtils, 'attachSlottedCss');
    const component = new LinkPure();
    component.host = document.createElement('p-link-pure');
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, expect.anything());
  });
});

describe('componentDidLoad()', () => {
  let spy: jest.SpyInstance;
  beforeEach(() => {
    spy = jest.spyOn(transitionListenerUtils, 'transitionListener').mockImplementation(() => {});
  });

  it('should not call transitionListener for default size', () => {
    const component = new LinkPure();
    component.componentDidLoad();

    expect(spy).toBeCalledTimes(0);
  });

  it('should call transitionListener when size="inherit"', () => {
    const component = new LinkPure();
    component.size = 'inherit';
    component.componentDidLoad();

    expect(spy).toBeCalledWith(undefined, 'font-size', expect.anything());
  });

  it('should call improveFocusHandlingForCustomElement() ', () => {
    const focusHandlingSpy = jest.spyOn(focusHandling, 'improveFocusHandlingForCustomElement');
    const component = new LinkPure();
    component.host = document.createElement('p-link-pure');
    component.componentDidLoad();

    expect(focusHandlingSpy).toBeCalledWith(component.host);
  });
});

describe('componentWillRender()', () => {
  let linkValidationUtilsSpy;
  let jssUtilsSpy;

  beforeEach(() => {
    linkValidationUtilsSpy = jest
      .spyOn(linkValidationUtils, 'throwIfInvalidLinkUsage')
      .mockImplementationOnce(() => {});
    jssUtilsSpy = jest.spyOn(jssUtils, 'attachComponentCss').mockImplementationOnce(() => {});
  });

  it('should call attachComponentsCss() ', () => {
    const component = new LinkPure();
    component.host = document.createElement('p-link-pure');
    component.componentWillRender();

    expect(jssUtilsSpy).toBeCalledTimes(1);
  });

  it('should call validateLinkUsage() ', () => {
    const component = new LinkPure();
    component.host = document.createElement('p-link-pure');
    component.href = '#';
    component.componentWillRender();

    expect(linkValidationUtilsSpy).toBeCalledWith(component.host, component.href);
  });
});
