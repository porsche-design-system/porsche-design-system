import type { PropsWithChildren } from 'react';
import { createContext, useEffect } from 'react';
import { load } from '@porsche-design-system/components-js';

export const PorscheDesignSystemContext = createContext({
  prefix: undefined,
  usesSkeletons: undefined,
});

export const hasSkeleton = (): boolean =>
  typeof window !== 'undefined' && !!document.querySelector('style[uses-skeleton]');

type Props = { prefix?: string; usesSkeletons?: boolean };

export const PorscheDesignSystemProvider = ({
  prefix = '',
  usesSkeletons,
  ...props
}: PropsWithChildren<Props>): JSX.Element => {
  useEffect(() => {
    load({ prefix });
  }, [prefix]);

  return <PorscheDesignSystemContext.Provider value={{ prefix, usesSkeletons: hasSkeleton() }} {...props} />;
};
