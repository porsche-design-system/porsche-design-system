'use client';

import React, { createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { STOREFRONT_DIRECTION_TYPES, type StorefrontDirection } from '@/models/dir';

interface StorefrontDirectionContextProps {
  storefrontDirection: StorefrontDirection;
  setStorefrontDirection: (direction: StorefrontDirection) => void;
}

const storefrontDirectionLocalStorageKey = 'storefrontDirection';

export const StorefrontDirectionContext = createContext<StorefrontDirectionContextProps | undefined>(undefined);

export const StorefrontDirectionProvider = ({ children }: PropsWithChildren) => {
  const [storefrontDirection, setSelectedDirection] = useState<StorefrontDirection>('ltr');

  // Load initial state from localStorage once component mounts
  // biome-ignore lint/correctness/useExhaustiveDependencies: only used for mount
  useEffect(() => {
    const storedDirection = localStorage.getItem(storefrontDirectionLocalStorageKey) as StorefrontDirection | null;
    if (storedDirection && STOREFRONT_DIRECTION_TYPES.includes(storedDirection)) {
      setStorefrontDirection(storedDirection);
    }
  }, []);

  const setStorefrontDirection = (direction: StorefrontDirection) => {
    if (!STOREFRONT_DIRECTION_TYPES.includes(direction)) {
      return;
    }
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
