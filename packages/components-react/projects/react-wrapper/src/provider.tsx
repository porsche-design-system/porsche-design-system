'use client';

import type { PropsWithChildren, JSX } from 'react';
import { createContext, useEffect } from 'react';
import { load } from '@porsche-design-system/components-js';
import type { Theme } from './lib/types';

// to warn users about missing PorscheDesignSystemProvider, we set the default values as undefined
export const PorscheDesignSystemContext = createContext<{ prefix?: string; theme: Theme }>({
  prefix: undefined,
  theme: 'light',
});

type Props = {
  prefix?: string;
  cdn?: 'auto' | 'cn';
  theme?: Theme; // since theme exists on almost every component, it is defined here kind of like a global prop
  // other component configurations should probably go into a separate `components`, `componentProps` or `componentDefaults`
  // property similar to https://mui.com/material-ui/customization/theme-components/
};

export const PorscheDesignSystemProvider = ({
  prefix = '',
  cdn,
  theme = 'light',
  ...props
}: PropsWithChildren<Props>): JSX.Element => {
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

  return <PorscheDesignSystemContext.Provider value={{ prefix, theme }} {...props} />;
};
