'use client';

import type { PropsWithChildren, JSX } from 'react';
import { createContext, useEffect } from 'react';
import { load } from '@porsche-design-system/components-js';

// to warn users about missing PorscheDesignSystemProvider, we set the default values as undefined
export const PorscheDesignSystemContext = createContext<{ prefix?: string }>({
  prefix: undefined,
});

type Props = {
  prefix?: string;
  cdn?: 'auto' | 'cn';
};

export const PorscheDesignSystemProvider = ({ prefix = '', cdn, ...props }: PropsWithChildren<Props>): JSX.Element => {
  // @ts-ignore
  if (!process.browser) {
    // for ssr we set the global PORSCHE_DESIGN_SYSTEM_CDN_URL variable that is used in our getCDNBaseURL() util to respect the cdn
    const tld = cdn === 'cn' ? 'cn' : 'com';
    // @ts-ignore
    global.PORSCHE_DESIGN_SYSTEM_CDN_URL = `https://cdn.ui.porsche.${tld}`;
  }

  useEffect(() => {
    load({ prefix, cdn });
  }, []); // runtime prefix or cdn change is not supported

  return <PorscheDesignSystemContext.Provider value={{ prefix }} {...props} />;
};
