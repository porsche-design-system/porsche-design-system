'use client';

import type { StorefrontTextZoom } from '@/models/textZoom';
import React, { createContext, type PropsWithChildren, useEffect, useState } from 'react';

interface TextZoomContextProps {
  textZoom: StorefrontTextZoom;
  setStorefrontTextZoom: (textZoom: StorefrontTextZoom) => void;
}

export const TextZoomContext = createContext<TextZoomContextProps | undefined>(undefined);

export const TextZoomProvider = ({ children }: PropsWithChildren) => {
  const getInitialTextZoom = (): StorefrontTextZoom => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('text-zoom') as StorefrontTextZoom) || '100%';
    }
    return '100%';
  };

  const [textZoom, setTextZoom] = useState<StorefrontTextZoom>(getInitialTextZoom);

  useEffect(() => {
    document.documentElement.style.fontSize = textZoom;
    localStorage.setItem('text-zoom', textZoom);
  }, [textZoom]);

  const setStorefrontTextZoom = (textZoom: StorefrontTextZoom) => {
    setTextZoom(textZoom);
  };

  return <TextZoomContext.Provider value={{ textZoom, setStorefrontTextZoom }}>{children}</TextZoomContext.Provider>;
};
