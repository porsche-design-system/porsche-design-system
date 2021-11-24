import { ToastItem } from './toast-item';
import * as validationUtils from '../../../../utils/validation';
import * as domUtils from '../../../../utils/dom';
import { TOAST_STATES } from '../toast/toast-utils';

describe('connectedCallback', () => {
  it('should call throwIfRootNodeIsNotOfKind()', () => {
    const spy = jest.spyOn(domUtils, 'throwIfRootNodeIsNotOfKind');
    const component = new ToastItem();

    try {
      component.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledWith(component.host, 'pToast');
  });
});

describe('componentWillRender', () => {
  it('should call throwIfValueIsInvalid()', () => {
    const spy = jest.spyOn(validationUtils, 'throwIfValueIsInvalid');
    const component = new ToastItem();
    component.host = document.createElement('p-toast');
    component.host.attachShadow({ mode: 'open' });
    component.state = 'success';
    component.componentWillRender();

    expect(spy).toBeCalledWith('success', TOAST_STATES, 'state');
  });
});
