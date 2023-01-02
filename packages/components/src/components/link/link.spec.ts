import { Link } from './link';
import * as throwIfInvalidLinkUsageUtils from '../../utils/validation/throwIfInvalidLinkUsage';

describe('connectedCallback', () => {
  it('should call throwIfInvalidLinkUsage() with correct parameters', () => {
    const spy = jest.spyOn(throwIfInvalidLinkUsageUtils, 'throwIfInvalidLinkUsage');

    const component = new Link();
    component.host = document.createElement('p-link');
    component.href = '#';

    component.connectedCallback();
    expect(spy).toBeCalledWith(component.host, component.href);
  });
});
