import { ButtonPure } from './button-pure';
import * as buttonLinkPureUtils from '../../utils/button-link-pure-utils';

jest.mock('../../utils/button-handling');

describe('render', () => {
  it('should call warnIfParentIsPTextAndIconIsNone() with correct parameters', () => {
    const spy = jest.spyOn(buttonLinkPureUtils, 'warnIfParentIsPTextAndIconIsNone');

    const component = new ButtonPure();
    component.host = document.createElement('p-button-pure');
    component.host.attachShadow({ mode: 'open' });
    component.render();

    expect(spy).toBeCalledWith(component.host, component.icon, component.iconSource);
  });
});
