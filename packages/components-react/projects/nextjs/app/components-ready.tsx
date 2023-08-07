'use client';

import { componentsReady } from '@porsche-design-system/components-react';

export const ComponentsReady = (): JSX.Element => {
  return <></>;
};

if (typeof window !== 'undefined') {
  (window as any).componentsReady = componentsReady; // for vrt
}
