import { Link } from './link';
import * as linkValidationUtils from '../link-validation';
import * as focusHandling from '../../../utils/focus-handling';

describe('componentWillLoad()', () => {
  let linkValidationUtilsSpy;

  beforeEach(() => {
    linkValidationUtilsSpy = jest
      .spyOn(linkValidationUtils, 'throwIfInvalidLinkUsage')
      .mockImplementationOnce(() => {});
  });

  it('should call throwIfInvalidLinkUsage() ', () => {
    const component = new Link();
    component.host = document.createElement('p-link');
    component.componentWillLoad();

    expect(linkValidationUtilsSpy).toBeCalledWith(component.host, component.href);
  });

  it('should call improveFocusHandlingForCustomElement() ', () => {
    const spy = jest.spyOn(focusHandling, 'improveFocusHandlingForCustomElement');
    const component = new Link();
    component.host = document.createElement('p-link');
    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host);
  });
});
