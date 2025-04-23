'use client';

import { StorefrontTextZoomContext } from '@/components/providers/StorefrontTextZoomProvider';
import { useContext } from 'react';

export const useTextZoom = () => {
  const context = useContext(StorefrontTextZoomContext);
  if (!context) {
    throw new Error('useTextZoom must be used within a TextZoomProvider');
  }
  return context;
};
