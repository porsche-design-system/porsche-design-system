'use client';

import { useContext } from 'react';
import { StorefrontFrameworkContext } from '@/components/providers/StorefrontFrameworkProvider';

export const useStorefrontFramework = () => {
  const context = useContext(StorefrontFrameworkContext);
  if (!context) {
    throw new Error('useStorefrontFramework must be used within a StorefrontFrameworkProvider');
  }
  return context;
};
