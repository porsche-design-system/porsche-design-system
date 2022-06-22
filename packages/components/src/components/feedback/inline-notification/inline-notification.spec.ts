import * as throwIfValueIsInvalidUtils from '../../../utils/validation/throwIfValueIsInvalid';
import { InlineNotification } from './inline-notification';
import { INLINE_NOTIFICATION_STATES } from './inline-notification-utils';

describe('componentWillRender', () => {
  it('should call throwIfValueIsInvalid() with correct parameters', () => {
    const spy = jest.spyOn(throwIfValueIsInvalidUtils, 'throwIfValueIsInvalid');
    const component = new InlineNotification();
    component.host = document.createElement('p-inline-notification');
    component.host.attachShadow({ mode: 'open' });
    component.state = 'success';
    component.componentWillRender();

    expect(spy).toBeCalledWith('success', INLINE_NOTIFICATION_STATES, 'state');
  });
});
