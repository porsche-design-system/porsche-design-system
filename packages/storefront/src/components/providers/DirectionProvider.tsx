'use client';

import type { StorefrontDirection } from '@/models/dir';
import React, { createContext, type PropsWithChildren, useEffect, useState } from 'react';

interface DirectionContextProps {
  direction: StorefrontDirection;
  setStorefrontDirection: (direction: StorefrontDirection) => void;
}

export const DirectionContext = createContext<DirectionContextProps | undefined>(undefined);

export const DirectionProvider = ({ children }: PropsWithChildren) => {
  const getInitialDirection = (): StorefrontDirection => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('direction') as StorefrontDirection) || 'ltr';
    }
    return 'ltr';
  };

  const [direction, setDirection] = useState<StorefrontDirection>(getInitialDirection);

  useEffect(() => {
    document.documentElement.dir = direction;
    localStorage.setItem('direction', direction);
  }, [direction]);

  const setStorefrontDirection = (direction: StorefrontDirection) => {
    setDirection(direction);
  };

  return (
    <DirectionContext.Provider value={{ direction, setStorefrontDirection }}>{children}</DirectionContext.Provider>
  );
};
