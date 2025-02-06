'use client';

import { DirectionProvider } from '@/components/providers/DirectionProvider';
import { TextZoomProvider } from '@/components/providers/TextZoomProvider';
import { useTheme } from '@/hooks/useTheme';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import type { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  return (
    <TextZoomProvider>
      <DirectionProvider>
        <PorscheDesignSystemProvider theme={theme}>{children}</PorscheDesignSystemProvider>
      </DirectionProvider>
    </TextZoomProvider>
  );
};
