'use client';

import { componentsReady } from '@porsche-design-system/components-react';
import type { PropsWithChildren, ReactNode } from 'react';
import { useEffect } from 'react';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';

export const Providers = ({ children }: PropsWithChildren<{ children: ReactNode }>): JSX.Element => {
  useEffect(() => {
    (window as any).componentsReady = componentsReady; // for vrt
  }, []);
  return (
    <>
      <PorscheDesignSystemProvider cdn="auto">{children}</PorscheDesignSystemProvider>
    </>
  );
};
