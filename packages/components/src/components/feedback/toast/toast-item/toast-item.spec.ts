import { ToastItem } from './toast-item';
import * as validationUtils from '../../../../utils/validation';
import * as throwIfRootNodeIsNotOfKindUtils from '../../../../utils/dom/throwIfRootNodeIsNotOfKind';
import { TOAST_STATES } from '../toast/toast-utils';

describe('connectedCallback', () => {
  it('should call throwIfRootNodeIsNotOfKind() with correct parameters', () => {
    const spy = jest.spyOn(throwIfRootNodeIsNotOfKindUtils, 'throwIfRootNodeIsNotOfKind');
    const component = new ToastItem();

    try {
      component.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledWith(component.host, 'pToast');
  });
});

describe('componentWillRender', () => {
  it('should call throwIfValueIsInvalid() with correct parameters', () => {
    const spy = jest.spyOn(validationUtils, 'throwIfValueIsInvalid');
    const component = new ToastItem();
    component.host = document.createElement('p-toast');
    component.host.attachShadow({ mode: 'open' });
    component.state = 'success';
    component.componentWillRender();

    expect(spy).toBeCalledWith('success', TOAST_STATES, 'state');
  });
});
