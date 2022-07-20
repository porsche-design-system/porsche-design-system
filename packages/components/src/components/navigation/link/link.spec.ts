import { Link } from './link';
import * as throwIfInvalidLinkUsageUtils from '../../../utils/validation/throwIfInvalidLinkUsage';

describe('componentWillLoad', () => {
  it('should call throwIfInvalidLinkUsage() with correct parameters', () => {
    const spy = jest.spyOn(throwIfInvalidLinkUsageUtils, 'throwIfInvalidLinkUsage');

    const component = new Link();
    component.host = document.createElement('p-link');
    component.href = '#';

    component.componentWillLoad();
    expect(spy).toBeCalledWith(component.host, component.href);
  });
});
