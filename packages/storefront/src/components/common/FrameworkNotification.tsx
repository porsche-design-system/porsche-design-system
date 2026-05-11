'use client';

import { PInlineNotification, type PInlineNotificationProps } from '@porsche-design-system/components-react/ssr';
import type { Framework } from '@porsche-design-system/shared';
import type { PropsWithChildren } from 'react';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';

type FrameworkNotificationProps = {
  showForFrameworks: Framework[];
} & PInlineNotificationProps;

export const FrameworkNotification = ({
  showForFrameworks,
  children,
  ...rest
}: PropsWithChildren<FrameworkNotificationProps>) => {
  const { storefrontFramework } = useStorefrontFramework();

  if (!showForFrameworks.includes(storefrontFramework)) {
    return null;
  }

  return <PInlineNotification {...rest}>{children}</PInlineNotification>;
};
