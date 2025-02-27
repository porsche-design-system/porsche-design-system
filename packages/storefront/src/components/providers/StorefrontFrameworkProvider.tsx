'use client';

import type { Framework } from '@/models/framework';
import React, { createContext, type PropsWithChildren, useEffect, useState } from 'react';

interface StorefrontFrameworkContextProps {
  storefrontFramework: Framework;
  setStorefrontFramework: (storefrontFramework: Framework) => void;
}

const storefrontFrameworkLocalStorageKey = 'storefrontFramework';

export const StorefrontFrameworkContext = createContext<StorefrontFrameworkContextProps | undefined>(undefined);

export const StorefrontFrameworkProvider = ({ children }: PropsWithChildren) => {
  const [storefrontFramework, setSelectedFramework] = useState<Framework>('vanilla-js');

  // Load initial state from localStorage once component mounts
  useEffect(() => {
    const storedFramework = localStorage.getItem(storefrontFrameworkLocalStorageKey) as Framework | null;
    if (storedFramework) {
      setSelectedFramework(storedFramework);
    }
  }, []);

  const setStorefrontFramework = (storefrontFramework: Framework) => {
    setSelectedFramework(storefrontFramework);
    localStorage.setItem(storefrontFrameworkLocalStorageKey, storefrontFramework);
  };

  return (
    <StorefrontFrameworkContext.Provider value={{ storefrontFramework, setStorefrontFramework }}>
      {children}
    </StorefrontFrameworkContext.Provider>
  );
};
