import { PInlineNotification } from '@porsche-design-system/components-react/ssr';
import type { Framework } from '@porsche-design-system/shared';
import type { ReactNode } from 'react';
import { FrameworkContent } from '../shared/FrameworkContent';

type NotificationProps = {
  heading?: string;
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  state?: 'warning' | 'error' | 'success' | 'info';
  /** Shows the notification only while one of these frameworks is selected, e.g. for a React specific hint. */
  frameworks?: Framework[];
  children?: ReactNode;
};

export const Notification = ({
  heading = '',
  headingTag = 'h2',
  state = 'info',
  frameworks,
  children,
}: NotificationProps) => {
  const notification = (
    <PInlineNotification heading={heading} headingTag={headingTag} state={state} dismissButton={false}>
      {children}
    </PInlineNotification>
  );

  return frameworks ? (
    <FrameworkContent content={Object.fromEntries(frameworks.map((framework) => [framework, notification]))} />
  ) : (
    notification
  );
};
