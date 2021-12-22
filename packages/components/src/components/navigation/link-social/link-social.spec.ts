import { LinkSocial } from './link-social';
import * as linkValidationUtils from '../link-validation';
import * as focusHandling from '../../../utils/focus-handling';

describe('componentWillLoad()', () => {
  it('should call throwIfInvalidLinkUsage() ', () => {
    const spy = jest.spyOn(linkValidationUtils, 'throwIfInvalidLinkUsage');

    const component = new LinkSocial();
    component.host = document.createElement('p-link-social');
    component.href = '#';

    component.componentWillLoad();
    expect(spy).toBeCalledWith(component.host, component.href);
  });

  it('should call improveFocusHandlingForCustomElement() ', () => {
    const spy = jest.spyOn(focusHandling, 'improveFocusHandlingForCustomElement');

    const component = new LinkSocial();
    component.host = document.createElement('p-link-social');
    component.href = '#';

    component.componentWillLoad();
    expect(spy).toBeCalledWith(component.host);
  });
});
