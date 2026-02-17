'use client';

import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import type { PropsWithChildren } from 'react';
import { StorefrontDirectionProvider } from '@/components/providers/StorefrontDirectionProvider';
import { StorefrontFrameworkProvider } from '@/components/providers/StorefrontFrameworkProvider';
import { StorefrontTextZoomProvider } from '@/components/providers/StorefrontTextZoomProvider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <StorefrontTextZoomProvider>
      <StorefrontDirectionProvider>
        <StorefrontFrameworkProvider>
          <PorscheDesignSystemProvider>{children}</PorscheDesignSystemProvider>
        </StorefrontFrameworkProvider>
      </StorefrontDirectionProvider>
    </StorefrontTextZoomProvider>
  );
};
