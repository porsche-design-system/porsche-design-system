import { PInlineNotification } from '@porsche-design-system/components-react/ssr';
import type React from 'react';

type NotificationProps = {
  heading?: string;
  state?: 'warning' | 'error' | 'success' | 'info';
  children?: React.ReactNode;
};

export const Notification = ({ heading = '', state = 'info', children }: NotificationProps) => {
  return (
    <PInlineNotification heading={heading} state={state} dismissButton={false}>
      {children}
    </PInlineNotification>
  );
};
