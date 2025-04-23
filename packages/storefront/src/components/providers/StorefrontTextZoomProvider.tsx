'use client';

import type { StorefrontTextZoom } from '@/models/textZoom';
import type { StorefrontTheme } from '@/models/theme';
import React, { createContext, type PropsWithChildren, useEffect, useState } from 'react';

interface StorefrontTextZoomContextProps {
  storefrontTextZoom: StorefrontTextZoom;
  setStorefrontTextZoom: (textZoom: StorefrontTextZoom) => void;
}

const storefrontTextZoomLocalStorageKey = 'storefrontTextZoom';

export const StorefrontTextZoomContext = createContext<StorefrontTextZoomContextProps | undefined>(undefined);

export const StorefrontTextZoomProvider = ({ children }: PropsWithChildren) => {
  const [storefrontTextZoom, setSelectedTextZoom] = useState<StorefrontTextZoom>('100%');

  // Load initial state from localStorage once component mounts
  useEffect(() => {
    const storedTextZoom = localStorage.getItem(storefrontTextZoomLocalStorageKey) as StorefrontTextZoom | null;
    if (storedTextZoom) {
      setStorefrontTextZoom(storedTextZoom);
    }
  }, []);

  const setStorefrontTextZoom = (textZoom: StorefrontTextZoom) => {
    setSelectedTextZoom(textZoom);
    document.documentElement.style.fontSize = textZoom;
    localStorage.setItem(storefrontTextZoomLocalStorageKey, textZoom);
  };

  return (
    <StorefrontTextZoomContext.Provider value={{ storefrontTextZoom, setStorefrontTextZoom }}>
      {children}
    </StorefrontTextZoomContext.Provider>
  );
};
