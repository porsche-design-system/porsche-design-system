'use client';

import type { StorefrontDirection } from '@/models/dir';
import React, { createContext, type PropsWithChildren, useEffect, useState } from 'react';

interface StorefrontDirectionContextProps {
  storefrontDirection: StorefrontDirection;
  setStorefrontDirection: (direction: StorefrontDirection) => void;
}

const storefrontDirectionLocalStorageKey = 'storefrontDirection';

export const StorefrontDirectionContext = createContext<StorefrontDirectionContextProps | undefined>(undefined);

export const StorefrontDirectionProvider = ({ children }: PropsWithChildren) => {
  const [storefrontDirection, setSelectedDirection] = useState<StorefrontDirection>('ltr');

  // Load initial state from localStorage once component mounts
  useEffect(() => {
    const storedDirection = localStorage.getItem(storefrontDirectionLocalStorageKey) as StorefrontDirection | null;
    if (storedDirection) {
      setStorefrontDirection(storedDirection);
    }
  }, []);

  const setStorefrontDirection = (direction: StorefrontDirection) => {
    setSelectedDirection(direction);
    document.documentElement.dir = direction;
    localStorage.setItem(storefrontDirectionLocalStorageKey, direction);
  };

  return (
    <StorefrontDirectionContext.Provider value={{ storefrontDirection, setStorefrontDirection }}>
      {children}
    </StorefrontDirectionContext.Provider>
  );
};
