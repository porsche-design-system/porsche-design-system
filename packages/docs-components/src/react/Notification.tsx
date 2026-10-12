import { PInlineNotification } from '@porsche-design-system/components-react/ssr';
import type { NotificationProps } from '../props';

export const Notification = ({ heading = '', headingTag = 'h2', state = 'info', children }: NotificationProps) => {
  return (
    <PInlineNotification heading={heading} headingTag={headingTag} state={state} dismissButton={false}>
      {children}
    </PInlineNotification>
  );
};
