'use client';

import { componentsReady } from '@porsche-design-system/components-react';
import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';

export const ComponentsReady: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  useEffect(() => {
    (window as any).componentsReady = componentsReady;
  }); // for vrt
  return <>{children}</>;
};
