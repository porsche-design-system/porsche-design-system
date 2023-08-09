'use client';

import { componentsReady } from '@porsche-design-system/components-react';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';

export const Providers = (props: PropsWithChildren<{}>): JSX.Element => {
  useEffect(() => {
    (window as any).componentsReady = componentsReady; // for vrt
  }, []);
  return <PorscheDesignSystemProvider cdn="auto" {...props} />;
};
