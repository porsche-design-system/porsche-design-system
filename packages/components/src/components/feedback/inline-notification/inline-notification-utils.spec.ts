import {
  INLINE_NOTIFICATION_STATES,
  InlineNotificationState,
  getIconName,
  getContentAriaAttributes,
} from './inline-notification-utils';

describe('getIconName()', () => {
  it.each<InlineNotificationState>(INLINE_NOTIFICATION_STATES)('should return correct icon for state: %s', (state) => {
    expect(getIconName(state)).toMatchSnapshot();
  });
});

describe('getContentAriaAttributes()', () => {
  it.each<InlineNotificationState>(INLINE_NOTIFICATION_STATES)(
    'should return correct aria attributes for state: %s',
    (state) => {
      expect(getContentAriaAttributes(state, 'labelId', 'descriptionId')).toMatchSnapshot();
    }
  );
});
