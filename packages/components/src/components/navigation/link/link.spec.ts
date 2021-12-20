import { Link } from './link';
import * as linkValidationUtils from '../../../utils/link-validation';
import * as jssUtils from '../../../utils/jss';
import * as focusHandling from '../../../utils/focus-handling';

describe('connectedCallback()', () => {
  it('should call improveFocusHandlingForCustomElement() ', () => {
    const spy = jest.spyOn(focusHandling, 'improveFocusHandlingForCustomElement');
    const component = new Link();
    component.host = document.createElement('p-link');
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host);
  });
});

describe('componentWillRender()', () => {
  let linkValidationUtilsSpy;
  let jssUtilsSpy;

  beforeEach(() => {
    linkValidationUtilsSpy = jest.spyOn(linkValidationUtils, 'validateLinkUsage').mockImplementationOnce(() => {});
    jssUtilsSpy = jest.spyOn(jssUtils, 'attachComponentCss').mockImplementationOnce(() => {});
  });

  it('should call attachComponentsCss() ', () => {
    const component = new Link();
    component.host = document.createElement('p-link');
    component.componentWillRender();

    expect(jssUtilsSpy).toBeCalledTimes(1);
  });

  it('should call validateLinkUsage() ', () => {
    const component = new Link();
    component.host = document.createElement('p-link');
    component.componentWillRender();

    expect(linkValidationUtilsSpy).toBeCalledWith(component.host, component.href);
  });
});
