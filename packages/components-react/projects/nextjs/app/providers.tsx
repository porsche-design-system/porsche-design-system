'use client';

import { componentsReady, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { type JSX, type PropsWithChildren } from 'react';
import '@porsche-design-system/components-react/index.css';

export const Providers = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  return (
    <>
      <PorscheDesignSystemProvider cdn="auto" children={children} />
    </>
  );
};

if (typeof window !== 'undefined') {
  (window as any).componentsReady = componentsReady; // for vrt
}
