import { PInlineNotification } from '@porsche-design-system/components-react/ssr';
import type React from 'react';

type NotificationProps = {
  heading?: string;
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  state?: 'warning' | 'error' | 'success' | 'info';
  children?: React.ReactNode;
};

export const Notification = ({ heading = '', headingTag = 'h2', state = 'info', children }: NotificationProps) => {
  return (
    <PInlineNotification heading={heading} headingTag={headingTag} state={state} dismissButton={false}>
      {children}
    </PInlineNotification>
  );
};
