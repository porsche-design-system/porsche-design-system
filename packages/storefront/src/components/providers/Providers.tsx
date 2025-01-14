'use client';

import { useTheme } from '@/hooks/useTheme';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import type { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  return <PorscheDesignSystemProvider theme={theme}>{children}</PorscheDesignSystemProvider>;
};
