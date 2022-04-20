import { LinkSocial } from './link-social';
import * as linkValidationUtils from '../link-validation';

describe('componentWillLoad', () => {
  it('should call throwIfInvalidLinkUsage() with correct parameters', () => {
    const spy = jest.spyOn(linkValidationUtils, 'throwIfInvalidLinkUsage');

    const component = new LinkSocial();
    component.host = document.createElement('p-link-social');
    component.href = '#';

    component.componentWillLoad();
    expect(spy).toBeCalledWith(component.host, component.href);
  });
});
