import { Link } from './link';
import * as linkValidationUtils from '../link-validation';

describe('componentWillLoad', () => {
  it('should call throwIfInvalidLinkUsage() ', () => {
    const spy = jest.spyOn(linkValidationUtils, 'throwIfInvalidLinkUsage');

    const component = new Link();
    component.host = document.createElement('p-link');
    component.href = '#';

    component.componentWillLoad();
    expect(spy).toBeCalledWith(component.host, component.href);
  });
});
