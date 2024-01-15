import { LinkPure } from './link-pure';
import * as buttonLinkPureUtils from '../../utils/button-link-pure-utils';
import * as throwIfInvalidLinkUsageUtils from '../../utils/validation/throwIfInvalidLinkUsage';

describe('componentWillLoad', () => {
  it('should call throwIfInvalidLinkUsage() with correct parameters', () => {
    const spy = jest.spyOn(throwIfInvalidLinkUsageUtils, 'throwIfInvalidLinkUsage');

    const component = new LinkPure();
    component.host = document.createElement('p-link-pure');
    component.href = '#';
    component.componentWillLoad();

    expect(spy).toBeCalledWith(component.host, component.href);
  });
});

describe('render', () => {
  it('should call warnIfParentIsPTextAndIconIsNone() with correct parameters', () => {
    const spy = jest.spyOn(buttonLinkPureUtils, 'warnIfParentIsPTextAndIconIsNone');

    const component = new LinkPure();
    component.host = document.createElement('p-link-pure');
    component.host.attachShadow({ mode: 'open' });
    component.href = '#';
    component.render();

    expect(spy).toBeCalledWith(component.host, component.icon, component.iconSource);
  });
});
