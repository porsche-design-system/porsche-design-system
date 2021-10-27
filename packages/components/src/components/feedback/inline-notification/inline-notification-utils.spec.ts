import { INLINE_NOTIFICATION_STATES, InlineNotificationState, getIconName } from './inline-notification-utils';

describe('getIconName()', () => {
  it.each<InlineNotificationState>(INLINE_NOTIFICATION_STATES)('should return correct icon for state: %s', (state) => {
    expect(getIconName(state)).toMatchSnapshot();
  });
});
