'use client';

import type { Framework } from '@/models/framework';
import React, { createContext, type PropsWithChildren, useEffect, useState } from 'react';

interface StorefrontFrameworkContextProps {
  storefrontFramework: Framework;
  setStorefrontFramework: (storefrontFramework: Framework) => void;
}

export const StorefrontFrameworkContext = createContext<StorefrontFrameworkContextProps | undefined>(undefined);

export const StorefrontFrameworkProvider = ({ children }: PropsWithChildren) => {
  const [storefrontFramework, setSelectedFramework] = useState<Framework>('vanilla-js');

  // Load initial state from localStorage once component mounts
  useEffect(() => {
    const storedFramework = localStorage.getItem('storefrontFramework') as Framework | null;
    if (storedFramework) {
      setSelectedFramework(storedFramework);
    }
  }, []);

  const setStorefrontFramework = (storefrontFramework: Framework) => {
    setSelectedFramework(storefrontFramework);
    localStorage.setItem('storefrontFramework', storefrontFramework);
  };

  return (
    <StorefrontFrameworkContext.Provider value={{ storefrontFramework, setStorefrontFramework }}>
      {children}
    </StorefrontFrameworkContext.Provider>
  );
};
