'use client';

import { componentsReady } from '@porsche-design-system/components-react';
import { type JSX, type PropsWithChildren, useState } from 'react';
import { PorscheDesignSystemProvider, type Theme } from '@porsche-design-system/components-react/ssr';
import { Selects } from '../components';

export const Providers = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <>
      <Selects theme={theme} setTheme={setTheme} />
      <PorscheDesignSystemProvider cdn="auto" theme={theme} children={children} />
    </>
  );
};

if (typeof window !== 'undefined') {
  (window as any).componentsReady = componentsReady; // for vrt
}
