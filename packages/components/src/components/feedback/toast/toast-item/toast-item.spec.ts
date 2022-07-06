import { ToastItem } from './toast-item';
import * as throwIfValueIsInvalidUtils from '../../../../utils/validation/throwIfValueIsInvalid';
import { TOAST_STATES } from '../toast/toast-utils';

describe('componentWillRender', () => {
  it('should call throwIfValueIsInvalid() with correct parameters', () => {
    const spy = jest.spyOn(throwIfValueIsInvalidUtils, 'throwIfValueIsInvalid');
    const component = new ToastItem();
    component.host = document.createElement('p-toast');
    component.host.attachShadow({ mode: 'open' });
    component.state = 'success';
    component.componentWillRender();

    expect(spy).toBeCalledWith('success', TOAST_STATES, 'state');
  });
});
