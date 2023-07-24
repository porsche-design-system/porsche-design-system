'use client';

import type { PropsWithChildren, JSX } from 'react';
import { createContext, useEffect } from 'react';
import { load } from '@porsche-design-system/components-js';

// to warn users about missing PorscheDesignSystemProvider, we set the default values as undefined
export const PorscheDesignSystemContext = createContext<{ prefix?: string }>({
  prefix: undefined,
});

type Props = { prefix?: string };

export const PorscheDesignSystemProvider = ({ prefix = '', ...props }: PropsWithChildren<Props>): JSX.Element => {
  useEffect(() => {
    load({ prefix });
  }, []); // No runtime prefix change is supported

  return <PorscheDesignSystemContext.Provider value={{ prefix }} {...props} />;
};
