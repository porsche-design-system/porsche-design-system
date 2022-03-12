import type { PropsWithChildren } from 'react';
import { createContext, useEffect } from 'react';
import { load } from '@porsche-design-system/components-js';

export const PorscheDesignSystemContext = createContext({
  prefix: undefined,
  usesSkeletons: !!document.querySelector('style[uses-skeleton]'),
});

type Props = { prefix?: string; usesSkeletons?: boolean };

export const PorscheDesignSystemProvider = ({
  prefix = '',
  usesSkeletons,
  ...props
}: PropsWithChildren<Props>): JSX.Element => {
  useEffect(() => {
    load({ prefix });
  }, [prefix, usesSkeletons]);

  return <PorscheDesignSystemContext.Provider value={{ prefix, usesSkeletons }} {...props} />;
};
