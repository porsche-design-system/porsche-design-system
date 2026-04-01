import {
  getInlineNotificationAriaAttributes,
  INLINE_NOTIFICATION_STATES,
  type InlineNotificationState,
} from './inline-notification-utils';

describe('getInlineNotificationAriaAttributes()', () => {
  it.each<InlineNotificationState>(INLINE_NOTIFICATION_STATES)(
    'should return correct aria attributes for state: %s',
    (state) => {
      expect(getInlineNotificationAriaAttributes(state, 'labelId', 'descriptionId')).toMatchSnapshot();
    }
  );
});
