'use client';

import { type JSX, type PropsWithChildren, useState } from 'react';
import { componentsReady, PorscheDesignSystemProvider, type Theme } from '@porsche-design-system/components-react/ssr';
import { Selects } from '../components';
import { useSearchParams } from 'next/navigation';

export const Providers = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  const [theme, setTheme] = useState<Theme>('light');

  const searchParams = useSearchParams();
  const isPageLoadedInIFrame = !!searchParams?.get('iframe');

  return (
    <>
      {!isPageLoadedInIFrame && <Selects theme={theme} setTheme={setTheme} />}
      <PorscheDesignSystemProvider cdn="auto" theme={theme} children={children} />
    </>
  );
};

if (typeof window !== 'undefined') {
  (window as any).componentsReady = componentsReady; // for vrt
}
