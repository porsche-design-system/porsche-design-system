import * as buttonLinkPureUtils from '../../utils/button-link-pure-utils';
import * as throwIfInvalidLinkUsageUtils from '../../utils/validation/throwIfInvalidLinkUsage';
import { LinkPure } from './link-pure';

describe('componentWillLoad', () => {
  it('should call throwIfInvalidLinkUsage() with correct parameters', () => {
    const spy = jest.spyOn(throwIfInvalidLinkUsageUtils, 'throwIfInvalidLinkUsage');

    const component = new LinkPure();
    component.host = document.createElement('p-link-pure');
    component.href = '#';
    component.componentWillLoad();

    expect(spy).toHaveBeenCalledWith(component.host, component.href);
  });
});
