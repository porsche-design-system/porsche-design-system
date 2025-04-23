import { PIcon } from '@porsche-design-system/components-react/ssr';
import type React from 'react';

type A11yIconProps = {
  size?: 'large' | 'medium' | 'small';
};

export const A11yIcon = ({ size = 'large' }: A11yIconProps) => {
  return <PIcon name="accessibility" size={size} color="notification-info" aria-hidden="true" />;
};
