'use client';

import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import type { PropsWithChildren } from 'react';
import { StorefrontDirectionProvider } from '@/components/providers/StorefrontDirectionProvider';
import { StorefrontFrameworkProvider } from '@/components/providers/StorefrontFrameworkProvider';
import { StorefrontTextZoomProvider } from '@/components/providers/StorefrontTextZoomProvider';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';

export const Providers = ({ children }: PropsWithChildren) => {
  const { storefrontTheme } = useStorefrontTheme();
  return (
    <StorefrontTextZoomProvider>
      <StorefrontDirectionProvider>
        <StorefrontFrameworkProvider>
          <PorscheDesignSystemProvider theme={storefrontTheme}>{children}</PorscheDesignSystemProvider>
        </StorefrontFrameworkProvider>
      </StorefrontDirectionProvider>
    </StorefrontTextZoomProvider>
  );
};
