'use client';

import React, { createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { STOREFRONT_TEXT_ZOOM_TYPES, type StorefrontTextZoom } from '@/models/textZoom';

interface StorefrontTextZoomContextProps {
  storefrontTextZoom: StorefrontTextZoom;
  setStorefrontTextZoom: (textZoom: StorefrontTextZoom) => void;
}

const storefrontTextZoomLocalStorageKey = 'storefrontTextZoom';

export const StorefrontTextZoomContext = createContext<StorefrontTextZoomContextProps | undefined>(undefined);

export const StorefrontTextZoomProvider = ({ children }: PropsWithChildren) => {
  const [storefrontTextZoom, setSelectedTextZoom] = useState<StorefrontTextZoom>('100%');

  // Load initial state from localStorage once component mounts
  // biome-ignore lint/correctness/useExhaustiveDependencies: only used for mount
  useEffect(() => {
    const storedTextZoom = localStorage.getItem(storefrontTextZoomLocalStorageKey) as StorefrontTextZoom | null;
    if (storedTextZoom && STOREFRONT_TEXT_ZOOM_TYPES.includes(storedTextZoom)) {
      setStorefrontTextZoom(storedTextZoom);
    }
  }, []);

  const setStorefrontTextZoom = (textZoom: StorefrontTextZoom) => {
    if (!STOREFRONT_TEXT_ZOOM_TYPES.includes(textZoom)) {
      return;
    }
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
