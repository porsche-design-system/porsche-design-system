'use client';

import { createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { type FrameworkWithNext, frameworkNameMap } from '@/models/framework';

interface StorefrontFrameworkContextProps {
  storefrontFramework: FrameworkWithNext;
  setStorefrontFramework: (storefrontFramework: FrameworkWithNext) => void;
}

const storefrontFrameworkLocalStorageKey = 'storefrontFramework';

const isFrameworkWithNext = (framework: string | null): framework is FrameworkWithNext =>
  !!framework && framework in frameworkNameMap;

export const StorefrontFrameworkContext = createContext<StorefrontFrameworkContextProps | undefined>(undefined);

export const StorefrontFrameworkProvider = ({
  children,
  initialFramework = 'vanilla-js',
}: PropsWithChildren<{ initialFramework?: FrameworkWithNext }>) => {
  const [storefrontFramework, setSelectedFramework] = useState<FrameworkWithNext>(initialFramework);

  // Load initial state from localStorage once component mounts
  useEffect(() => {
    const storedFramework = localStorage.getItem(storefrontFrameworkLocalStorageKey);
    if (isFrameworkWithNext(storedFramework)) {
      setSelectedFramework(storedFramework);
    }
  }, []);

  const setStorefrontFramework = (storefrontFramework: FrameworkWithNext) => {
    if (!isFrameworkWithNext(storefrontFramework)) {
      return;
    }
    setSelectedFramework(storefrontFramework);
    localStorage.setItem(storefrontFrameworkLocalStorageKey, storefrontFramework);
  };

  return (
    <StorefrontFrameworkContext.Provider value={{ storefrontFramework, setStorefrontFramework }}>
      {children}
    </StorefrontFrameworkContext.Provider>
  );
};
